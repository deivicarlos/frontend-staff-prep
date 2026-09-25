# Where we are

_Last updated: 2026-09-24, session 6 (re-planned, LR-0012)._

## Immediately next

**Direction changed by [LR-0012](learning-records/0012-reweight-to-what-screens-grade.md).**
Both reference sheets shipped and their tasks are done (LR-0011). From here the plan is weighted
to what real screens grade: working logic under a clock, debugging a broken app, system design,
and auth. ARIA/a11y is no longer scheduled.

1. **Exercise 0005: debug a broken app.** Modelled on the device-list screen he described. A
   multi-component app with TanStack Query and a chain of bugs, each fix revealing the next:
   the API call, then filters, then a `queryKey` or identity bug, then loading/error, including
   the unguarded `finally`. More bugs than fit in the clock, and the brief says so, so triage
   is the graded act (LR-0010). The brief makes him paste log output per requirement (LR-0011
   finding 3). He also narrates each fix in one line, as he would to an interviewer.
2. **Lesson 5: frontend system design process (RADIO)**, pulled ahead of lesson 4. Scope as
   before (LR-0007): requirements gathering, carrying a constraint across decisions,
   `useInfiniteQuery`, cursor vs offset.
3. **Auth end to end: calibrate first.** A short diagnostic on login flow, sessions vs JWT,
   cookie flags (`HttpOnly`/`Secure`/`SameSite`), token storage, refresh, CSRF/XSS. Then a
   lesson built from what it shows. Verify against OWASP and MDN.
4. **Exercise 0006: build from scratch, roomba-shaped.** Grid, arrow keys, rotate on wall. The
   graded axes are state modelling (a reducer and the direction as data) and finishing the logic
   before any polish. 45 minutes, the MISSION's format.
5. **Lesson 4: rendering and the event loop** (Q17, LR-0011 finding 2), plus the Compiler
   boundary. Hooks deep-dive questions live here.
6. **Workers:** Web Worker vs Service Worker, what each is for. Reference sheet unless the
   diagnostic in step 3 shows a model gap.

**Phase 2, after the frontend track: engineering with AI** (MISSION). Skills, plans, context
control, review discipline. He wants this after frontend, not interleaved.

**Ask him:** where the clock went in the Shopify roomba round. It is the best available evidence
for step 4.

## Standing exercise protocol (revised by LR-0010)

Three of the four prescribed steps were ones he did not take. He then invented one that works.
Keep his, drop the rest.

1. **Transcribe the requirements into the file before the clock** — plain copying. The "write
   each as an action" upgrade did not survive contact and its purpose is served by step 2.
2. **Finish each requirement against its done-condition before moving to the next.** His own,
   from exercise 0004, and the reason both requirements he touched passed cleanly. Load-bearing.
3. **Budget the clock across the requirements before starting, and take one cheap pass over all
   of them before going deep on any.** New, from LR-0010 finding 2 — step 2's cost is that the
   tail gets nothing at all.
4. **At the buzzer, name what's unmet in writing.** Under step 2 he knows exactly where he
   stopped, so this is seconds. It is the difference between "didn't listen" and "triaged."

**Retired: the midpoint alarm.** Unset three exercises running, and the failure it was designed
to prevent no longer happens.

## After that

**Lesson 4 — compiler-era performance.** Displaced three times and still the next lesson.
**The event-loop part (Q17) should be built on LR-0011 finding 2**: supersede a request and ask
in what order the three writes to `isLoading` land. He tried to fix a microtask-ordering bug
from the cleanup, so this is a model gap, not a recall gap. Closes
the lesson-2 Q2 miss (the boundary of what React Compiler automates: memoisation yes, structural
and network problems no) and is the home for orphaned calibration **Q17** (event loop / task
timing / INP). Partial cover exists in `reference/whats-changed-2024-2026.html` under "The
memoisation shift."

**Lesson 5 — frontend system design, as a process lesson.** From
[LR-0007](learning-records/0007-constraints-do-not-travel.md). RADIO, weighted to
requirements-gathering and to carrying a constraint across decisions — *not* to feed architecture,
which he half-knows. Its retrieval check must plant a constraint early and offer a decision later
that the constraint invalidates. Fold in `useInfiniteQuery` shape alongside cursor-vs-offset;
verify against the TanStack primary source.

## Closed

- **Completion criteria** ([LR-0010](learning-records/0010-completion-closed-the-cost-moved-to-triage.md)).
  Both requirements he touched in 0004 passed their done-conditions, with no scattered holes —
  the first exercise with none. He built the protocol himself. Stop designing exercises around it;
  keep binary scoring, which is what made it legible.
- **The keyboard.** Exercise 0003 at 4/6 on the layer that went unwritten in exercises 0001 and
  0002. Requirement 3 (DOM focus never leaves the input) full credit — lesson 3's central claim
  survived a clock. Stop treating it as a gap.
- **`preventDefault` vs `stopPropagation`** — lesson 3 Q4 miss, applied correctly under time
  pressure without a reminder ([LR-0009](learning-records/0009-the-re-read-is-the-load-bearing-step.md)).
