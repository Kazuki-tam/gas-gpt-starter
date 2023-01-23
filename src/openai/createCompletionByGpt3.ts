import { GptApiInfo, GptRequestOptions } from "../types/openai.ts";

/**
 * Create Text Completion with OpenAI GPT-3
 *
 * @param {GptRequestOptions["prompt"]} prompt Prompt
 * @param {number} maxTokens Max Tokens
 * @param {GptRequestOptions} gptOptions GPT-3 request body
 * @return Response text returned by GPT-3
 */

declare const OPENAI_API_KEY: string;

export const createCompletionByGpt3 = (
  prompt: GptRequestOptions["prompt"],
  maxTokens = 100,
  gptOptions?: GptRequestOptions,
) => {
  if (!prompt) {
    throw new Error("You have to input the prompt at the least.");
  }
  const modelsArray = [
    "text-davinci-003",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
  ];
  if (gptOptions?.model && !modelsArray.includes(gptOptions.model)) {
    throw new Error(
      "You have to select a model from text-davinci-003, text-curie-001, text-babbage-001, text-ada-001.",
    );
  }

  const url = "https://api.openai.com/v1/completions";
  const payload = {
    model: gptOptions?.model || "text-davinci-003",
    prompt: prompt,
    suffix: gptOptions?.suffix || null,
    temperature: gptOptions?.temperature || 0.3,
    max_tokens: maxTokens,
    top_p: gptOptions?.top_p || 1,
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
    throw new Error("An error occurred while fetching data from OpenAI API.");
  }
};
