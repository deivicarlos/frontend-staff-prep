# The gap is identity, confirmed three ways

Exercise 0001 (45-min timed typeahead) came back at roughly 2/6 requirements, and the
central bug was `queryKey: ["books"]` — a constant key, so React Query never re-ran the
search on typing. See [the full evaluation](../exercises/0001-typeahead/EVALUATION.md).

That is not a React Query bug. It is the **same identity misconception** already recorded in
[LR-0002](0002-calibration-results.md), now visible in four places: calibration Q9 (element
identity drives re-render), Q5 (`key` resets state), the constant `queryKey`, and `<li>`
rendered with no `key`. `key`, `queryKey` and the dependency array are one mechanism —
*something declares what makes this a different thing, and the system re-runs when it
changes.* This is the highest-confidence finding in the workspace so far, because it appeared
under time pressure in his own code rather than in a quiz.

**Confirms lesson 0002 is correctly targeted** and that identity deserves explicit treatment
rather than being left implicit inside the snapshot framing.

## Second finding: knowing ≠ reaching for

He answered calibration Q16 (`unknown` vs `any`) and Q15 (discriminated unions) correctly,
then under time pressure let `response.json()` flow in as `any` and never modelled request
state as a union. The principles are known; they are not yet reflexes. **Implication:** stop
teaching principles he can already state. Design lessons that force application under time
constraint — the gap is retrieval, not knowledge. This is the same fluency-vs-storage split
already flagged in LR-0002, now confirmed from the opposite direction.

## Third finding: library reach as time sink

He chose TanStack Query, a defensible production instinct, and it consumed the full 45
minutes — leaving keyboard navigation (the strongest senior/mid discriminator in the brief)
untouched. **Implication:** teach the narration move — say the production choice out loud,
then hand-roll it — rather than teaching "don't use libraries." The instinct is right; the
interview economics are wrong.

## Credit where due

Extracted a custom hook and an API module under time pressure; wrote correct symmetric
cleanup in the debounce effect (the very concept missed on calibration Q6); added an
`aria-label` unprompted; threw on `!response.ok`. Structure and instincts are intact — this
is a retrieval and reps problem, not a fundamentals-are-missing problem.
