# Calibration: 11/20, with one dominant cluster

Carlos scored 11/20 on [lesson 0001](../lessons/0001-calibration.html):
modern React 3/4, TypeScript 3/4, rendering 2/4, platform 2/4, **hooks 1/4**.
Missed Q4, Q5, Q6, Q8, Q9, Q11, Q14, Q17, Q18.

**The non-obvious finding: his knowledge of what's *new* is stronger than his knowledge of
what's *old*.** 3/4 on the 2024–2026 changes, but 1/4 on hooks. That inverts the expected
profile for a two-year gap and points at a specific cause — he has been reading about React
rather than writing it. Reading builds recognition (fluency); only shipping builds the model
that survives a follow-up question (storage). This should steer everything: do not spend
sessions on "catching up on React 19," which he mostly has. Spend them rebuilding the core
model and forcing production under pressure.

**Four of the nine misses are one misconception.** Q8 (stale closure), Q9 (re-render is the
default), Q5 (effects are for external systems), Q6 (StrictMode audits cleanup) all reduce to
*what a render is*. [Lesson 0002](../lessons/0002-render-is-a-snapshot.html) derives all four
from the single "render is a snapshot" idea rather than teaching them as four topics.

**Implications for remaining misses:**

- Q4 (RSC vs SSR) and Q11 (INP replaced FID) are pure knowledge gaps with nothing to derive —
  handled by [reference/whats-changed-2024-2026.html](../reference/whats-changed-2024-2026.html),
  not a lesson.
- Q17 (event loop) and Q18 (accessible widget behaviour) are platform fundamentals and cluster
  together as a plausible lesson 3 — *the browser underneath React*.
- Q14 (generics) is his only TypeScript miss against 3/4 elsewhere; too thin for its own lesson,
  fold into a later component-API lesson where generic props are the natural vehicle.

**Still unmeasured:** both offline tasks from lesson 1 (the 45-minute timed typeahead and the
20-minute spoken system design). Those measure production under pressure, which the quiz
cannot, and given the reading-not-writing finding they are now the *most* important
outstanding signal. Chase them before planning lesson 4.