- **Cleanup as a principle** ([LR-0008](learning-records/0008-cleanup-closed-transfer-is-the-axis.md)).
- **Lesson 1 Task B** — retired, he declined it and the finding was obtained in prose anyway
  ([LR-0007](learning-records/0007-constraints-do-not-travel.md)). Do not chase a fourth time.

## Standing gaps not yet scheduled

- **Triage under a clock** — LR-0010 finding 2, the largest open axis. Exercise 0005 above.
- **Mechanical API recall is thin while technique selection is live** — LR-0010 finding 3, two
  instances (`aria-activedescendant`, `AbortController`). Reference sheets, not lessons.
- **Scenario-shaped requirements don't convert into tasks** — LR-0009 finding 3. Still open but
  unmeasured in 0004: all four requirements there arrived pre-converted. Do *not* fix by writing
  requirements as instructions; real briefs are scenario-shaped. Keep them coming.
- **Roving `tabindex`** — narrowed by LR-0009. He holds the *choice between* techniques in the
  direction where `aria-activedescendant` wins, and missed the direction where roving wins
  (lesson 3 Q2). Goes into the reference sheet above, then wants a composite-widget exercise
  (tabs, menu, toolbar) where roving is the correct answer.
- Calibration **Q14** (generics) — only TypeScript miss against 3/4. Fold into a component-API
  lesson where generic props are the natural vehicle.
- **CLOSED 2026-09-24 (LR-0011 finding 5)** — ~~`any` at the fetch boundary~~ — survived four exercises, and in 0003 it was causal.** With
  `Book[]` and `noUncheckedIndexedAccess` the requirement-2 crash is a compile error. Keep it a
  graded line, but argue it as *"`any` is why nothing told you,"* not as hygiene.
- **Discriminated union for request state.** Still parked, still unmeasured — 0004's error and
  loading requirements are exactly where it would have shown and neither was built. Re-check
  whenever the async layer is next in an exercise.
- **`try/catch` around a promise-returning call catches nothing.** Named once in 0004 and
  understood immediately (LR-0010 finding 4). Do not teach; re-test, including whether
  `AbortError` is swallowed rather than rendered.
- **Identity** — fourth instance in 0003 (the stale `active` index surviving a new result set),
  after `key`, `queryKey` and the dependency array. Downgraded from "open wound" by LR-0005 and
  still correctly downgraded — the dependency-array half stays right. Keep spot-checking.
- **Verify new scaffolds in both colour schemes before shipping.** 0003 shipped with
  `color-scheme: light dark` over a hardcoded-light palette and the input rendered invisible in
  dark mode, costing him exercise time. Fixed at source.
- **No human feedback loop exists.** Everything is asynchronous; self-assessment cannot measure
  how he sounds live. Flagged in `RESOURCES.md` under Gaps. Ask before pushing communities again.

## Progress so far

| | |
| --- | --- |
| Lesson 1 — calibration | 11/20. Hooks 1/4, modern React 3/4 — an inverted profile: reading, not shipping |
| Exercise 0001 — typeahead | ~2/6 in 45 min. Constant `queryKey` ate the run |
| Lesson 2 — render is a snapshot | 5/6. Snapshot 2/2, effects 2/2 — the model landed |
| Lesson 3 — keyboard | 4/6. Cleanup 2/2 on untaught surfaces closes LR-0005; missed roving `tabindex` and `preventDefault` |
| Exercise 0002 — rebuild | ~2/6 again, but recomposed: debounce correct, deps correct, `AbortController` reached for. Cancellation wired but never armed |
| Design probe — news feed | ~3/6. Scroll compensation strong, Tailwind correctly judged non-load-bearing; offset pagination chosen one question after describing what breaks it |
| Exercise 0003 — keyboard layer | **4/6 in 20 min.** Arrow nav, focus model and scroll-into-view full; Enter guard and Escape absent, ARIA half-placed, stale index unreset. Protocol 1 of 3 |
| Sheet 1 cold rewrite | Three passes. Controller out of cleanup's reach, then unguarded `finally`, then correct. `Book[]` at source |
| Exercise 0004 — finish the job | **2/4 binary in 20 min.** Debounce and cancellation both pass — the 0002 `AbortController` is armed. Error and loading never started; clock went to an API lookup |

**Reps remain the primary instrument** (LR-0006, unchanged). Exercise 0003 is the first exercise
to score above ~2/6 and the first where a lesson's central claim was visibly applied under a clock.

**The open axis is how he runs the clock, and it has narrowed twice.** LR-0009 called it
completion; [LR-0010](learning-records/0010-completion-closed-the-cost-moved-to-triage.md) closed
completion and moved it to **triage** — he finishes what he starts and starts too few things.
Alongside it sits the one knowledge axis still billing real minutes: **mechanical API recall**
(LR-0010 finding 3). Selection is live, mechanics are thin, and the lookups come out of a
20-minute clock. Reference sheets first, then the triage exercise.
