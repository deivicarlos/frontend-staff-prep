# Where we are

_Last updated: 2026-09-08, end of session 1._

## Immediately next

**Carlos owes exercise 0002 — the hand-rolled typeahead rebuild.** It is scaffolded,
installed and ready. He starts a 45-minute timer and builds; nothing else is queued ahead
of it.

```sh
cd exercises/0002-typeahead-rebuild && npm run dev
```

Briefing: `exercises/0002-typeahead-rebuild/START-HERE.md`.
Rubric he opens after the buzzer: `AFTER-THE-TIMER.md` in the same folder.

**When he reports back**, he owes: his `src/`, a self-marked requirement table, what he looked
up (*syntax or approach* — this is the question that changes the curriculum), where he
stalled, whether he narrated, and how much faster the familiar parts felt.

## What that exercise is testing

It is the **first real test of the identity gap**, which is the highest-confidence finding in
this workspace (LR-0003, confirmed four separate ways) and which lesson 2 taught but never
re-tested (LR-0004). Hand-rolled, the mechanism surfaces as the dependency array. Three
checks: does the fetch effect depend on the debounced value, do list items carry a stable
non-index `key`, does the debounce effect depend on the raw input.

Also watching: whether he reaches for a discriminated union for request state unprompted
(he can state the principle — calibration Q15 — but didn't apply it in exercise 0001), and
whether cancellation gets written at all.

## Then

**Lesson 3 — compiler-era performance.** His only lesson-2 retrieval miss was the boundary of
what React Compiler automates: memoisation yes, structural and network problems no. Deferred
deliberately behind the exercise so application doesn't keep losing to input. Partial cover
already exists in `reference/whats-changed-2024-2026.html` under "The memoisation shift."

**Still outstanding from lesson 1: Task B**, the 20-minute spoken system design attempt
("design a Twitter-style news feed", recorded, listened back). Never done. It is the only
instrument we have for how he *sounds* under pressure, and nothing else measures it.

## Standing gaps not yet scheduled

- Calibration **Q17** (event loop ordering) and **Q18** (accessible widget behaviour) —
  platform fundamentals, cluster naturally into one lesson.
- Calibration **Q14** (generics) — his only TypeScript miss against 3/4. Too thin alone; fold
  into a component-API lesson where generic props are the natural vehicle.
- **No human feedback loop exists.** Everything here is asynchronous, and self-assessment
  cannot measure how he sounds in a live interview. Flagged in `RESOURCES.md` under Gaps.
  He has not said whether he wants to join communities — ask before pushing it again.

## Progress so far

| | |
| --- | --- |
| Lesson 1 — calibration | 11/20. Hooks 1/4, modern React 3/4 — an inverted profile: reading, not shipping |
| Exercise 0001 — typeahead | ~2/6 in 45 min. Constant `queryKey` ate the run |
| Lesson 2 — render is a snapshot | 5/6. Snapshot 2/2, effects 2/2 — the model landed |
| Exercise 0002 | **pending** |
