// Not yours. Run: node check.mjs
import { sleep, promiseAll, withTimeout, retry } from "./drills.mjs";

// Unconsumed inputs that reject later would otherwise crash Node.
process.on("unhandledRejection", () => {});

const results = [];
async function check(name, fn) {
  try {
    const got = await fn();
    results.push([got === true ? "pass" : "FAIL", name, got === true ? "" : got]);
  } catch (e) {
    results.push(["FAIL", name, `threw ${e?.message ?? e}`]);
  }
}

const after = (ms, value, fail = false) =>
  new Promise((res, rej) => setTimeout(() => (fail ? rej(new Error(value)) : res(value)), ms));

await check("sleep(50) waits about 50 ms", async () => {
  const t = performance.now();
  await sleep(50);
  const d = performance.now() - t;
  return (d >= 45 && d < 120) || `took ${d.toFixed(0)} ms`;
});

await check("promiseAll keeps input order, not finish order", async () => {
  const got = await promiseAll([after(60, "slow"), after(10, "fast"), 42]);
  return JSON.stringify(got) === '["slow","fast",42]' || `got ${JSON.stringify(got)}`;
});

await check("promiseAll runs inputs concurrently (about 60 ms, not 120)", async () => {
  const t = performance.now();
  await promiseAll([after(60, 1), after(60, 2)]);
  const d = performance.now() - t;
  return d < 100 || `took ${d.toFixed(0)} ms`;
});

await check("promiseAll([]) fulfills with []", async () => {
  const got = await withGuard(promiseAll([]));
  return JSON.stringify(got) === "[]" || `got ${JSON.stringify(got)}`;
});

await check("promiseAll rejects with the first rejection, without waiting", async () => {
  const t = performance.now();
  try {
    await promiseAll([after(100, "ok"), after(20, "first", true), after(40, "second", true)]);
    return "fulfilled";
  } catch (e) {
    const d = performance.now() - t;
    if (e.message !== "first") return `rejected with ${e.message}`;
    return d < 80 || `waited ${d.toFixed(0)} ms`;
  }
});

await check("withTimeout passes a fast value through", async () => {
  const got = await withTimeout(after(10, "v"), 50);
  return got === "v" || `got ${got}`;
});

await check('withTimeout rejects with Error("timeout") at about 30 ms', async () => {
  const t = performance.now();
  try {
    await withTimeout(after(200, "late"), 30);
    return "fulfilled";
  } catch (e) {
    const d = performance.now() - t;
    if (e.message !== "timeout") return `rejected with ${e.message}`;
    return d < 80 || `took ${d.toFixed(0)} ms`;
  }
});

await check("retry succeeds on the 3rd call of 3", async () => {
  let calls = 0;
  const got = await retry(() => (++calls < 3 ? after(1, `e${calls}`, true) : after(1, "ok")), 3, 10);
  return (got === "ok" && calls === 3) || `got ${got} after ${calls} calls`;
});

await check("retry gives up after 3 calls, rejecting with the last error", async () => {
  let calls = 0;
  try {
    await retry(() => after(1, `e${++calls}`, true), 3, 10);
    return "fulfilled";
  } catch (e) {
    return (e.message === "e3" && calls === 3) || `rejected with ${e.message} after ${calls} calls`;
  }
});

await check("retry waits delayMs between calls (2 waits of 40 ms)", async () => {
  const t = performance.now();
  try { await retry(() => after(1, "x", true), 3, 40); } catch {}
  const d = performance.now() - t;
  return (d >= 75 && d < 200) || `took ${d.toFixed(0)} ms`;
});

// Added 10-22 after grading: cases the first ten let through.
await check("promiseAll waits for every input when an earlier one finishes first", async () => {
  const got = await withGuard(promiseAll([1, after(30, 2)]));
  return JSON.stringify(got) === "[1,2]" || `got ${JSON.stringify(got)}`;
});

await check("withTimeout passes the input's own rejection through, before the timer", async () => {
  const t = performance.now();
  try {
    await withTimeout(after(10, "boom", true), 100);
    return "fulfilled";
  } catch (e) {
    const d = performance.now() - t;
    if (e.message !== "boom") return `rejected with ${e.message}`;
    return d < 60 || `took ${d.toFixed(0)} ms`;
  }
});

await check("retry calls fn right away and stops calling it after success", async () => {
  let calls = 0;
  const t = performance.now();
  await withGuard(retry(() => (++calls, after(1, "ok")), 3, 40));
  const d = performance.now() - t;
  const atResolve = calls;
  await after(150);
  if (d >= 30) return `first call waited ${d.toFixed(0)} ms`;
  return (atResolve === 1 && calls === 1) || `${atResolve} call(s) at resolve, ${calls} after 150 ms more`;
});

function withGuard(p) {
  return Promise.race([p, after(200, "never settled", true)]);
}

for (const [status, name, why] of results) console.log(`${status}  ${name}${why ? `\n        ${why}` : ""}`);
console.log(`\n${results.filter(([s]) => s === "pass").length}/${results.length} pass`);
process.exit(0);
