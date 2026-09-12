# Exercise 0003 — the keyboard layer

**20 minutes.** Not 45. This is one layer, not a build.

```sh
npm install
npm run dev
```

`src/Typeahead.tsx` works with a mouse and is broken with a keyboard. The fetch layer is
deliberately already done and synchronous — there is no debounce, no request and no cancellation
in this exercise. You have proved those twice. Do not rebuild them.

## Before the clock starts

These three are not advice. They are the protocol, and the rubric grades them.

1. **Transcribe the requirements below into `Typeahead.tsx`** as a comment block or checklist.
   Copying is the encoding step; reading is not. In exercise 0002 you read the list once, never
   returned to it, and lost two requirements to memory rather than to skill.
2. **At the 10-minute mark, re-read your transcribed list out loud.** One planned interrupt. The
   failure mode is having zero.
3. **At the buzzer, stop and write down what's unmet and what you'd do next.** Silently missing a
   stated requirement reads as "didn't listen." Naming it recovers most of the credit.

Then start a timer for 20 minutes.

## Requirements

1. **ArrowDown and ArrowUp move the highlighted result.** From the bottom, ArrowDown goes to the
   top; from the top, ArrowUp goes to the bottom. Decide wrap-vs-clamp deliberately and be able
   to say why you chose it.
2. **Enter selects the highlighted result.** With nothing highlighted, Enter does nothing — it
   must not select a row the user never looked at. Escape closes the list and clears the
   highlight.
3. **The user must be able to keep typing at all times.** Arrowing to a result and then typing
   another character must continue editing the query, not go somewhere else.
4. **A screen reader must be told which result is active** — as state on the elements, not as a
   visual highlight alone. The visual highlight is also yours to produce.
5. **The highlight must not survive a result set it no longer refers to.** Type until several
   results show, arrow down a few rows, then type another character that narrows the list.
   Whatever happens next must be defensible.
6. **The active row must be visible.** The list is deliberately shorter than the results. Holding
   ArrowDown must not leave the highlight somewhere off-screen below the fold.

## Also graded

- **No `any`.** `search()` in `src/data.ts` returns `any[]`. That is a plant. It has survived two
  exercises unremarked; it does not survive a third.
- **Keyboard behaviour that fights the browser.** If a key you handle also does something natively
  in a text input, both are running unless you say otherwise.

## What this is measuring

Requirement 5 in both previous exercises — the keyboard — went unwritten, and you named the reason
yourself. Lesson 3 closed the knowledge gap. This measures whether it survives a clock.

Nothing here needs a library. Do not reach for one.

**Do not open `AFTER-THE-TIMER.md` until the 20 minutes are gone.**
