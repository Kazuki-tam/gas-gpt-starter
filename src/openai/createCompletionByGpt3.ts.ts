import { GptApiInfo, GptRequestOptions } from "../types/openai.ts";

/**
 * GPT-3 and Google Sheets
 *
 * @param {string} prompt Prompt
 * @param {number} temperature Temperature
 * @param {string} model GPT-3 Model
 * @return Response text returned by GPT-3
 */

declare const OPENAI_API_KEY: string;

export const createCompletionByGpt3 = (
  prompt: GptRequestOptions["prompt"],
  maxTokens?: number,
  gptOptions?: GptRequestOptions,
) => {
  if (!prompt) {
    throw new Error("You have to input the prompt at the least.");
  }

  const url = "https://api.openai.com/v1/completions";
  const payload = {
    model: gptOptions?.model || "text-davinci-003",
    prompt: prompt,
    temperature: gptOptions?.temperature || 0.3,
    max_tokens: maxTokens || 100,
  };

  const options = {
    contentType: "application/json",
    headers: { Authorization: "Bearer " + OPENAI_API_KEY },
    payload: JSON.stringify(payload),
  };

  const res = JSON.parse(
    UrlFetchApp.fetch(url, options).getContentText(),
  ) as GptApiInfo;
  return res.choices[0].text.trim();
};
