# State

_Updated 2026-10-20. Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`. Scores and closed items: `HISTORY.md`._

## Next session

**Exercise 0008, palindrome feed (35 min clock + 15 grade = 50)**:
[exercises/0008-palindrome-feed/START-HERE.md](exercises/0008-palindrome-feed/START-HERE.md).
Built 10-20 from the recruiter's round-2 list. It's a from-scratch build with six requirements:
normalisation traps, two pointers O(1) space, flag-once memo plus state colocation (the counter
reads 0), a row cap, a live region, and expand-around-centre. Verified with Playwright: all red on
the scaffold, all green on a reference (deleted), light and dark. Grade with `grade-exercise`
against `AFTER-THE-TIMER.md`. Key check: did he state complexity before writing the code?

## Global Relay round 2: **Fri 2026-10-23**

Round 1 done 10-16 ([LR-0018](learning-records/0018-gr-round-1-was-js-fundamentals.md)).
**Recruiter's list (10-20, from a past candidate in this round):** experience walkthrough; React
principles with code; JS Promises with code; CSS selector specificity; a palindrome problem in React
with performance and Big-O. Topics: React, JS, CSS, AWS, UI libraries, AI-assisted coding,
Java/Python, accessibility. The round-1 interviewer said: a screen-shared React code review, maybe
a small build, maybe LeetCode from an AI-team interviewer. Prepare for both.
Pay CAD 180-200k + 4%. Debrief: `career/private/2026-10-16-global-relay-debrief.md`.

**Sprint to Friday (re-planned 10-20).** Tell him each item's length up front. He takes slots as
they open.

| When | Item | Length | How |
| --- | --- | --- | --- |
| Tue | A. 0008 palindrome feed | 50 | built, `grade-exercise` |
| Tue | B. 0007 review rep 2 (built 10-18; matches the interviewer's own description). Make him state the A-then-B outcome before he edits. At grading, cold-check one of: `onSubmit` isn't an Action context (only the `action` prop is), which his cheat sheet gets wrong; why `useOptimistic` needs a transition outside actions | 30 | `grade-exercise` |
| Wed | C. Promises from zero: event loop, microtasks, states, chaining, error propagation, `all`/`allSettled`/`race`/`any`, async/await. Then code: write `Promise.all`, `sleep`, timeout via `race`, retry, and predict output order (closes LR-0011) | 40 + 30 | he types `/teach promises`, then `build-lesson` |
| Wed | D. CSS cascade from zero: origin and `!important`, `@layer`, specificity (id, class, type), `:is`/`:not`/`:has` vs `:where`, inline styles, order, inheritance. Predict-the-colour drill | 30 | `/teach css specificity` |
| Thu | E. Cold mixed drill, retention check (LR-0017): React principles with code (render/commit, key, snapshot, batching, effect timing, memo), promise output order, specificity, `this`/`==` | 30 | build it Thu, not before |
| Thu | F. Out loud, about 10 min each: a 2-min experience walkthrough mapped to their list (React, AWS, a11y, AI-assisted coding, the JS-to-React migration); the 6 s → 3 s story with a causal chain that holds (TTI was removed in Lighthouse 10); his AI-written-code review policy; honest Java/Python/AWS depth | 40 | `career-session` |
| Thu | G. If there's time: two LeetCode string problems at 25 min each (valid palindrome II, longest substring without repeats) | 50 | `build-exercise` |
| Fri | Warm-up only: 5 cold questions, no new material | 15 | |

Dropped for this round: the Vite fetch/list build (0008 covers a from-scratch build), the Redux to
TanStack answer (fold into F only if time allows), and the review reps after 0007.
Hooks lessons 7 and 8 are done; the sheet is `reference/react-hooks.html`.

Open recall items (LR-0016/17): INP phase 2 (processing); useEffect usually runs after paint
(before it when an interaction caused it); RUM behind login. Fold into reps; no more CSP drilling.

## How to work with him now

He may answer by voice dictation (macOS), so expect mistranscribed terms. Typed mocks are dropped
(his call, 10-15): he rehearses out loud alone. Don't end turns with "move on?". He says when.
Never remind him of the clock or prompt him for interview recall; he manages his time and brings
the debrief himself (his rule, 10-16).

## After GR

Paused tracks (security S1-S8, system design, the 09-26 queue) are parked verbatim in
`HISTORY.md` → "Paused 2026-10-17". Restore them here when the GR loop ends.

## What we know about him (detail in `learning-records/INDEX.md`)

- **Real voids outside React. Teach from zero** (LR-0014, LR-0015).
- Review finds bugs on a line, misses bugs that need a sequence simulated (LR-0019).
- Recalls what a tool does, omits when it fails (lesson 7 cold check, 10-17).
- Placement of request-effect parts holds under a clock (LR-0013).
- Finishes what he starts, but starts too few things (LR-0010). Protocol in `build-exercise`.
- A constraint he states doesn't carry into later design decisions (LR-0007).
- Scenario-phrased requirements don't become tasks; he doesn't ask when stuck (LR-0009, LR-0013).
- No model of microtask ordering relative to effects (LR-0011).
- A smooth rewrite isn't a checked one. Ask for evidence (LR-0011).
- TypeScript strong, generics a miss (Q14). React 19 knowledge current.
- Material read once, without application, falls out within 24 h (LR-0017).

## Open, not yet scheduled

- Request state as a discriminated union is unmeasured.
- Generics (Q14): fold into a component-API exercise.
- `invalidateQueries` prefix matching missed in 0005 (LR-0013).
- 0006's `eslint-plugin-react-hooks` is 4.6.2, which predates `useEffectEvent` (false deps warning). Upgrade before reusing the scaffold.
