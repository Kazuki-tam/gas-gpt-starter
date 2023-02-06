/**
 * Sleep after failed requests.
 * @param {number} numRetries The number to retry
 * @param {number} lastRequestTime The last request time
 */
const sleepForBackoff = (numRetries: number, lastRequestTime: number): void => {
  const backoff = Math.min(1000 * (1.6 ** numRetries), 60000);
  const jitter = 1 + 0.23 * (2 * Math.random() - 1); // Random value in [0.77 1.23]
  const sleepTime = Date.now() - lastRequestTime + backoff * jitter;
  Utilities.sleep(sleepTime);
};

export { sleepForBackoff };
