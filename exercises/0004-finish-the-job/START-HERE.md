# Exercise 0004 — finish the job

**20 minutes.** Four requirements. Every one of them is something you have already built at
least once.

```sh
npm install
npm run dev
```

The keyboard layer is done and correct — it is the version 0003's rubric asked for. Do not
touch it. `search()` in `src/data.ts` is now asynchronous and behaves like a real endpoint:
slow, occasionally broken, and it does not answer in the order you call it. The naive
`useEffect` that calls it is in `Typeahead.tsx` and it is wrong in four ways.

The panel under the search box logs every request and its fate. Each requirement below ends in
a **done when** you can check against that panel or the screen. That is the point of this one:
last time every requirement got enough attention to look addressed and not enough to be
finished. A requirement whose done-condition does not pass scores **zero**, not half.

## Before the clock

1. **Transcribe each requirement into `Typeahead.tsx` as the action you will take** — not the
   requirement's words, the thing you are going to do. The comment block is waiting.
2. **Set a 10-minute alarm now, before you start the 20-minute one.** Not "remember to
   re-read" — a literal second timer. When it fires, re-read your four actions.
3. At the buzzer, fill in the table at the bottom of that comment block before opening
   `AFTER-THE-TIMER.md`.

## Requirements

**1 · One keystroke burst, one request.**
Type `tolkien` at normal speed.
**Done when:** the log shows exactly one request for that burst.

**2 · A slow answer must not overwrite a newer one.**
Queries beginning with `s` take 1.5s; everything else takes 250ms. Type `snow`, and then —
without waiting for its results — select all and type `dune`. Somewhere in there a dead request
is still in the air.
**Done when:** the list shows Dune and never flickers to Snow Crash, and the log shows the
`snow` request as `aborted` rather than `resolved`.

**3 · The service falls over.**
Any query containing `boom` rejects. The user needs to know, and then needs to be able to carry
on.
**Done when:** the message is on screen, the console has no unhandled rejection, and typing
`dune` afterwards shows results with no trace of the error left behind.

**4 · The user must know a request is in flight.**
Use an `s` query — you have 1.5 seconds to see it.
**Done when:** it appears while the request is open and is gone in *both* endings: after `dune`
resolves, and after `boom` fails.

## Also graded

**`search()` returns `any[]`.** It has survived three exercises. In 0003 it was not hygiene —
it was causal: with `Book[]`, the crash you shipped was a compile error. `any` is why nothing
told you.

Nothing here needs a library. **Do not open `AFTER-THE-TIMER.md` until the 20 minutes are gone.**
