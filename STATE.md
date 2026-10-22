# State

_Updated 2026-10-22. Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`. Scores and closed items: `HISTORY.md`._

## Next session (Wed 10-22 morning)

**A2 done 10-22: 3/6** (coached mid-attempt, so not clean; `EVALUATION.md`). He rates #2 (comment)
and #5 (empty-on-load) minor. Brief defect he called out: requirement 1 never said "build a
separate Phrase input". In future briefs, name every element to build in the requirement text.
**Next: C in progress (lesson 9 + `exercises/0009-promise-drills`, built 10-22; grade his 4 predictions, quiz /4, `node check.mjs` output; stubs read 3/10) → D (CSS, compressed) → B.** He proposed dropping D. His own CSS answer (10-22)
showed two misconceptions: `div .selected` read as "divs with the class" (it's descendant), and
cascade conflated with inheritance. No specificity tuple. So D stays, shortened to those gaps.

Taught 10-21 after grading. Cold-check one at A2 grading and the rest in E:
- Big-O by counting loops, including hidden ones (spread, `includes`, `str = ch + str`).
- `while (i < j)`: the pointers cross on even lengths; move only the pointer that skips punctuation.
- Local mutation is fine (`acc.push` on an array you just made). Don't mutate state or props.
- `useDeferredValue` isn't a debounce (no delay; interruptible background render). It needs `memo`.
- Not Actions: `onChange`, `onSubmit`. Actions are the `action`/`formAction` prop or a
  `startTransition` callback. Never put controlled-input state in a transition (react.dev);
  defer the list, not the checkbox. (This closes the cheat-sheet `onSubmit` item.)
- Module-level compute works only for static data; otherwise `useMemo` keyed on the data.

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
| Tue | A. 0008 palindrome feed: **done 10-21, 1/6** | 50 | |
| Wed 1 | A2. 0008 from scratch again, timed | 50 | `grade-exercise` |
| Wed 4 (else Thu) | B. 0007 review rep 2 (built 10-18; matches the interviewer's own description). Make him state the A-then-B outcome before he edits. At grading, cold-check why `useOptimistic` needs a transition outside actions | 30 | `grade-exercise` |
| Wed 2 | C. Promises from zero: event loop, microtasks, states, chaining, error propagation, `all`/`allSettled`/`race`/`any`, async/await. Then code: write `Promise.all`, `sleep`, timeout via `race`, retry, and predict output order (closes LR-0011) | 40 + 30 | built: `lessons/0009-the-microtask-queue.html` |
| Wed 3 | D. CSS cascade from zero: origin and `!important`, `@layer`, specificity (id, class, type), `:is`/`:not`/`:has` vs `:where`, inline styles, order, inheritance. Predict-the-colour drill | 30 | `/teach css specificity` |
| Thu | E. Cold mixed drill, retention check (LR-0017): the Big-O of idiomatic JS snippets (`reduce`+spread, string `+=`, `includes` in a loop) (LR-0020); the 10-21 list above; React principles with code (render/commit, key, snapshot, batching, effect timing, memo), promise output order, specificity, `this`/`==` | 30 | build it Thu, not before |
| Thu | F. Out loud, about 10 min each: a 2-min experience walkthrough mapped to their list (React, AWS, a11y, AI-assisted coding, the JS-to-React migration); the 6 s → 3 s story with a causal chain that holds (TTI was removed in Lighthouse 10); his AI-written-code review policy; honest Java/Python/AWS depth | 40 | `career-session` |
| Thu | G. If there's time: two LeetCode string problems at 25 min each (valid palindrome II, longest substring without repeats) | 50 | `build-exercise` |
| Fri | Warm-up only: 5 cold questions, no new material | 15 | |

Dropped for this round: see `HISTORY.md` (re-planned 10-20). Hooks sheet: `reference/react-hooks.html`.

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
- Knows complexity in the abstract, doesn't apply it to his own JS (`reduce`+spread) (LR-0020).
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
