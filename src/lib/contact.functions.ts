import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit.server";

/** Portfolio owner's inbox — contact notifications are delivered here. */
export const OWNER_NOTIFICATION_EMAIL = "suriyaprabha30boopalan@gmail.com";


const ContactInput = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().max(140).optional().default(""),
  message: z.string().trim().min(10).max(2000),
  /** Honeypot: real visitors never fill this hidden field. */
  website: z.string().max(200).optional().default(""),
  /** Google reCAPTCHA v3 token (empty when CAPTCHA is not configured). */
  captchaToken: z.string().max(4000).optional().default(""),
});

/**
 * Verifies a reCAPTCHA v3 token server-side.
 * Returns true when CAPTCHA is not configured (RECAPTCHA_SECRET_KEY unset),
 * so the form keeps working until keys are added.
 */
async function verifyCaptcha(token: string, ip: string) {
  const secret = process.env['RECAPTCHA_SECRET_KEY'];
  if (!secret) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    const result = (await res.json()) as { success?: boolean; score?: number; action?: string };
    if (!result.success) return false;
    // v3 returns a 0..1 score; below 0.5 is very likely automated.
    return (result.score ?? 0) >= 0.5;
  } catch (error) {
    console.error("recaptcha verify failed", error instanceof Error ? error.message : "unknown");
    // Fail closed on verification outage to keep bots out.
    return false;
  }
}

async function hashIp(ip: string) {
  const bytes = new TextEncoder().encode(`portfolio-contact:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

/** Heuristics for classic link/bot spam. */
function looksLikeSpam(subject: string, message: string) {
  const text = `${subject}\n${message}`;
  const links = (text.match(/https?:\/\/|www\.|\[url|\bbit\.ly\b/gi) ?? []).length;
  if (links >= 3) return true;
  if (/\b(viagra|casino|crypto giveaway|seo services|loan offer|forex signals)\b/i.test(text))
    return true;
  // Mostly-uppercase shouting with links, or no letters at all.
  if (!/[a-z]/i.test(message)) return true;
  return false;
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => {
    // Honeypot / content heuristics: silently accept so bots don't retry.
    if (data.website.trim() || looksLikeSpam(data.subject, data.message)) {
      return { ok: true as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const ipHash = await hashIp(ip);

    if (!(await verifyCaptcha(data.captchaToken, ip))) {
      return {
        ok: false as const,
        error: "We couldn't verify that you're human. Please reload the page and try again.",
      };
    }

    // Burst limiter before touching the database.
    if (!checkRateLimit(`contact:${ipHash}`, 5, 10 * 60 * 1000).allowed) {
      return {
        ok: false as const,
        error: "Too many messages sent just now. Please try again in a few minutes.",
      };
    }


    // Basic spam protection: max 3 messages per 10 minutes per sender.
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if ((count ?? 0) >= 3) {
      return {
        ok: false as const,
        error: "Too many messages sent just now. Please try again in a few minutes.",
      };
    }

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject || null,
      message: data.message,
      ip_hash: ipHash,
    });

    if (error) {
      console.error("contact_messages insert failed", error.message);
      return { ok: false as const, error: "Could not save your message. Please try again." };
    }

    return { ok: true as const };
  });
