# He reads the effect-cleanup `ignore` flag as noise; he has no model of when cleanup runs

2026-10-22, exercise 0007 (review rep 2). **0/3.** See [the evaluation](../exercises/0007-review-the-desk/EVALUATION.md).

## Finding 1: the guard is pattern-matched, not understood

(His call that the flag is unnecessary in the `[]` mount effect was right, and I retracted it
10-22: there, cleanup runs only on unmount, where a late `setState` is a no-op.) In the
`[ticketId]` effect he asked for an abort, because "the slowest response renders last". The
existing `ignore` flag already prevents that. He doesn't run the sequence: deps change →
**cleanup of the previous run** → new run, and a stale response lands with `ignore` already true.
He placed this guard correctly when *writing* code in 0005 (LR-0013). Reading it, he doesn't
recognise it (the same split as LR-0019 finding 2), and now he would actively remove it.

## Finding 2: LR-0019 holds on rep 2

The only bug he got near (the search race) was found as "no abort", not as an order of events.
He didn't reach the two bugs that need a sequence (a stale ref closure, code after a
`try/catch` that runs on failure). Coverage stopped at 3 of 6 blocks.

## What to do

Before any further review reps: one drill on when cleanup runs (mount, StrictMode double run,
deps change, unmount), with him narrating "A starts, B starts, A lands → ignore is…". Cold-check
it in E. For the interview: never call a guard unnecessary without first saying what happens
without it.
