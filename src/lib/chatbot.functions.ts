import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/suriya-knowledge";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(1000),
      }),
    )
    .min(1)
    .max(20),
});

export const askSuriyaAi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { ok: false as const, error: "The assistant is not configured yet." };

    const gateway = createLovableAiGatewayProvider(key);

    try {
      const result = await generateText({
        model: gateway("google/gemini-3.7-flash"),
        system: buildSystemPrompt(),
        messages: data.messages,
      });
      const text = (await result.text).trim();
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
      if (status === 402) {
        return {
          ok: false as const,
          error: "The assistant is temporarily unavailable (AI credits exhausted).",
        };
      }
      return { ok: false as const, error: "The assistant could not answer just now." };
    }
  });
