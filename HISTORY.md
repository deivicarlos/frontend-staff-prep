# History

Archive of closed items and scores. Read on demand; STATE.md is the live file.

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
| Exercise 0005 — device list | **4/6 binary in 25 min.** API chain, queryKey, row key and detail-panel placement all pass. Invalidation scoped to one filter; outage not understood, not asked. Buzzer table empty |

**Reps remain the primary instrument** (LR-0006, unchanged). Exercise 0003 is the first exercise
to score above ~2/6 and the first where a lesson's central claim was visibly applied under a clock.

**The open axis is how he runs the clock, and it has narrowed twice.** LR-0009 called it
completion; [LR-0010](learning-records/0010-completion-closed-the-cost-moved-to-triage.md) closed
completion and moved it to **triage** — he finishes what he starts and starts too few things.
Alongside it sits the one knowledge axis still billing real minutes: **mechanical API recall**
(LR-0010 finding 3). Selection is live, mechanics are thin, and the lookups come out of a
20-minute clock. Reference sheets first, then the triage exercise.

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

## Gap notes as of 2026-09-24 (detail behind STATE.md's short list)

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

## Moved from STATE 2026-10-07

## Week 1: getting interviews (career comes first)

1. Resume and LinkedIn review. Done 2026-09-25.
2. Done 2026-09-25. The "why IC" answer: write it with him, then he rehearses it out loud. The framing is agreed in
   `career/CAREER.md`.
3. Dropped 2026-09-25 (he searches himself). A list of Canada-eligible target companies, built from `research/2026-canada-remote-eligibility.md`.

## Moved from STATE 2026-10-15

- GR prep done 10-14/15: GR summary, Core Web Vitals, SPA/SSR (no SSR experience; knowing it is
  enough), security block 1 + BFF/tokens/SSO/multi-tenant, prep file §2b–2g (LR-0016).
- 10-15: preflight held 2/2 overnight, CSP rollout 3/3 on re-ask, internals/INP 2.5/7 cold →
  ~2.5/4 re-asked (LR-0017).
