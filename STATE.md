# State

_Updated 2026-09-26 (0005 graded). The plan was re-set by a grilling session on 2026-09-24
([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md); decisions in `MISSION.md`
and `career/CAREER.md`)._

## Next session

**Lesson 5: frontend system design (RADIO)** (skill `build-lesson`). Exercise 0005 was graded
4/6 on 2026-09-26 ([LR-0013](learning-records/0013-placement-lands-scenario-still-does-not.md)).
One question is still open with him: where the 25 minutes went, and what the stray
`useEffect(() => fetchDevices(status))` in `DeviceList.tsx` was for. If he fixes 4 and 5,
re-run `check.mjs`-style checks (the done-conditions in `START-HERE.md`) and re-score.

## Week 1: getting interviews (career comes first)

1. Resume and LinkedIn review. Done 2026-09-25.
2. Done 2026-09-25. The "why IC" answer: write it with him, then he rehearses it out loud. The framing is agreed in
   `career/CAREER.md`.
3. Dropped 2026-09-25 (he searches himself). A list of Canada-eligible target companies, built from `research/2026-canada-remote-eligibility.md`.

## From week 2: the weekly rhythm (40–60 min a day)

- **Mon–Thu: timed exercises.** Formats: debugging a broken app, building from scratch, and
  AI-assisted work on material he already knows.
- **Fri: frontend system design.**
- **Sat or Sun: one career session** (applications, stories, the "why IC" answer).

The rhythm bends to what he says he has time for on the day.

## Queue, in order

1. **Lesson 5: frontend system design (RADIO).** It covers requirements gathering and carrying a
   constraint across decisions (LR-0007), plus `useInfiniteQuery` and cursor vs offset.
2. **Auth and backend: calibrate first.** A diagnostic on login flow, sessions vs JWT, cookie
   flags, token storage and refresh, CSRF/XSS, REST design, a two-table model, and debugging a
   Node endpoint. Then teach only what it shows is missing. He knows Node from work.
3. **Exercise 0006: build from scratch, roomba-shaped.** 45 min, graded on the state model and
   on getting the logic working before any layout.
4. **Lesson 4: rendering, hooks and the event loop.** Build it on the case of aborting a stale
   request and asking what order the `isLoading` writes land in (LR-0011). Include the boundary
   of what the Compiler does.
5. **Web Worker vs Service Worker:** a reference sheet.

Once the frontend track is solid: **Phase 2, engineering with AI** (`MISSION.md`).

## What we know about him (the detail is in `learning-records/INDEX.md`)

- Placement: the request-effect parts (controller, abort in cleanup, guarded `finally`) landed
  first try under a clock in 0005 (LR-0013). Keep grading placement on new surfaces.
- He finishes what he starts but starts too few things, going depth-first with no time budget
  (LR-0010). The standing exercise protocol lives in skill `build-exercise`.
- In design, a constraint he states does not survive into later decisions (LR-0007).
- A requirement phrased as a scenario doesn't become a task for him: 0003, then 0005 req 5
  (LR-0009, LR-0013). He doesn't ask when stuck. The protocol now says to ask.
- He doesn't have the model for microtask ordering relative to effects (LR-0011).
- Writing it smoothly doesn't mean he checked it. Ask for evidence he checked, never whether he
  did (LR-0011).
- A hint that points at other code fails. The second time, name the exact line (LR-0011).
- TypeScript is strong. Generics were a calibration miss (Q14). React 19 knowledge is current.

## Open, not yet scheduled

- A discriminated union for request state has never been measured. Check it whenever the async
  layer appears in an exercise.
- Generics (Q14): fold into a component-API exercise.
- Identity bugs: keys are fine. `invalidateQueries` prefix matching was missed in 0005 (LR-0013).
- There is no live human feedback loop, so how he sounds out loud is unmeasured. Consider mock
  interviews later.
