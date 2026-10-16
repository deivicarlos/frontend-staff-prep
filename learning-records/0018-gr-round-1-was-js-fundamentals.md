# Global Relay round 1: the probes were JS fundamentals, and round 2 is a code-review round

2026-10-16, debrief from his recall right after the 30-min call with the Lead SWD.

## Evidence

- Mostly background and his own story. Three short technical questions:
  - **`key`:** correct, including the remount trick. Identity held under real conditions (it missed cold on 10-15).
  - **`this`:** "it refers to the scope and the context", then `this.state` in class components.
    That mixes up `this` (set at call time by how the function is called; arrow functions take it
    lexically) with scope (lexical variable lookup). He said he didn't remember it well.
  - **`==` vs `===`:** the example was right (`2 == "2"` true, `===` false), but the wording was
    "== compares value, === compares type". In fact `===` compares type and value with no
    coercion, and `==` coerces first.
- The 6 s → 3 s story was explained as prop drilling causing re-renders, plus class to function components, Redux,
  and React Router. That's a weak causal chain for a load metric: re-renders after load don't change
  TTI, and Lighthouse removed TTI in v10 (2023). A follow-up could crack it.
- The warm-up the same morning, cold, before the call: ~2/5 (key correct; effect timing, INP phase 2, RUM and CSP missed).
- Nothing from the prep's CWV, CSP, OAuth, BFF or state-at-scale sections came up. The round
  tested JS/React basics and communication.

## What round 2 looks like (from the interviewer)

- Share screen and get sent React code: "what happens here / what's missing / how does it behave /
  how would you review it". Possibly a small app built from scratch.
- Context: the core product (Archive) is on an old JS framework being migrated to React. The
  Staff hire is meant to own that migration's architecture. Big data in the UI: pagination,
  infinite scroll, virtualization.
- An AI-team interviewer may join and may ask LeetCode-style questions and about AI use.

## Direction

- The next loop is read-and-predict code plus JS fundamentals, not system design or security.
  Reorder: code-review/predict-output reps and a JS fundamentals drill come first, security
  track S1 is paused until the GR loop ends. Details in STATE.md.

## What to watch

- Predict-the-behaviour under a clock is the format; LR-0011 (microtask/effect ordering) and
  LR-0013 (scenario reading) are the gaps it will expose.
- Make every story causally defensible before round 2.
