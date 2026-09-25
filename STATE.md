# State

_Updated 2026-09-25. The plan was re-set by a grilling session on 2026-09-24
([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md); decisions in `MISSION.md`
and `career/CAREER.md`)._

## Next session

**Career: rehearse the "why IC" answer.** Skill `career-session`. Draft in `career/why-ic.md`.
He says it aloud 3× on a timer and reports the third run's time and the beat he stumbled on; log
it there. Then run it once live in chat as a cold screen question. Next after that: Canada target list.

## Week 1: getting interviews (career comes first)

1. Resume and LinkedIn review. Done 2026-09-25.
2. ← next. The "why IC" answer: write it with him, then he rehearses it out loud. The framing is agreed in
   `career/CAREER.md`.
3. A list of Canada-eligible target companies, built from `research/2026-canada-remote-eligibility.md`.

## From week 2: the weekly rhythm (40–60 min a day)

- **Mon–Thu: timed exercises.** Formats: debugging a broken app, building from scratch, and
  AI-assisted work on material he already knows.
- **Fri: frontend system design.**
- **Sat or Sun: one career session** (applications, stories, the "why IC" answer).

The rhythm bends to what he says he has time for on the day.

## Queue, in order

1. **Exercise 0005: debug a broken app.** Modelled on a screen he really faced: a device list
   using TanStack Query, where each fix reveals the next bug (the API call, filters, a `queryKey`
   or identity bug, loading/error including an unguarded `finally`). It has more bugs than fit
   in the clock and the brief says so, so triage is what gets graded. He pastes the log per
   requirement and narrates each fix in one line.
2. **Lesson 5: frontend system design (RADIO).** It covers requirements gathering and carrying a
   constraint across decisions (LR-0007), plus `useInfiniteQuery` and cursor vs offset.
3. **Auth and backend: calibrate first.** A diagnostic on login flow, sessions vs JWT, cookie
   flags, token storage and refresh, CSRF/XSS, REST design, a two-table model, and debugging a
   Node endpoint. Then teach only what it shows is missing. He knows Node from work.
4. **Exercise 0006: build from scratch, roomba-shaped.** 45 min, graded on the state model and
   on getting the logic working before any layout.
5. **Lesson 4: rendering, hooks and the event loop.** Build it on the case of aborting a stale
   request and asking what order the `isLoading` writes land in (LR-0011). Include the boundary
   of what the Compiler does.
6. **Web Worker vs Service Worker:** a reference sheet.

Once the frontend track is solid: **Phase 2, engineering with AI** (`MISSION.md`).

## What we know about him (the detail is in `learning-records/INDEX.md`)

- He selects the right technique but misplaces its parts: the controller out of reach of the
  cleanup, `aria-activedescendant` on the `<ul>` (LR-0011). Grade placement explicitly.
- He finishes what he starts but starts too few things, going depth-first with no time budget
  (LR-0010). The standing exercise protocol lives in skill `build-exercise`.
- In design, a constraint he states does not survive into later decisions (LR-0007).
- A requirement phrased as a scenario doesn't become a task for him (LR-0009). Keep writing
  scenario-shaped requirements anyway.
- He doesn't have the model for microtask ordering relative to effects (LR-0011).
- Writing it smoothly doesn't mean he checked it. Ask for evidence he checked, never whether he
  did (LR-0011).
- A hint that points at other code fails. The second time, name the exact line (LR-0011).
- TypeScript is strong. Generics were a calibration miss (Q14). React 19 knowledge is current.

## Open, not yet scheduled

- A discriminated union for request state has never been measured. Check it whenever the async
  layer appears in an exercise.
- Generics (Q14): fold into a component-API exercise.
- Identity bugs (key, queryKey, deps, stale index): keep spot-checking.
- There is no live human feedback loop, so how he sounds out loud is unmeasured. Consider mock
  interviews later.
