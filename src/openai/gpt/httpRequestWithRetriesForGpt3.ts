import { sleepForBackoff } from "../../utils/sleepForBackoff.ts";

/**
 * Execute HTTP requests and retry failed requests.
 * @param {string | string[]} prompt Prompt
 * @param {string} OPENAI_API_KEY OpenAI API key
 * @param {string} model Model
 * @param {number} maxTokens Max Tokens
 * @param {number} temperature Temperature
 * @return Response returned by GPT-3
 */

const httpRequestWithRetriesForGpt3 = (
  OPENAI_API_KEY: string,
  prompt: string | string[],
  model: string,
  maxTokens: number,
  temperature: number,
) => {
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
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  };

  let response = null;
  for (let numRetries = 0; numRetries < 5; numRetries++) {
    const lastRequestTime = Date.now();
    try {
      Logger.log(`Sending HTTP request to ${url}`);
      response = UrlFetchApp.fetch(url, fetchOptions);
      const responseCode = response.getResponseCode();
      if (responseCode !== 429 && responseCode < 500) {
        return response;
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    Logger.log(`Retrying after ${numRetries} failed requests.`);
    sleepForBackoff(numRetries, lastRequestTime);
  }
  return response;
};
export { httpRequestWithRetriesForGpt3 };
