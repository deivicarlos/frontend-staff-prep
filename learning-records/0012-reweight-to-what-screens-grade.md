# Reweight to what screens actually grade

Session 6, 2026-09-24. After both reference sheets, he pushed back on the direction. This is
evidence about the target, not about his level, and it changes what gets taught.

## What he said

> "I dont feel like these items are staff level. They are important but on every code challenge
> i have had in my career, nobody cares about that in the tests. They care more about things
> like hooks, solving bugs, system design, etc."

He described two real screens he has sat:

- **Shopify (he did not advance):** a roomba in an N×N grid, controlled with the arrow keys,
  turning 90° when it hits a wall. Build from scratch.
- **A second company:** an app with many components. A device list wasn't rendering because of
  a bug in the API call. Once that was fixed, the filters didn't work. TanStack Query ran under
  the hood. Then a long run of design questions.

> "you will loose all the time doing the logic and solving the problem. Once those things are
> done, then if you have time you can focus on the aria stuff"

He then added a track the mission did not have: working with AI as an engineer, meaning skills,
plans and context control, and what separates that from vibe coding. *"AI makes a good engineer
even better but a bad engineer worse."* He wants it **after** the frontend track, and he wants
the frontend track to be what makes him effective with AI.

## Finding 1: he is right, and the error was mine

Exercises 0003 and 0004 plus sheet 2 put roughly two sessions into the keyboard and ARIA layer.
It got that weight because the misses showed up there, not because screens grade it. Both
screens he described grade **working logic under a clock**: state modelling and keyboard control
(roomba), and sequential debugging through a data layer (device list). The a11y layer is
polish on top of a working app. **Stop scheduling it. Sheet 2 stays in `reference/` as reference
material. The composite-widget exercise is cancelled.**

## Finding 2: what carries over

- The async layer (cancellation, error, loading) is the device-list screen almost exactly.
  That work was on target.
- Triage ([LR-0010](0010-completion-closed-the-cost-moved-to-triage.md)) matters *more* in
  a chained-bug format, where each fix reveals the next bug and going depth-first with no time
  budget leaves the tail unreached.
- Retrieval under a clock ([LR-0003](0003-identity-is-the-gap.md)) and placement
  ([LR-0011](0011-placement-is-the-thin-layer.md)) do not depend on the topic.

## Finding 3: new content he named explicitly

Auth end to end (how login works, cookies, JWT, sessions), workers, and system design, in that
register: a staff candidate who can explain the mechanism. None of it has been measured.
Measure before teaching, as the calibration did.

## Unmeasured, worth asking

Where the clock went in the Shopify roomba round. He did not advance, and the cause is the most
direct evidence available about his failure mode in the real format.
