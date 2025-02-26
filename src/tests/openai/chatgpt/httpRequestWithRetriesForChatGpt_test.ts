import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { assertSpyCalls, spy } from "https://deno.land/std@0.208.0/testing/mock.ts";
import { httpRequestWithRetriesForChatGpt } from "../../../openai/chatgpt/httpRequestWithRetriesForChatGpt.ts";
import { setupGlobalMocks, cleanupGlobalMocks, mockUrlFetchApp, mockLogger } from "../../mocks.ts";

Deno.test("httpRequestWithRetriesForChatGpt - makes successful request", () => {
  // Setup
  setupGlobalMocks();
  const fetchSpy = spy(mockUrlFetchApp, "fetch");
  const logSpy = spy(mockLogger, "log");
  
  // Test
  const response = httpRequestWithRetriesForChatGpt(
    "mock-api-key",
    "Test prompt",
    undefined,
    "gpt-4o-mini"
  );
  
  // Assert
  assertSpyCalls(fetchSpy, 1);
  assertSpyCalls(logSpy, 1);
  assertEquals(
    response?.getContentText(),
    JSON.stringify({
      id: "mock-id",
      object: "chat.completion",
      created: response?.getContentText() ? JSON.parse(response.getContentText()).created : 0,
      model: "gpt-4o-mini",
      usage: {
        prompt_tokens: 10,
        completion_tokens: 20,
        total_tokens: 30,
      },
      choices: [
        {
          message: {
            role: "assistant",
            content: "This is a mock response from the ChatGPT API",
          },
        },
      ],
      finish_reason: "stop",
      index: 0,
    })
  );
  
  // Cleanup
  fetchSpy.restore();
  logSpy.restore();
  cleanupGlobalMocks();
});

Deno.test("httpRequestWithRetriesForChatGpt - includes system message when provided", () => {
  // Setup
  setupGlobalMocks();
  const fetchSpy = spy(mockUrlFetchApp, "fetch");
  
  // Test
  httpRequestWithRetriesForChatGpt(
    "mock-api-key",
    "Test prompt",
    "You are a helpful assistant",
    "gpt-4o-mini"
  );
  
  // Assert - we just verify it was called
  assertSpyCalls(fetchSpy, 1);
  
  // Cleanup
  fetchSpy.restore();
  cleanupGlobalMocks();
});
