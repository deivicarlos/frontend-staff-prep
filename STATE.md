# Where we are

_Last updated: 2026-09-09, end of session 2._

## Immediately next

**Carlos owes lesson 3 — it is written and waiting.** Open it, work through it, do the retrieval
check at the end, and paste the score back.

```sh
open lessons/0003-the-keyboard-is-the-widget.html
```

~30 minutes. It has two `predict.js` gates (derivations 1 and 3) that need a written prediction
before they reveal, so it can't be skimmed.

**What it covers, and why those two things are in one lesson:**

- **The keyboard**, which is the actual gap. Requirement 5 has gone unwritten in both timed
  exercises and he named the reason himself — he doesn't know how. Central claim is the
  *two focuses* framing: DOM focus versus the widget's own active item, and every technique
  reconciling the two. Covers `aria-activedescendant` vs roving `tabindex` and the rule for
  choosing, the APG interaction contract, wrap-vs-clamp, `preventDefault` on the arrows, and the
  scroll-into-view obligation. Absorbs calibration **Q18**.
- **Cleanup on non-timer surfaces**, which is [LR-0005](learning-records/0005-cleanup-is-keyed-to-timers.md).
  Listener, in-flight request, observer — one rule, three surfaces, plus the `AbortError`
  filtering that his rebuild's `catch` couldn't have supported.

Facts verified against the W3C APG (combobox pattern; developing a keyboard interface), not
recalled. Both are cited in the lesson and quoted directly.

**Reading the score when it comes back** — the tracks are deliberately diagnostic:

| Track | If it comes back short |
| --- | --- |
| Focus model (Q1–2) | The two-focuses framing didn't land; do not start exercise 0003 until it does |
| Interaction contract (Q3–4) | Knowledge gap, cheap to re-close; Q3 is also an identity spot-check |
| Cleanup (Q5–6) | Q5 wrong → cleanup still isn't a principle. Q6 wrong → it is, but abort-vs-error isn't |

Q5 and Q6 use surfaces the lesson did *not* teach from, on purpose. That rule exists because
lesson 2 taught cleanup entirely through timers and the check never varied the surface — the
error recorded in LR-0005.

## Then — exercise 0003, not yet built

Build it after the lesson 3 score lands, so its emphasis can follow the result. Spec already
settled: **20 minutes, keyboard layer only**, over a results list handed over already fetched.
Hold the scaffolding constant, vary the unfamiliar layer. Not another typeahead from scratch —
two runs have taken most of that prompt's signal.

Must carry the standing protocol below, and must grade `any` at the fetch boundary as an
explicit line rather than leaving it free.

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

**Still outstanding from lesson 1: Task B**, the 20-minute spoken system design attempt
("design a Twitter-style news feed", recorded, listened back). Never done, twice deferred. It
remains the only instrument for how he *sounds* under pressure.

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

**Reps are confirmed as the primary instrument** (LR-0006) — lesson 2 transferred into timed
production, not just into a quiz, and the familiar layer is measurably faster. Keep exercises
frequent; stop repeating the same prompt.

**Identity is now mostly closed** (LR-0005) — dependency arrays right in both effects, `key`
present but index-contaminated. Downgrade from "the open wound" to a spot-check in future
exercises.
