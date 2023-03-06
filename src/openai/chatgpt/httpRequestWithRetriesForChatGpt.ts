import { sleepForBackoff } from "../../utils/sleepForBackoff.ts";

/**
 * Execute HTTP requests and retry failed requests.
 * @param {string} OPENAI_API_KEY OpenAI API key
 * @param {string} prompt Prompt
 * @return Response returned by ChatGPT
 */

const httpRequestWithRetriesForChatGpt = (
  OPENAI_API_KEY: string,
  prompt: string,
  system: string | undefined,
) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const messageArray = [
    {
      role: "user",
      content: prompt,
    },
  ];

  if (system) {
    const systemItem = {
      role: "system",
      content: system,
    };
    messageArray.unshift(systemItem);
  }

  const payload = {
    model: "gpt-3.5-turbo",
    messages: messageArray,
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
export { httpRequestWithRetriesForChatGpt };
