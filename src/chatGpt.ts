import { createCompletionByChatGpt } from "./openai/index.ts";
import type { ChatGptFunction } from "./types/openai.ts";

/**
 * main function
 */
declare const global: {
  [x: string]: ChatGptFunction;
};

function CHATGPT(
  prompt: string,
  system?: string,
): string {
  const response = createCompletionByChatGpt(
    prompt,
    system,
  );
  return response;
}

global.CHATGPT = CHATGPT;
