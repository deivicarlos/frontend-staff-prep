# After the timer — exercise 0004

Re-run each done-condition now, honestly, with the app open. Then paste the result back.

**Scoring is binary this time.** Each requirement is 1 or 0. Code that is clearly the right
idea and does not pass its done-condition scores **0** — that is the whole experiment. Last
time the scattered misses were things that looked addressed; a half mark would hide exactly
what this measures.

## The protocol

| | |
| --- | --- |
| Each requirement transcribed into `Typeahead.tsx` as an action, before the clock | ☐ |
| A 10-minute alarm set before the 20-minute timer started | ☐ |
| The buzzer table filled in before you opened this file | ☐ |

## The four

**1 · Debounce.** A timer in an effect, cleared in the cleanup, keyed to `query`. The usual
failure is a `setTimeout` with no `clearTimeout`, which fires every keystroke's request late
rather than not at all — the log tells you which you shipped.

**2 · Cancellation.** `AbortController` created in the effect, `signal` passed to `search()`,
`controller.abort()` in the cleanup. In 0002 you reached for the controller and never called
`abort()`; the log's `aborted` line is there so that version cannot pass. Guarding with a
`stale` boolean instead also scores 1 — it fixes the render. Say which you chose.

**3 · Error.** `.catch()` or `try/catch` around the await, error in state, rendered. Two halves
people miss: swallowing `AbortError` (it is not an error the user should see), and clearing the
error when the next query starts. If the error is still on screen under the Dune results, this
is 0.

**4 · Loading.** Set true when the request starts, false in a `finally` — not only on success.
The failure this catches is a spinner that never stops after `boom`.

## Also graded

**`Book[]`.** Did the `any` go? Fourth time of asking.

## Three questions

1. Which requirement did you consider done and then find failing when you re-ran its check?
2. Did the 10-minute alarm change anything you did, or did you already know what was left?
3. Did the done-conditions make you work differently — or did you build the same way and just
   read them at the end?
