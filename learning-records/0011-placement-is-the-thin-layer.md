# Placement is the thin layer, not the API

Session 6, 2026-09-24. After reading
[`reference/async-request-layer.html`](../reference/async-request-layer.html) he did the cold
rewrite at its foot: deleted the 0004 request effect and wrote it back from memory. He reported
*"I didn't stop this time."* It took three passes to get correct.

## Finding 1: he recalled the pieces and put them in the wrong place

Pass 1 had every piece the sheet named: `AbortController`, `signal` passed to the call, `await`
inside the `try`, `signal.aborted` checked in the `catch`, `finally` clearing the loading flag.
But the controller was created inside the inner `async` function and the cleanup was
`() => {}`, so `abort()` could never run. The `catch` guard he wrote was dead code as a result.

This is the same failure as [LR-0009](0009-the-re-read-is-the-load-bearing-step.md) finding 4,
where `aria-activedescendant` went on the `<ul>` instead of the input. **Two instances, one
shape: he recalls what the technique is made of but not where each part goes.** LR-0010 finding 3
called this "API recall". It is narrower than that, and the narrower name is *placement*. One
hint fixed it ("can your cleanup see the controller?").

**Implication for sheet 2 (`combobox-aria.html`):** make placement the spine. The table of which
element carries which attribute is the core of the sheet, not an appendix.

## Finding 2: he guarded the catch but not the finally, then tried to fix it in the wrong place

Across passes 1–3 the `catch` was guarded and the `finally` was not, even though the sheet's
block guards both and trap 3 describes exactly this bug. Told it was "trap 3", he added
`setIsLoading(false)` to the cleanup instead. That cannot work: the stale request's `finally` is
a microtask that runs *after* the new effect has set the flag to `true`, so it runs after any
cleanup too.

So this is not only recall. **He does not yet have the ordering model: effect cleanup, then the
new effect, both synchronous in one commit, then the aborted promise's handlers as
microtasks.** That is event-loop material, which is exactly the orphaned calibration **Q17**.
This is evidence for lesson 4 (see [STATE.md](../STATE.md)): the event-loop part should use this
case, supersede a request and ask what order the three writes to `isLoading` land in, rather
than a textbook `setTimeout`/`Promise` puzzle.

What finally landed was naming the exact line. **A hint that points at other code ("same
condition your catch already has") did not land. He asked what exactly he was missing.** When a
reference hint fails once, give the line itself.

## Finding 3: a smooth rewrite is not evidence that the code works

He reported no stalls on pass 1, and pass 1 failed two of the three requirements it was
supposed to be checked against. I asked twice whether he ran the done-conditions in the browser
after pass 1 and got no answer. This is consistent with the checks not being run, but it is
unconfirmed.

**Implication for exercise 0005:** the AFTER-THE-TIMER step should ask him to paste the log
panel's output for each requirement rather than tick a box. That turns "I checked" into
something that can be seen.

## Finding 4: the empty-query early return dropped out twice

The `return` inside `if (!debounced.trim())` was missing in passes 1 and 2, so an empty input
fetched the whole catalogue, because `search("")` matches every title. It is small, but it is
the same shape as the tail misses in 0004: a line that does not look like part of the technique
gets skipped.

## Finding 5: `any` is closed

He typed `search()` as `Promise<Book[]>` and `RAW` as `Book[]` at the source, unprompted. This
had survived four exercises. Remove it from the standing gaps.

## Teacher errors this session

- 0004's requirement-4 done-condition tests a single query only, so it cannot catch the
  unguarded `finally`. Supersede checks for loading state need a multi-request done-condition
  (every query slowed to 1500ms, switch queries mid-flight, the spinner must not drop).
- I told him the cleanup's `setIsLoading(false)` was redundant. It is not: once `finally` is
  guarded, it is the only thing that clears the spinner when the input is emptied mid-flight.
  Corrected in session.
