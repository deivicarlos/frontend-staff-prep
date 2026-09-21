# Where we are

_Last updated: 2026-09-21, session 5._

## Immediately next

**Exercise 0004 is built and unrun — `exercises/0004-finish-the-job/`.** 20 minutes, four
requirements, binary scoring. The variable under test is completion
([LR-0009](learning-records/0009-the-re-read-is-the-load-bearing-step.md) finding 2), not a new
topic: the keyboard layer ships done and correct, and all four requirements — debounce,
cancellation, error, loading — are things he has built before. `search()` is asynchronous, slow
for `s` queries, rejects on `boom`, and honours an `AbortSignal`. A request-log panel is wired
into the page so every done-condition is observable rather than believable. The revised protocol
is carried: transcribe as actions, a literal 10-minute alarm, a buzzer table inside the file.
Re-measures 0002's unarmed `AbortController` under a condition that version cannot pass. `any[]`
planted a fourth time, argued as causal.

**Then: `reference/combobox-aria.html`** — a reference sheet, not a lesson. From LR-0009 finding
4. He selected `aria-activedescendant` for the right reason, derived from the right constraint,
then put it on the `<ul>` instead of the input — the one placement that makes it inert — omitted
`role="option"`, and shipped no combobox half at all. He named the cause himself: *"I forgot how
the active descendants worked."*

There is nothing to derive here, which is what makes it a reference sheet under the CLAUDE.md
convention. Build it from the [APG combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
as primary source — verify, don't recall. Must cover: which element carries which attribute, why
the DOM-focus holder is the one that carries `aria-activedescendant`, and the listbox/option
pairing. Roving `tabindex` belongs beside it as the contrasting technique, which also picks up
the lesson 3 Q2 miss. Note 0004's scaffold now contains a correct combobox implementation — the
sheet should not simply restate it.

## Standing exercise protocol (revised by LR-0009)

The LR-0006 protocol shipped as three graded lines and came back **one of three**. Transcription
happened; the list still failed to hold. The re-read is the active ingredient, and it is the step
that depends on him remembering to do something while absorbed.

1. **Transcribe the requirements into the file before the clock** — confirmed as done, but not
   sufficient on its own. From 0004, transcribe each one **as an action you will take**, which is
   also the fix for scenario-shaped requirements (LR-0009 finding 3).
2. **Set a second timer at the midpoint before starting the first one.** No longer "remember to
   re-read" — a literal alarm, a one-time cost before the clock with zero recall demand during it.
3. **At the buzzer, name what's unmet in writing.** Also unchecked twice. Make it mechanical: the
   brief provides the empty checklist to fill in, in the file.

## After that

**Lesson 4 — compiler-era performance.** Displaced three times and still the next lesson. Closes
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

- **The keyboard.** Exercise 0003 at 4/6 on the layer that went unwritten in exercises 0001 and
  0002. Requirement 3 (DOM focus never leaves the input) full credit — lesson 3's central claim
  survived a clock. Stop treating it as a gap.
- **`preventDefault` vs `stopPropagation`** — lesson 3 Q4 miss, applied correctly under time
  pressure without a reminder ([LR-0009](learning-records/0009-the-re-read-is-the-load-bearing-step.md)).
- **Cleanup as a principle** ([LR-0008](learning-records/0008-cleanup-closed-transfer-is-the-axis.md)).
- **Lesson 1 Task B** — retired, he declined it and the finding was obtained in prose anyway
  ([LR-0007](learning-records/0007-constraints-do-not-travel.md)). Do not chase a fourth time.

## Standing gaps not yet scheduled

- **Completion criteria** — LR-0009 finding 2, and now the largest open axis. Exercise 0004 above.
- **Scenario-shaped requirements don't convert into tasks** — LR-0009 finding 3. Do *not* fix by
  writing requirements as instructions; real briefs are scenario-shaped. Fix via the transcription
  step (write each as an action) and keep scenario-shaped requirements coming.
- **Roving `tabindex`** — narrowed by LR-0009. He holds the *choice between* techniques in the
  direction where `aria-activedescendant` wins, and missed the direction where roving wins
  (lesson 3 Q2). Goes into the reference sheet above, then wants a composite-widget exercise
  (tabs, menu, toolbar) where roving is the correct answer.
- Calibration **Q14** (generics) — only TypeScript miss against 3/4. Fold into a component-API
  lesson where generic props are the natural vehicle.
- **`any` at the fetch boundary — survived three exercises, and in 0003 it was causal.** With
  `Book[]` and `noUncheckedIndexedAccess` the requirement-2 crash is a compile error. Keep it a
  graded line, but argue it as *"`any` is why nothing told you,"* not as hygiene.
- **Discriminated union for request state.** Still parked. LR-0006 attributed the loss to process;
  the protocol is still not clean (one of three), so this remains unmeasured. Re-check after 0004.
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
| Exercise 0004 — finish the job | built 2026-09-21, unrun. Binary scoring on four done-conditions |

**Reps remain the primary instrument** (LR-0006, unchanged). Exercise 0003 is the first exercise
to score above ~2/6 and the first where a lesson's central claim was visibly applied under a clock.

**The open axis is no longer knowledge.** Three of the last four records — LR-0007 (constraints
don't travel), LR-0009 findings 2 and 3 (nothing gets finished; scenario-shaped requirements don't
convert) — are about how he runs the clock, not what he knows. Weight the next exercises there.
