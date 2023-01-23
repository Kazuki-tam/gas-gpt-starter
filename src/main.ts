import { createCompletionByGpt3 } from "./openai/index.ts";
import { GptFunction, GptRequestOptions } from "./types/openai.ts";

/**
 * main function
 */
declare const global: {
  [x: string]: GptFunction;
};

function GPT3(
  prompt: GptRequestOptions["prompt"],
  maxTokens?: number,
  gptOptions?: GptRequestOptions,
): string {
  const response = createCompletionByGpt3(prompt, maxTokens, gptOptions);
  return response;
}

global.GPT3 = GPT3;
