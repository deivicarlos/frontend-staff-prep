# Task A — Typeahead, 45 minutes

The app is scaffolded and installed. **Your clock has not started.**

```sh
npm run dev
```

Confirm it loads, then start a real 45-minute timer and open `src/App.tsx`.

## Requirements

1. Debounced input
2. Fetch against a public API
3. Loading state
4. Error state
5. Arrow-key navigation through results, Enter to select
6. Stale requests cancelled

## API — don't waste clock choosing one

**Open Library.** No key, no CORS problems, generous limits:

```
https://openlibrary.org/search.json?q=SEARCH&limit=8&fields=key,title,author_name
```

Backup if it's slow — Datamuse, smaller payloads, very fast:

```
https://api.datamuse.com/words?sp=SEARCH*&max=8
```

## Rules

- **No AI.** Not Claude, not Copilot, not autocomplete beyond your editor's built-in TS.
- **No reference implementations.** MDN and react.dev for API signatures is allowed — that's
  what you'd get in a real interview, and looking up `AbortController`'s exact shape is not
  the thing being measured.
- **Talk out loud the whole time.** This is the part everyone skips and it is half the
  interview. Record it if you can bear to.
- **Stop at 45 minutes**, finished or not. Where you stop *is* the data. Ship nothing after
  the buzzer — a padded result measures nothing.

## When the timer ends

Note these down while they're fresh, then read `AFTER-THE-TIMER.md`:

- Which requirements are actually working?
- What did you look up, and was it syntax or was it approach?
- Where did you stall, and for how long?
- Did you talk out loud, or did you go silent when it got hard?

Do not open `AFTER-THE-TIMER.md` before the buzzer. It tells you how this gets graded,
which would change what you build.
