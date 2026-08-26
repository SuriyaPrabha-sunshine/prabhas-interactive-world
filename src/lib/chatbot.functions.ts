import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { generateText } from "ai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/suriya-knowledge";
import { createGeminiProvider } from "@/lib/ai-gateway.server";
import { checkRateLimit } from "@/lib/rate-limit.server";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(600),
      }),
    )
    .min(1)
    .max(16),
});

/** Patterns commonly used to hijack an assistant's instructions. */
const INJECTION_PATTERNS = [
  /ignore (all |any )?(previous|prior|above) (instructions|prompts|rules)/i,
  /disregard (your|all|the) (instructions|rules|system prompt)/i,
  /(reveal|show|print|repeat|output) (me )?(your |the )?(system )?prompt/i,
  /you are (now|no longer)\b/i,
  /(developer|system) mode/i,
  /act as (an? )?(unrestricted|jailbroken|dan)/i,
  /\bapi[_ -]?key\b|\bservice[_ -]?role\b|process\.env/i,
];

function looksLikeInjection(text: string) {
  return INJECTION_PATTERNS.some((re) => re.test(text));
}

/** Strip control chars / zero-width characters used to smuggle instructions. */
function sanitize(text: string) {
  return text
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\u2028\u2029\ufeff]/g, " ")
    .replace(/\s{3,}/g, "  ")
    .trim()
    .slice(0, 600);
}

const REFUSAL =
  "I can only answer questions about Suriya Prabha's education, skills, projects, research and experience. Ask me anything about her portfolio!";

export const askSuriyaAi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    // Spam protection: 10 questions per 2 minutes, 60 per hour, per visitor.
    const burst = checkRateLimit(`ai:burst:${ip}`, 10, 2 * 60 * 1000);
    const hourly = checkRateLimit(`ai:hour:${ip}`, 60, 60 * 60 * 1000);
    if (!burst.allowed || !hourly.allowed) {
      return {
        ok: false as const,
        error: "You're asking a lot at once — please wait a moment and try again.",
      };
    }

    const messages = data.messages.map((m) => ({ ...m, content: sanitize(m.content) }));
    const latest = messages[messages.length - 1];

    if (latest?.role === "user" && looksLikeInjection(latest.content)) {
      return { ok: true as const, text: REFUSAL };
    }

    const key = process.env["GEMINI_API_KEY"];
    if (!key) return { ok: false as const, error: "The assistant is not configured yet." };

    const gateway = createGeminiProvider(key);

    try {
      const result = await generateText({
        model: gateway("gemini-3.7-flash"),
        system: buildSystemPrompt(),
        // Only user/assistant turns are forwarded; the system prompt is never user-editable.
        messages,
        maxOutputTokens: 500,
       
      });
      let text = (await result.text).trim();

      // Never echo the internal instructions back to a visitor.
      if (/system prompt|these instructions|SYSTEM:/i.test(text)) text = REFUSAL;
      if (text.length > 1600) text = `${text.slice(0, 1600).trim()}…`;

      return {
        ok: true as const,
        text: text || "I don't have that information in Suriya's portfolio yet.",
      };
    } catch (error) {
      const status = (error as { statusCode?: number; status?: number }).statusCode ?? 0;
      console.error("Suriya AI request failed", status, (error as Error).message);
      if (status === 429) {
        return { ok: false as const, error: "Too many questions right now — please retry shortly." };
      }
      if (status === 402 || status === 403) {
        return {
          ok: false as const,
          error: "The assistant is temporarily unavailable. Please try again later.",
        };
      }
      return { ok: false as const, error: "The assistant could not answer just now." };
    }
  });
