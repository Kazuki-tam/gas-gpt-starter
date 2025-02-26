/**
 * Mocks for Google Apps Script global objects
 */

// Define proper types for the fetch options
interface UrlFetchOptions {
  contentType?: string;
  headers?: Record<string, string>;
  muteHttpExceptions?: boolean;
  payload?: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  followRedirects?: boolean;
  validateHttpsCertificates?: boolean;
  escaping?: boolean;
}

// Mock Logger
export const mockLogger = {
  log: (message: string) => {
    console.log(message);
    return null;
  },
};

// Mock UrlFetchApp
export const mockUrlFetchApp = {
  fetch: (_url: string, _options: UrlFetchOptions) => {
    return {
      getResponseCode: () => 200,
      getContentText: () => JSON.stringify({
        id: "mock-id",
        object: "chat.completion",
        created: Date.now(),
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
      }),
    };
  },
};

// Mock PropertiesService
export const mockPropertiesService = {
  getScriptProperties: () => ({
    getProperty: (key: string) => {
      const properties: Record<string, string> = {
        OPENAI_API_KEY: "mock-api-key",
      };
      return properties[key] || null;
    },
  }),
};

// Mock Utilities
export const mockUtilities = {
  sleep: (_milliseconds: number) => {
    // Do nothing in tests
  },
};

// Setup global mocks
export const setupGlobalMocks = () => {
  // @ts-ignore: Mocking Google Apps Script global Logger object
  globalThis.Logger = mockLogger;
  // @ts-ignore: Mocking Google Apps Script global UrlFetchApp object
  globalThis.UrlFetchApp = mockUrlFetchApp;
  // @ts-ignore: Mocking Google Apps Script global PropertiesService object
  globalThis.PropertiesService = mockPropertiesService;
  // @ts-ignore: Mocking Google Apps Script global Utilities object
  globalThis.Utilities = mockUtilities;
  
  // For compatibility with code that uses global
  // @ts-ignore: Creating global alias for globalThis for compatibility
  globalThis.global = globalThis;
};

// Cleanup global mocks
export const cleanupGlobalMocks = () => {
  // @ts-ignore: Removing mock Google Apps Script global Logger object
  delete globalThis.Logger;
  // @ts-ignore: Removing mock Google Apps Script global UrlFetchApp object
  delete globalThis.UrlFetchApp;
  // @ts-ignore: Removing mock Google Apps Script global PropertiesService object
  delete globalThis.PropertiesService;
  // @ts-ignore: Removing mock Google Apps Script global Utilities object
  delete globalThis.Utilities;
  // @ts-ignore: Removing global alias
  delete globalThis.global;
};
