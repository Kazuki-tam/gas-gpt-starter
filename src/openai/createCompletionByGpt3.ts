import { GptApiInfo, GptRequestOptions } from "../types/openai.ts";
import {
  GptMaxTokensSchema,
  GptModelSchema,
  GptTemperatureSchema,
} from "../schemas/openaiSchema.ts";

/**
 * Create Text Completion with OpenAI GPT-3
 *
 * @param {GptRequestOptions["prompt"]} prompt Prompt
 * @param {number} maxTokens Max Tokens
 * @param {string} model Model
 * @param {number} temperature Temperature
 * @return Response text returned by GPT-3
 */

export const createCompletionByGpt3 = (
  prompt: GptRequestOptions["prompt"],
  maxTokens = 100,
  model = "text-davinci-003",
  temperature = 0.3,
) => {
  if (!prompt) {
    throw new Error("You have to input the prompt at the least.");
  }

  const OPENAI_API_KEY: string | null = PropertiesService.getScriptProperties()
    .getProperty("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    throw new Error("You have to set your OpenAI API Key.");
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

  const url = "https://api.openai.com/v1/completions";
  const payload = {
    model: model,
    prompt: prompt,
    suffix: null,
    temperature: temperature,
    max_tokens: maxTokens,
    top_p: 1,
  };

  const fetchOptions = {
    contentType: "application/json",
    headers: { Authorization: "Bearer " + OPENAI_API_KEY },
    payload: JSON.stringify(payload),
  };

  try {
    const res = UrlFetchApp.fetch(url, fetchOptions);
    if (res.getResponseCode() !== 200) {
      throw new Error(`Error: ${res.getContentText()}`);
    }
    const parsedRes = JSON.parse(res.getContentText()) as GptApiInfo;
    return parsedRes.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    throw new Error(`Error: ${error}`);
  }
};
