import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { getPropertiesService } from "../../utils/getPropertiesService.ts";
import { setupGlobalMocks, cleanupGlobalMocks } from "../mocks.ts";

Deno.test("getPropertiesService - returns property value when exists", () => {
  // Setup
  setupGlobalMocks();
  
  // Test
  const result = getPropertiesService("OPENAI_API_KEY");
  
  // Assert
  assertEquals(result, "mock-api-key");
  
  // Cleanup
  cleanupGlobalMocks();
});

Deno.test("getPropertiesService - throws error when property doesn't exist", () => {
  // Setup
  setupGlobalMocks();
  
  // Test & Assert
  assertThrows(
    () => getPropertiesService("NON_EXISTENT_KEY"),
    Error,
    "Error: NON_EXISTENT_KEY is not defined."
  );
  
  // Cleanup
  cleanupGlobalMocks();
});
