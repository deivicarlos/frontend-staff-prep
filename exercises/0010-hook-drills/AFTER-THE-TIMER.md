# After the timer: exercise 0010

Paste the `npm test` summary and `hooks.ts`.

| Hook | What must be in place |
| --- | --- |
| useDebouncedValue | State, plus an effect on `[value, ms]` that sets a timer and **clears it in cleanup**. The cleanup is the debounce: each change cancels the previous timer. |
| useDebouncedCallback | A **ref holding the latest fn**, updated every render. The returned function is stable (`useCallback` with `[ms]`, or a ref) and reads `fnRef.current` when the timer fires. The timer id lives in a ref and is cleared on unmount. Without the fn ref, it saves to T-101 (0007 bug 1). |
| useSearch | An effect on `[query]` with a per-run `ignore` (or `signal.aborted`) check in **both** the success and failure handlers. Cleanup sets it. Reset the error and set loading at the start of each run. |

Out loud: (1) Why does `useDebouncedCallback` need a ref, when `useDebouncedValue` doesn't?
(2) In `useSearch`, what does cleanup do when `query` changes from `r` to `refund`, and why
does that make the late `r` response harmless?
