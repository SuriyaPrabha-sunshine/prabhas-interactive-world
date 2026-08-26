import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit.server";

const OWNER_NOTIFICATION_EMAIL = "suriyaprabha30boopalan@gmail.com";

export const ContactInput = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(2).max(140),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(200).optional().default(""),
  captchaToken: z.string().max(4000).optional().default(""),
});

async function verifyCaptcha(token: string, ip: string) {
  const secret = process.env["RECAPTCHA_SECRET_KEY"];
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
    const result = (await response.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
    };
    return Boolean(
      result.success &&
        (result.score ?? 0) >= 0.5 &&
        (!result.action || result.action === "contact_form"),
    );
  } catch {
    return false;
  }
}

function looksLikeSpam(subject: string, message: string) {
  const text = `${subject}\n${message}`;
  const links = (text.match(/https?:\/\/|www\.|\[url|\bbit\.ly\b/gi) ?? []).length;
  return (
    links >= 3 ||
    /\b(viagra|casino|crypto giveaway|seo services|loan offer|forex signals)\b/i.test(text) ||
    !/[a-z]/i.test(message)
  );
}

export async function deliverContactMessage(data: z.infer<typeof ContactInput>) {
  if (data.website.trim() || looksLikeSpam(data.subject, data.message)) {
    return { ok: false as const, error: "Unable to send your message. Please try again." };
  }

  const ip =
    getRequestHeader("cf-connecting-ip") ??
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  if (!(await verifyCaptcha(data.captchaToken, ip))) {
    return {
      ok: false as const,
      error: "We couldn't verify that you're human. Please reload the page and try again.",
    };
  }

  if (!checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000).allowed) {
    return {
      ok: false as const,
      error: "Too many messages sent just now. Please try again in a few minutes.",
    };
  }

  const payload = new FormData();
  payload.set("name", data.name);
  payload.set("email", data.email);
  payload.set("subject", data.subject);
  payload.set("message", data.message);
  payload.set("_subject", data.subject);
  payload.set("_template", "table");
  payload.set("_captcha", "false");

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(OWNER_NOTIFICATION_EMAIL)}`,
      { method: "POST", headers: { Accept: "application/json" }, body: payload },
    );
    const result = (await response.json().catch(() => null)) as
      | { success?: boolean | string }
      | null;
    const accepted = result?.success === true || result?.success === "true";

    if (!response.ok || !accepted) {
      console.error("Contact delivery was rejected", response.status);
      return { ok: false as const, error: "Unable to send your message. Please try again." };
    }

    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Unable to send your message. Please try again." };
  }
}