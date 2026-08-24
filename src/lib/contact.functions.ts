import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const ContactInput = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().max(140).optional().default(""),
  message: z.string().trim().min(10).max(2000),
});

async function hashIp(ip: string) {
  const bytes = new TextEncoder().encode(`portfolio-contact:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 32);
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const ipHash = await hashIp(ip);

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
    });

    if (error) {
      console.error("contact_messages insert failed", error.message);
      return { ok: false as const, error: "Could not save your message. Please try again." };
    }

    return { ok: true as const };
  });
