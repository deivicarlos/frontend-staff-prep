# Where we are

_Last updated: 2026-09-12, end of session 3._

## Immediately next

**Carlos owes exercise 0003 — it is built and waiting.**

```sh
cd exercises/0003-keyboard-layer && npm install && npm run dev
```

Then `START-HERE.md`. 20 minutes, keyboard layer only, results handed over pre-fetched and
synchronous so the debounce/request/cancellation layer can't absorb the clock. Carries the
LR-0006 protocol as three graded lines, plants `any[]` as `search()`'s return type, and grades
`preventDefault` explicitly (his lesson-3 Q4 miss, and a trap he will hit in the first five
minutes). Scaffold verified — installs, typechecks, builds.

Score it against `AFTER-THE-TIMER.md`, opened only after the clock, and paste the result back
with the three questions at the bottom answered.

**Reading the score** — the protocol checkboxes are graded first on purpose. If all three are
checked and the score is still short, that is a different and more useful finding than exercise
0002's. If they are unchecked, the score doesn't measure what it claims to.

## Standing exercise protocol (new, from LR-0006)

Every exercise brief from 0003 onward must carry these three lines, and every rubric must grade
them. Carlos read the 0002 requirements once, never returned to them, and lost requirements 3
and 4 to memory rather than to skill.

1. **Transcribe the requirements into the file before the clock starts** — a comment block or a
   checklist. Copying is the encoding step; reading isn't.
2. **Re-read the list out loud at the halfway mark.** One planned interrupt; the failure mode is
   having zero.
3. **At the buzzer, name what's unmet and what you'd do next.** Silently missing a stated
   requirement reads as "didn't listen"; naming it recovers most of the credit.

## After that

**Lesson 4 — compiler-era performance.** Displaced twice now, and genuinely next after exercise
0003. Closes his single lesson-2 retrieval miss: the boundary of what React Compiler automates
(memoisation yes, structural and network problems no). Partial cover already exists in
`reference/whats-changed-2024-2026.html` under "The memoisation shift."

**Lesson 5 — frontend system design, and it is a process lesson.** New, from
[LR-0007](learning-records/0007-constraints-do-not-travel.md). Built on RADIO, weighted to
requirements-gathering and to carrying a constraint forward across decisions — *not* to feed
architecture, which he half-knows. Its retrieval check must plant a constraint early and offer a
decision later that the constraint invalidates.

**Lesson 1 Task B is retired.** He declined it — "im not concern about my speech, im more
concerned in the design" — and then answered the prompt in prose anyway, which produced the
finding the task existed for (opened at the stack, gathered no requirements). Do not chase it a
fourth time. Revisit only if a real interview goes badly on delivery.

## Closed

- **Cleanup as a principle** — lesson 3 tested it on two surfaces the lesson never taught from and
  both came back correct ([LR-0008](learning-records/0008-cleanup-closed-transfer-is-the-axis.md)).
  Stop teaching it.
- **Lesson 1 Task B** — retired, see above.

## Standing gaps not yet scheduled

- Calibration **Q17** (event loop ordering) — was clustered with Q18; Q18 now goes to lesson 3,
  so Q17 needs a new home. Fold into the compiler-performance lesson (task timing, INP) rather
  than leaving it orphaned.
- Calibration **Q14** (generics) — his only TypeScript miss against 3/4. Too thin alone; fold
  into a component-API lesson where generic props are the natural vehicle.
- **Discriminated union for request state.** Do *not* build a lesson on this yet. LR-0006 found
  loading and error were lost to a process gap, not a modelling gap — fix the protocol first and
  re-measure whether the state-shape question survives it.
- **`any` at the fetch boundary has now survived two exercises.** Q16 answered correctly, never
  applied. Too small for a lesson; make it an explicit graded line in every future exercise
  rubric so it stops being free.
- **`useInfiniteQuery` shape** — he keys infinite feeds as `['posts','page3']`, one query per
  page, rather than one cache entry holding `{ pages, pageParams }`. Clean-edged; it belongs in
  lesson 5 alongside cursor-vs-offset, since the two errors compound. Verify against the TanStack
  primary source rather than recalling it.
- **Roving `tabindex`** — lesson 3 Q2 miss. He holds `aria-activedescendant` for the combobox and
  not the choice between techniques. Too thin for a lesson; fold into a future composite-widget
  exercise (tabs, menu, or a toolbar) where the other technique is the correct one.
- **No human feedback loop exists.** Everything here is asynchronous, and self-assessment cannot
  measure how he sounds live. Flagged in `RESOURCES.md` under Gaps. He has not said whether he
  wants to join communities — ask before pushing it again.

## Progress so far

| | |
| --- | --- |
| Lesson 1 — calibration | 11/20. Hooks 1/4, modern React 3/4 — an inverted profile: reading, not shipping |
| Exercise 0001 — typeahead | ~2/6 in 45 min. Constant `queryKey` ate the run |
| Lesson 2 — render is a snapshot | 5/6. Snapshot 2/2, effects 2/2 — the model landed |
| Lesson 3 — keyboard | 4/6. Cleanup 2/2 on untaught surfaces closes LR-0005; missed roving `tabindex` and `preventDefault` |
| Exercise 0002 — rebuild | ~2/6 again, but recomposed: debounce correct, deps correct, `AbortController` reached for. Cancellation wired but never armed |
| Design probe — news feed | ~3/6. Scroll compensation strong, Tailwind correctly judged non-load-bearing; offset pagination chosen one question after describing what breaks it |

**Reps are confirmed as the primary instrument** (LR-0006) — lesson 2 transferred into timed
production, not just into a quiz, and the familiar layer is measurably faster. Keep exercises
frequent; stop repeating the same prompt.

**Identity is now mostly closed** (LR-0005) — dependency arrays right in both effects, `key`
present but index-contaminated. Downgrade from "the open wound" to a spot-check in future
exercises.
