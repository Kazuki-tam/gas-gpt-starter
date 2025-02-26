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
  model: string = "gpt-4o-mini",
): string {
  const response = createCompletionByChatGpt(
    prompt,
    system,
    model,
  );
  return response;
}

global.CHATGPT = CHATGPT;
