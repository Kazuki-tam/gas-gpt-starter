import { createCompletionByGpt3 } from "./openai/index.ts";
import type { GptFunction, GptRequestOptions } from "./types/openai.ts";

/**
 * main function
 */
declare const global: {
  [x: string]: GptFunction;
};

function GPT3(
  prompt: GptRequestOptions["prompt"],
  maxTokens?: number,
  model?: GptRequestOptions["model"],
  temperature?: number,
): string {
  const response = createCompletionByGpt3(
    prompt,
    maxTokens,
    model,
    temperature,
  );
  return response;
}

global.GPT3 = GPT3;
