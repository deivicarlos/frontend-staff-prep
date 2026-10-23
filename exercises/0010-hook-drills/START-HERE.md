# Exercise 0010: hook drills

**30 minutes: about 8, 8 and 14.** No AI, no docs. Edit `hooks.ts` only. `npm install` once,
then `npm test` (or `npm run watch`, which reruns on save). No app, just the hooks and 13 tests.

1. `useDebouncedValue(value, ms)`, the search-box hook.
2. `useDebouncedCallback(fn, ms)`, the autosave hook. One test is the 0007 `saveLater` bug.
3. `useSearch(query, fetcher)`, which fetches with { data, error, loading }. Two tests have two
   requests in flight. One is the abort-without-guard bug from today's discussion.

## Protocol

1. Read all three stubs first, then budget the 30 minutes.
2. Finish each hook against its tests before you start the next.
3. Before writing #3, write the sequence as a comment: "r starts, refund starts, refund lands,
   r lands → …".
4. At the buzzer, note which tests are still red.

**Don't open `AFTER-THE-TIMER.md` until the 30 minutes are up.**
