# The requirements fell out of working memory — and reps are working

Both findings come from Carlos's report-back on
[exercise 0002](../exercises/0002-typeahead-rebuild/EVALUATION.md), answering the two questions
[LR-0005](0005-cleanup-is-keyed-to-timers.md) left open. Both change what to do next.

## Finding 1: requirements 3 and 4 were lost to process, not to skill

Asked whether the discriminated union crossed his mind, he said it didn't — *and* volunteered
the more important thing:

> "I read the requirements once before starting and never again so i forgot those things."

That reframes the scorecard. Loading and error did not go unbuilt because he cannot build
them — he rendered a loading state in attempt 0001 and threw correctly on `!response.ok` in
both attempts. They went unbuilt because **they left his working memory around minute five and
nothing brought them back.** He was building from recall of the brief rather than from the
brief.

This is a distinct failure axis from everything else in the workspace. Every prior finding has
been about the React model — identity, cleanup, state shape. This one is about how he runs the
45 minutes, and it is arguably the cheapest thing here to fix and the most expensive to leave.
In a real loop, a candidate who silently drops two of six stated requirements reads as *didn't
listen*, which scores worse than a candidate who builds four and names the two he cut. The
requirements list is the rubric; the interviewer is holding it while he types.

**Intervention, starting with exercise 0003 — make it a standing rule in every exercise brief:**

1. Before the clock starts, transcribe the requirements into the file as a comment block or a
   scratch checklist. Copying them is the encoding step; reading them isn't.
2. Re-read that list at the halfway mark, out loud. One planned interrupt is enough — the
   failure is having zero.
3. At the buzzer, say which requirements are unmet and what you'd do next. Naming the gap
   recovers most of the credit that silently missing it loses.

Worth noting this is consistent with, not contradicted by, the union answer: he did not
consider the union, so it isn't a reflex yet. But the union is a *nice-to-have* he can't be
faulted much for skipping under a clock. Loading and error were **stated requirements**, and
those were lost to a process gap. Do not spend a lesson on discriminated unions on this
evidence; fix the process and see whether the state-shape question survives it.

## Finding 2: the reps lever is working — keep pulling it

On whether the familiar parts felt faster the second time:

> "They felt more automatic as I knew what is was doing this time as I did some of this in the
> past lesson so i felt a little less rusty"

Self-reported, so weak evidence on its own — but it corroborates the code. Attempt 0002 spent
its 45 minutes producing a correct debounce, correct dependency arrays, a component hierarchy,
and most of a cancellation implementation. Attempt 0001 spent the same 45 minutes on a frozen
query key. Speed on the familiar layer is what bought the extra ground, even though the
scorecard total didn't move.

He also attributes the improvement to lesson 2 specifically, which is the first direct evidence
that a lesson transferred into timed production rather than only into a retrieval quiz.

**Implication:** repetition against a clock is confirmed as the primary instrument, matching the
retrieval-not-knowledge thesis from [LR-0003](0003-identity-is-the-gap.md). Keep exercises
frequent and keep some of them repeats. But **stop repeating the typeahead** — two runs have
extracted most of its signal, and a third would mostly re-measure the layer that is already
automatic. Next exercises should hold the familiar scaffolding constant and vary the unfamiliar
layer, which is exactly the shape already proposed for exercise 0003 (keyboard only, results
handed over pre-fetched).
