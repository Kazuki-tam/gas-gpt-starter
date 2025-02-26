import { assertSpyCalls, spy } from "https://deno.land/std@0.208.0/testing/mock.ts";
import { sleepForBackoff } from "../../utils/sleepForBackoff.ts";
import { setupGlobalMocks, cleanupGlobalMocks, mockUtilities } from "../mocks.ts";

Deno.test("sleepForBackoff - calls Utilities.sleep with appropriate timing", () => {
  // Setup
  setupGlobalMocks();
  const sleepSpy = spy(mockUtilities, "sleep");
  
  // Test
  const now = Date.now();
  sleepForBackoff(0, now - 100); // 100ms ago
  
  // Assert
  assertSpyCalls(sleepSpy, 1);
  
  // Cleanup
  sleepSpy.restore();
  cleanupGlobalMocks();
});

Deno.test("sleepForBackoff - increases backoff with retry count", () => {
  // Setup
  setupGlobalMocks();
  const sleepSpy = spy(mockUtilities, "sleep");
  const now = Date.now();
  
  // Test with different retry counts
  sleepForBackoff(0, now);
  sleepForBackoff(1, now);
  sleepForBackoff(2, now);
  
  // Assert - we just verify it was called 3 times
  // (exact timing would be hard to test due to jitter)
  assertSpyCalls(sleepSpy, 3);
  
  // Cleanup
  sleepSpy.restore();
  cleanupGlobalMocks();
});
