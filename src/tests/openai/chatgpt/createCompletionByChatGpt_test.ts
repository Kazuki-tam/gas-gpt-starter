import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { createCompletionByChatGpt } from "../../../openai/chatgpt/createCompletionByChatGpt.ts";
import { setupGlobalMocks, cleanupGlobalMocks } from "../../mocks.ts";

Deno.test("createCompletionByChatGpt - returns expected response", () => {
  // Setup
  setupGlobalMocks();
  
  // Test
  const result = createCompletionByChatGpt("Test prompt", undefined, "gpt-4o-mini");
  
  // Assert
  assertEquals(result, "This is a mock response from the ChatGPT API");
  
  // Cleanup
  cleanupGlobalMocks();
});

Deno.test("createCompletionByChatGpt - throws error when prompt is empty", () => {
  // Setup
  setupGlobalMocks();
  
  // Test & Assert
  assertThrows(
    () => createCompletionByChatGpt("", undefined, "gpt-4o-mini"),
    Error,
    "You have to input the prompt at the least."
  );
  
  // Cleanup
  cleanupGlobalMocks();
});

Deno.test("createCompletionByChatGpt - works with system message", () => {
  // Setup
  setupGlobalMocks();
  
  // Test
  const result = createCompletionByChatGpt(
    "Test prompt", 
    "You are a helpful assistant",
    "gpt-4o-mini"
  );
  
  // Assert
  assertEquals(result, "This is a mock response from the ChatGPT API");
  
  // Cleanup
  cleanupGlobalMocks();
});
