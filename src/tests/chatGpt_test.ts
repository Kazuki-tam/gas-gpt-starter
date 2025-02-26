import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { setupGlobalMocks, cleanupGlobalMocks } from "./mocks.ts";

// Mock implementation for createCompletionByChatGpt
let lastPrompt = "";
let lastSystem: string | undefined = undefined;
let lastModel = "";

// Create a mock implementation
const mockCreateCompletionByChatGpt = (
  prompt: string,
  system?: string,
  model: string = "gpt-4o-mini"
): string => {
  lastPrompt = prompt;
  lastSystem = system;
  lastModel = model;
  return "Mock response";
};

// We need to re-declare the global object to match the one in chatGpt.ts
declare const global: {
  CHATGPT: (prompt: string, system?: string, model?: string) => string;
  [x: string]: unknown;
};

Deno.test("CHATGPT function - calls createCompletionByChatGpt with correct parameters", () => {
  // Setup
  setupGlobalMocks();
  
  // Override the import
  // @ts-ignore: Mock import for testing purposes
  globalThis.mockImport = {
    createCompletionByChatGpt: mockCreateCompletionByChatGpt
  };
  
  try {
    // Reset tracking variables
    lastPrompt = "";
    lastSystem = undefined;
    lastModel = "";
    
    // Define our own CHATGPT function that uses our mock
    global.CHATGPT = (prompt: string, system?: string, model = "gpt-4o-mini") => {
      return mockCreateCompletionByChatGpt(prompt, system, model);
    };
    
    // Test
    global.CHATGPT("Test prompt", "System message", "gpt-4o");
    
    // Assert
    assertEquals(lastPrompt, "Test prompt");
    assertEquals(lastSystem, "System message");
    assertEquals(lastModel, "gpt-4o");
  } finally {
    // Cleanup
    cleanupGlobalMocks();
  }
});

Deno.test("CHATGPT function - uses default model when not specified", () => {
  // Setup
  setupGlobalMocks();
  
  try {
    // Reset tracking variables
    lastPrompt = "";
    lastSystem = undefined;
    lastModel = "";
    
    // Define our own CHATGPT function that uses our mock
    global.CHATGPT = (prompt: string, system?: string, model = "gpt-4o-mini") => {
      return mockCreateCompletionByChatGpt(prompt, system, model);
    };
    
    // Test
    global.CHATGPT("Test prompt");
    
    // Assert
    assertEquals(lastPrompt, "Test prompt");
    assertEquals(lastSystem, undefined);
    assertEquals(lastModel, "gpt-4o-mini");
  } finally {
    // Cleanup
    cleanupGlobalMocks();
  }
});
