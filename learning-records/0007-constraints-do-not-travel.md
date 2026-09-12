# The design gap is process, not knowledge — constraints don't travel between answers

Carlos declined [lesson 1's](../lessons/0001-calibration.html) Task B (the 20-minute spoken
system design), saying he wasn't concerned about his speech and cared about the design itself.
He then answered the prompt anyway, unprompted and in about thirty seconds:

> "Overall i would use Tailwind, react-query, have a virtualized list to show the feed with an
> infinite scroll that shows 20 for example and when you scroll to the end it will load 10 more."

**That is the Task B measurement, obtained in writing.** A stack and one feature, no questions
asked, no scope, no users, no constraints. He opened at the architecture rather than the
requirements — RADIO's "R" skipped entirely. So the finding Task B existed to produce is now on
record without needing the recording, and **Task B can be retired as an instrument.** What it
would still have measured — delivery, filler, dead air — he has explicitly said he does not want
to work on. Do not chase it a fourth time. Revisit only if a real interview goes badly on
delivery.

## The six-question probe

His own answer was used as the artifact and pushed on with six interviewer follow-ups
(variable row height, prepended items and scroll position, `queryKey` and pagination scheme,
where the page size came from, back-navigation restoration, whether Tailwind matters).
Roughly 3/6.

Strong: scroll-offset compensation for prepended items (Q2) — the mechanism most candidates
miss. Correctly judged Tailwind as non-load-bearing and deferred it to team agreement (Q6);
knowing which decisions *don't* matter is a staff signal. Said "20 was a random answer" out loud
rather than defending it (Q4).

Weak: fixed-height-with-overflow-hidden offered as a live option, and no reach for
measure-and-correct or the async-media reflow that actually breaks virtualized feeds (Q1).
Q5 restated the requirement back as the answer — "the position has to be preserved" — with no
mechanism behind it.

## The central finding: the constraint didn't travel

**Q2 contains the answer to Q3, and one question later he chose the scheme Q2 destroys.** He
correctly described new items being prepended and the scroll offset being compensated — then
picked offset pagination, which prepending breaks, and said "not sure why" about the choice.
With `?offset=40` in a feed that shifted by 30, page 3 re-serves already-rendered items.

He is answering each question locally rather than holding one model of the system and checking
each new decision against it. That is a distinct axis from every knowledge finding in the
workspace, and it is **the same axis as [LR-0006](0006-requirements-fell-out-of-memory.md)** —
there, the exercise requirements left working memory at minute five; here, a constraint
established in his own answer didn't survive sixty seconds. Twice now, process rather than
skill.

This is the better failure to have. It is fixable with structure — a framework that forces the
constraints to be written down and revisited — rather than with study.

## Secondary: `useInfiniteQuery` is a genuine knowledge gap

`['posts', 'page3']` models each page as its own query. Infinite feeds in React Query are one
cache entry keyed `['posts']` holding `{ pages, pageParams }`, and a refetch re-fetches every
loaded page. Small, clean-edged, and it compounds with the pagination error — verify against the
TanStack primary source before teaching it.

## What to teach

1. **A system design lesson is now justified, and it is about process, not knowledge.** Build it
   on RADIO, with the emphasis on requirements-gathering and on carrying a constraint forward —
   not on feed architecture, which he half-knows already. The standing exercise protocol from
   LR-0006 (transcribe, re-read at halfway, name what's unmet) is the same medicine; the design
   version is "write the constraints down and check decisions against them."
2. It does **not** jump the queue ahead of [lesson 3](../lessons/0003-the-keyboard-is-the-widget.html),
   which is written, unworked, and targets a gap confirmed in two timed exercises.
3. Its retrieval check must re-test constraint propagation specifically — give a constraint early
   and a decision later that the constraint invalidates. Per LR-0004, the check must test the
   lesson's own central claim.
