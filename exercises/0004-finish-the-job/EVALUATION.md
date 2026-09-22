# Exercise 0004 — evaluation

**2 of 4.** Requirements 1 and 2 pass their done-conditions. Requirements 3 and 4 were never
started. The shape is the opposite of 0003's and that is the finding.

## The four

**1 · Debounce — pass.** `useDebounce` is the right hook: `setTimeout` in an effect keyed to the
input string, `clearTimeout` in the cleanup, 500ms. One burst, one request. Nothing to fault.

**2 · Cancellation — pass.** Controller created in the effect, `signal` passed to `search()`,
`controller.abort()` in the cleanup. **This is the one that was wired and never armed in 0002.**
It is armed. The `snow` request logs as `aborted`, not `resolved`, which is the line that version
could not have produced.

One nit, not scored: the controller is constructed above the empty-query guard, so the guard's
early return leaves a controller that never gets a cleanup. Harmless — that path fires no
request — but the guard belongs first.

**3 · Error — 0.** No `.catch()`, no error state, nothing rendered. `boom` rejects into nothing
and the console gets an unhandled rejection. So does every abort from requirement 2.

The `try/catch` is worth more than the zero suggests, because it is the interesting kind of
wrong:

```ts
try {
  search(debounced, controller.signal).then(setResults);
} catch (err) {
  console.log(controller.signal.aborted);
}
```

`search()` throws nothing synchronously — it returns a promise and returns normally. The `catch`
block is unreachable. A rejected promise is not a thrown exception unless you `await` it inside
the `try`, or attach `.catch()` to the chain. **This is error-handling-shaped code that handles
no errors**, which is a sharper version of the thing this exercise was built to measure: it does
not look unfinished, it looks done.

**4 · Loading — 0.** Not started. No flag, no indicator.

## Also graded

**`any[]`.** Fourth time. `search()` still returns `any[]` and `results` is still `any[]`. One
line in `data.ts`.

**Leftovers.** `console.log({ debounced })` in the render body and the log inside the dead catch.
Both would be in the diff an interviewer reads.

## The protocol

| | |
| --- | --- |
| Transcribed **as actions** before the clock | ½ — the requirements are pasted in verbatim, not converted |
| 10-minute alarm set before the 20-minute timer | ? — unanswered |
| Buzzer table filled in before opening the rubric | ☐ — still empty |

The transcription step was upgraded for this exercise specifically: *write each requirement as
the action you will take*. What arrived is the brief's own markdown, headings included. That is
the 0003 step, not the 0004 one — and requirements 3 and 4 are exactly the two that stayed as
somebody else's prose and never became anything of yours.

The buzzer table has now gone unfilled three exercises running. It is four cells inside the file
you already have open.

## What changed, and what this measures

0003's misses were **scattered** — you reached requirement 6 and left holes behind you. These
are **trailing**: 1 and 2 finished, 3 and 4 untouched. That is a different failure and, on its
face, a better one — given a checkable done-condition, what you touched, you finished. The
`AbortController` is the proof: the same component that went unarmed in 0002 is armed here.

The open question is what the 20 minutes went into, because two requirements you had each built
before should not consume it. That is what the questions below are for.
