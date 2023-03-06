import type { GptApiInfo, GptRequestOptions } from "../../types/openai.ts";
import {
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
} from "../../schemas/openaiSchema.ts";
import { httpRequestWithRetriesForGpt3 } from "./httpRequestWithRetriesForGpt3.ts";
import { getPropertiesService } from "../../utils/getPropertiesService.ts";

/**
 * Create Text Completion with OpenAI GPT-3
 *
 * @param {GptRequestOptions["prompt"]} prompt Prompt
 * @param {number} maxTokens Max Tokens
 * @param {string} model Model
 * @param {number} temperature Temperature
 * @return Response text returned by GPT-3
 */
const createCompletionByGpt3 = (
  prompt: GptRequestOptions["prompt"],
  maxTokens = 100,
  model = "text-davinci-003",
  temperature = 0.3,
) => {
  if (!prompt) {
    throw new Error("You have to input the prompt at the least.");
  }

  if (maxTokens) {
    GptMaxTokensSchema.parse(maxTokens);
  }

  if (model) {
    GptModelSchema.parse(model);
  }

  if (temperature) {
    GptTemperatureSchema.parse(temperature);
  }

  const OPENAI_API_KEY: string = getPropertiesService("OPENAI_API_KEY");
  const response = httpRequestWithRetriesForGpt3(
    OPENAI_API_KEY,
    prompt,
    model,
    maxTokens,
    temperature,
  );
  if (!response) {
    throw new Error("Error: Response error.");
  }
  const parsedRes = JSON.parse(response.getContentText()) as GptApiInfo;
  return parsedRes.choices[0].text.trim();
};

export { createCompletionByGpt3 };
