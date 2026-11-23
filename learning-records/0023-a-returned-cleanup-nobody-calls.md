# He returns a cleanup from a plain callback, where nobody calls it; the ref pattern isn't retrieved

2026-11-22, exercise 0010 cold retest (all three hooks from stubs, 30 min, unfinished). **9/13**
(10-28 cold: 6/13).

## Finding 1: #3 held, one miss

The guard is now in the right place (after the `await`, in both branches) and passes both
two-in-flight tests, including the old-failure one. The 10-28 coaching held at 25 days. Missed: no
early return for `""` (1 test).

## Finding 2: #2 failed the same way as 10-28 (1/4)

His `debouncedFn` creates a timer and *returns* `() => clearTimeout(id)`. React calls only a
function returned from an **effect**; a returned function from a plain callback goes to whoever
called it, and the caller ignores it. So the previous timer is never cleared (N calls → N runs) and
nothing clears at unmount. He commented out a `useRef(fn)` line: he knows a ref belongs there but
can't produce what it's for. Deps `[_fn, ms]` with `_fn` depending on `fn` → new identity each render.
The "latest fn" test passes only because identity isn't stable.

## What to do

Teach #2 as four requirements → four mechanisms (timer id in a ref, clear before set; fn in a ref
updated after render; `useCallback` with `[ms]`; unmount effect). Rewrite #2 cold the same day, then
cold again in a week. Ask him who calls a function he returns.

## Same day, after teaching

Cold rewrite of #2: 3/4. Both refs, clear-before-set and `[ms]` right; still returned a cleanup from
the callback and had no unmount effect. After one more pointer ("where does React call what you
return?") he moved the clear into a `[]` effect and deleted the dead return: 13/13. The returned
cleanup survived one round of explicit teaching, so the cold retest in a week is the real check.
