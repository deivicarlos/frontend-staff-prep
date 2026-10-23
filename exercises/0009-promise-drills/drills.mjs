// Write all four with no library help. Don't use Promise.all, allSettled or any.

// Do it
// In exercises/0009-promise-drills/drills.mjs, write the four functions without using Promise.all, allSettled or any. Run node check.mjs in that folder after each one.

// sleep(ms): resolves after ms.
// promiseAll(items): behaves like Promise.all. Values in input order, the first rejection wins, [] fulfills with [], and plain values pass through.
// withTimeout(promise, ms): rejects with new Error("timeout") if promise hasn't settled within ms. Use Promise.race.
// retry(fn, attempts, delayMs): calls fn(), and on rejection waits delayMs and calls it again, up to attempts calls in total. It rejects with the last error.
// Done when the last line reads 10/10 pass. With the stubs it reads 3/10 pass.

// Then say out loud the Big-O of promiseAll, and what your withTimeout leaves running when the promise wins.

export async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));


export function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    try {
      if (items.length === 0) {
        resolve(results);
      }

      items.forEach((item, index) => {
        Promise.resolve(item)
          .then((val) => {
            results[index] = val;
            completed++;

            if (completed === items.length) {
              resolve(results);
            }
          })
          .catch((err) => reject(err));
      });
    } catch (err) {
      reject(err);
    }
  });
}

\export function withTimeout(promise, ms) {
  const now = Date.now();

  return new Promise((resolve, reject) => {
    Promise.resolve(promise).then((val) => resolve(val));
    setTimeout(() => reject(new Error("timeout")), ms);
  });
}

export async function retry(fn, attempts, delayMs) {
  let retries = 0;

  while (retries < attempts) {
    try {
      return await fn();
    } catch (err) {
      retries++;

      if (retries === attempts) {
        throw new Error(err);
      }

      await sleep(delayMs);
    }
  }
}
