import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * Google Gemini via its official OpenAI-compatible endpoint.
 * Docs: https://ai.google.dev/gemini-api/docs/openai
 * Get a free API key at https://aistudio.google.com/apikey
 */
export function createGeminiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "gemini",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    headers: { Authorization: `Bearer ${apiKey}` },
  });
}
