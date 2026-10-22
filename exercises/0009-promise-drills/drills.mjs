// Write all four with no library help. Don't use Promise.all, allSettled or any.

export function sleep(ms) {
  return Promise.resolve(); // replace with a promise that resolves after ms
}

export function promiseAll(items) {
  return Promise.resolve([]); // replace
}

export function withTimeout(promise, ms) {
  return promise; // replace with Promise.race against a timer
}

export async function retry(fn, attempts, delayMs) {
  return fn(); // replace
}
