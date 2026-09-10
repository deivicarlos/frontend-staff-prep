# Where we are

_Last updated: 2026-09-09, session 2._

## Immediately next

**Lesson 3 — keyboard and focus in composite widgets.** Not yet written; it is the next thing
I build.

Requirement 5 (arrow keys + Enter) has now gone unstarted in both timed exercises, and Carlos
named the reason himself: he does not know how to do it. That makes it the only **knowledge**
gap in a workspace otherwise full of retrieval gaps — see
[LR-0005](learning-records/0005-cleanup-is-keyed-to-timers.md) — so it stops being assigned and
gets taught. It also absorbs calibration **Q18** (accessible widget behaviour), still open.

Scope: roving `tabIndex` vs `aria-activedescendant`, the listbox/combobox interaction contract
(wrap vs clamp, highlight reset on results change, Escape returns focus), and scroll-into-view
for the highlighted row. The retrieval check must test the keyboard contract itself — not
adjacent topics. That rule exists because lesson 2 broke it ([LR-0004](learning-records/0004-lesson-2-retrieval.md)).

**Second thing the lesson must carry:** cleanup in a *non-timer* instance. LR-0005 found that
Carlos writes symmetric cleanup flawlessly for `setTimeout` and not at all for an in-flight
request — cleanup is pattern-matched to timers rather than held as a principle. The keyboard
lesson has a natural vehicle (a `keydown` listener, or focus restoration on unmount), and the
check must use a different surface than the teaching did.

## Open question to ask him in prose

Did he **consider** a discriminated union for request state and reject it on time, or did it
never come to mind? Same for the loading state. The code can't distinguish those and they are
different findings. Ask plainly, don't build a grid.

Also still unanswered from the exercise 0002 report-back: what he looked up (syntax or
approach), where he stalled, whether he narrated, and whether the familiar parts felt faster.

## Then

**Lesson 4 — compiler-era performance.** Displaced from lesson 3 by the keyboard. Closes his
single lesson-2 retrieval miss: the boundary of what React Compiler automates (memoisation yes,
structural and network problems no). Partial cover already exists in
`reference/whats-changed-2024-2026.html` under "The memoisation shift."

**Exercise 0003** should be *small and surgical*, not another 45-minute typeahead. The typeahead
has given up most of its signal across two runs. Candidate: a 20-minute build of just the
keyboard layer over a results list that is handed to him already fetched — isolating the thing
he's never written from the things he now can.

**Still outstanding from lesson 1: Task B**, the 20-minute spoken system design attempt
("design a Twitter-style news feed", recorded, listened back). Never done, twice deferred. It
remains the only instrument for how he *sounds* under pressure.

## Standing gaps not yet scheduled

- Calibration **Q17** (event loop ordering) — was clustered with Q18; Q18 now goes to lesson 3,
  so Q17 needs a new home. Fold into the compiler-performance lesson (task timing, INP) rather
  than leaving it orphaned.
- Calibration **Q14** (generics) — his only TypeScript miss against 3/4. Too thin alone; fold
  into a component-API lesson where generic props are the natural vehicle.
- **`any` at the fetch boundary has now survived two exercises.** Q16 answered correctly, never
  applied. Too small for a lesson; make it an explicit graded line in every future exercise
  rubric so it stops being free.
- **No human feedback loop exists.** Everything here is asynchronous, and self-assessment cannot
  measure how he sounds live. Flagged in `RESOURCES.md` under Gaps. He has not said whether he
  wants to join communities — ask before pushing it again.

## Progress so far

| | |
| --- | --- |
| Lesson 1 — calibration | 11/20. Hooks 1/4, modern React 3/4 — an inverted profile: reading, not shipping |
| Exercise 0001 — typeahead | ~2/6 in 45 min. Constant `queryKey` ate the run |
| Lesson 2 — render is a snapshot | 5/6. Snapshot 2/2, effects 2/2 — the model landed |
| Exercise 0002 — rebuild | ~2/6 again, but recomposed: debounce correct, deps correct, `AbortController` reached for. Cancellation wired but never armed |

**Identity is now mostly closed** (LR-0005) — dependency arrays right in both effects, `key`
present but index-contaminated. Downgrade from "the open wound" to a spot-check in future
exercises.
