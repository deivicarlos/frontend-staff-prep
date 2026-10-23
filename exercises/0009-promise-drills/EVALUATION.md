# Exercise 0009: evaluation

**1 of 4** on mechanism (2026-10-22). The original 10 checks passed 10/10, but they had gaps.
I added three checks, verified 13/13 against a reference solution. His code scores 10/13.

| Function | Score | Cause |
| --- | --- | --- |
| `sleep` | 1 | Correct. `async` plus an explicit `new Promise` is redundant, but harmless. |
| `promiseAll` | 0 | `completed === results.length` compares against a **sparse** array. `results.length` is the highest index filled so far + 1, not the input count. `promiseAll([1, slow])` resolves `[1]` before `slow` has settled. Fix: count down from `items.length`. |
| `withTimeout` | 0 | `.then(val => resolve(val))` has no rejection handler. If the input rejects, the error is lost (it becomes an unhandled rejection, which crashes Node by default) and the caller gets `"timeout"` after `ms`. The timer is never cleared, so it is still running after a win (the stray `timeout` lines in the check output). The brief asked for `Promise.race`, which forwards both outcomes for free. |
| `retry` | 0 | `setInterval` is never cleared. It calls `fn` every `delayMs` **forever**, after success and after giving up (measured: 7 calls 200 ms after it resolved). The first call waits `delayMs` instead of running immediately. Calls overlap whenever `fn` takes longer than `delayMs`. The interval doesn't wait for a call to settle. A sync throw from `fn` escapes as an uncaught exception. There's dead code after the `return`. |

## Placement

The settle logic is right in shape: `Promise.resolve(item)` handles plain values, and an index-keyed
write keeps input order. Each failure is the **stop condition**: what ends the work (a count,
a rejection branch, clearing a timer). This is the LR-0019 pattern: bugs that only show when
you simulate a sequence (an early finisher, a rejection, the time after success) rather than
read a line.

## Not done

The 4 output-order predictions, the /4 quiz, and the spoken Big-O / "what does withTimeout
leave running" question.

## Attempt 2 (10-22): 11/13, stopped by him to move on

- `promiseAll`: **fixed** (`completed === items.length`).
- `retry`: **fixed in structure** (an await loop, called right away, stops on success). One
  remaining defect: `throw new Error(err)` wraps the error, so the message becomes "Error: e3"
  and the original stack and type are lost. Rethrow `err`.
- `withTimeout`: **still 0**. The input's rejection is still unhandled. The new line
  `Promise.reject(setTimeout(...))` creates a rejected promise whose reason is a timer handle,
  which is a second unhandled rejection. The timer is still not cleared. Rejected promise
  vs. reject callback remains unclear to him. Cold-check it in E.
