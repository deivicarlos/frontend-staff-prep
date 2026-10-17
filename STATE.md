# State

_Updated 2026-10-17. Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`. Scores and closed items: `HISTORY.md`._

## Next session

**Lesson 8 (~30 min incl. a 10-min task)**: [lessons/0008-when-it-runs.html](lessons/0008-when-it-runs.html).
He brings quiz /4, the cold check as first written, and the `useOptimistic` diff. The task builds
on his **0006 edits** (`useEffectEvent` shortcut in its own effect, 10-17):
keep them; the rest of 0006's planted bugs are still in place.

Lesson 7 done 10-17: quiz 4/4; cold check omitted *when `memo` fails* (`Object.is` on every
prop). Same shape as LR-0019: he recalls what a tool does, drops the failure condition. In every
grade, ask for "it breaks when…". He accepted one-effect-per-concern after pushback with the
react.dev quote; he takes evidence-backed pushback well, so push back with sources.

## Global Relay

**Round 1 done 2026-10-16** ([LR-0018](learning-records/0018-gr-round-1-was-js-fundamentals.md)).
**Round 2:** screen-shared React code ("what happens / what's missing / how would you review it");
maybe a small build from scratch; an AI-team interviewer may ask LeetCode. Plan as if **Tue 10-20**.
Later: a senior leadership round. Pay CAD 180-200k + 4%. GR is building an AI code-review strategy.
Skill `career-session` for GR; `build-exercise` for reps. Debrief: `career/private/2026-10-16-global-relay-debrief.md`.

**GR sprint (agreed 10-16; replaces the security track until the GR loop ends).** Challenge round
first: items 1 and 3. Sat: 1 + 2. Sun: 3 + 1. Mon: 1 + 4 + 6. He works in slots as they open:
always tell him the length of the next item up front. If items run out before round 2, add more.

0. **Hooks lessons:** 7 done; **8 next** (above). Sheet: `reference/react-hooks.html`. They cover
   most of queue item 4 (lesson 4); the event-loop/microtask part is still open.
1. **Code-review reps (30 min each incl. grading).** Rep 1: 0006, **4/7** ([LR-0019](learning-records/0019-review-finds-lines-not-sequences.md)):
   missed stale closure, race, error path. **Rep 2 next (build it):** new domain, same three
   families hidden differently, graded on the three-question pass (what does it close over / what
   if it runs twice or overlaps / what if it fails). Free-form comments, no table, no impact
   column (his call 10-16). Later reps: 3-5 planted bugs (missing cleanup, wrong deps, key misuse,
   effect ordering, derived state, unrelated logic merged into one effect).
2. **JS fundamentals drill (20 min):** `this` (4 call-site rules, arrows, lost `this` in
   callbacks), `==` coercion, closures in loops, hoisting/TDZ, event loop order (LR-0011), promises.
3. **From-scratch build (45 min + 15 grading):** Vite + React + TS: fetch, list, filter, loading/error.
4. **Three Staff answers out loud (10 min each):** reviewing AI-written code (team policy);
   migrating a legacy JS framework to React (strangler, React islands, shared design system,
   Playwright safety net); Redux to TanStack Query (makes his round-1 claim defensible).
5. Fix the 6 s to 3 s story's cause (TTI was removed in Lighthouse 10; re-renders don't move a load metric).
6. LeetCode (25 min per problem): easy/medium arrays, hashmaps, strings, only if the recruiter confirms.

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
