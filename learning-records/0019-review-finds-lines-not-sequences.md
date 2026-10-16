# In review he finds single-line bugs; bugs that need time or sequence simulated go unseen

2026-10-16, exercise 0006 (review an AI-written React PR, 15 min read, 5 min run). **4/7.**
See [the evaluation](../exercises/0006-review-the-pr/EVALUATION.md).

## Finding 1: he finds what one line shows, not what a sequence shows

Found: `dangerouslySetInnerHTML`, `key={index}`, in-place mutation + same array, `setInterval`
with no cleanup. Each is visible on one line by pattern.
Missed: the stale closure (needs "what does this closure hold after the 2nd render?"), the race
(needs "two requests in flight, which lands last?"), the missing error path (needs "what if this
rejects?"). All three need the code **run in his head across time**. Same root as LR-0011
(no ordering model) and LR-0009/0013 (scenarios don't become tasks).

## Finding 2: writing a fix is not recognising the bug

He placed the abort/ignore guard correctly under a clock in 0005 (LR-0013). Here, reading the
same unguarded effect, he didn't see it. Recognition from reading is a separate skill and needs
its own reps.

## Finding 3: he read `[]` as a label ("onMount") instead of a closure boundary

He looked at the keydown effect and proposed grouping it with other mount effects. The
`eslint-disable-next-line react-hooks/exhaustive-deps` above it drew no comment.

## Finding 4: mechanisms without impact

Every comment says what the code does wrong. None says what the user sees. For a Staff
interview the impact sentence is the part that's graded.

## Direction

Give him a fixed **three-question pass per effect/handler**: (1) what does it close over, and
when does that go stale? (2) what if it runs twice, or two runs overlap? (3) what if it fails?
Plus one impact sentence per finding. Rep 2 tests whether the checklist transfers.
