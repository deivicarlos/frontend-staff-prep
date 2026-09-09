# Exercise 0002 — Typeahead, rebuilt

Same six requirements as [exercise 0001](../0001-typeahead/). Blank slate, fresh 45 minutes.
You are not patching the old one — you are producing it again from nothing, which is the
whole point. Scaffolding is done; the clock has not started.

```sh
npm run dev
```

## Requirements

1. Debounced input
2. Fetch a public API
3. Loading state
4. Error state
5. Arrow-key navigation through results, Enter to select
6. Stale requests cancelled

## The one constraint

**Hand-roll it. No TanStack Query, no SWR, no fetching library.**

Not because reaching for them is wrong — in production it isn't. But requirements 3, 4 and 6
are exactly what the library did for you last time, and they're exactly the three you didn't
finish. `useState` + `useEffect` + `AbortController` is the whole toolkit.

## Two things to do differently

**Budget for the keyboard.** Requirement 5 never got written last time, and it's the one that
most separates senior from mid. If you're 25 minutes in with no arrow keys, cut something
else and start it.

**Narrate the library decision instead of acting on it.** Out loud, roughly:
*"In production I'd reach for TanStack Query here — caching, dedup and cancellation for free.
I'll hand-roll it so you can see the mechanics."* Thirty seconds, full ecosystem credit, and
the question they asked still gets answered. Practise saying it, because that sentence is
worth real money in an actual loop.

## API

Same as before, so no clock goes to choosing:

```
https://openlibrary.org/search.json?q=SEARCH&limit=8&fields=key,title,author_name
```

Note `author_name` comes back as `string[]`, not `string`. You typed it as `string` last
time and it rendered anyway — which is how wrong types survive.

## Rules

- No AI, no reference implementations, and **don't open `../0001-typeahead/`**. Reproducing
  from memory is the exercise; copying your old file defeats it.
- MDN and react.dev for API signatures are fine.
- Talk out loud throughout.
- **Stop at 45 minutes.** Finished or not.

Then read `AFTER-THE-TIMER.md`.
