import type { ChatGptApiInfo } from "../../types/openai.ts";
import {
  ChatGptSystemSchema,
} from "../../schemas/openaiSchema.ts";
import { httpRequestWithRetriesForChatGpt } from "./httpRequestWithRetriesForChatGpt.ts";
import { getPropertiesService } from "../../utils/getPropertiesService.ts";

/**
 * Create Text Completion with OpenAI ChatGPT
 *
 * @param {string} prompt Prompt
 * @param {string} system System Role
 * @param {number} maxTokens Max Tokens
 * @param {number} temperature Temperature
 * @return Response text returned by ChatGPT
 */
const createCompletionByChatGpt = (
  prompt: string,
  system?: string,
) => {
  if (!prompt) {
    throw new Error("You have to input the prompt at the least.");
  }

  if (system) {
    ChatGptSystemSchema.parse(system);
  }

  const OPENAI_API_KEY: string = getPropertiesService("OPENAI_API_KEY");
  const response = httpRequestWithRetriesForChatGpt(
    OPENAI_API_KEY,
    prompt,
    system,
  );
  if (!response) {
    throw new Error("Error: Response error.");
  }
  const parsedRes = JSON.parse(response.getContentText()) as ChatGptApiInfo;
  return parsedRes.choices[0].message.content.trim();
};

export { createCompletionByChatGpt };
