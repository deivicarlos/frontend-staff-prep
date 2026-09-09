# Exercise 0001 — Evaluation

45 minutes, timed, self-reported honest. One lookup: TanStack Query docs.

## Requirement scorecard

| # | Requirement | Status |
| --- | --- | --- |
| 1 | Debounced input | ⚠️ Works by accident — `setInterval` where `setTimeout` belongs |
| 2 | Fetch a public API | ✅ Works |
| 3 | Loading state | ⚠️ First query only; dead after that |
| 4 | Error state | ❌ Thrown in `api.ts`, never rendered |
| 5 | Arrow keys + Enter | ❌ Not started |
| 6 | Stale request cancellation | ❌ Not implemented |

Roughly **2 of 6**. But the score is the least useful thing on this page.

## The bug that eats everything else

```ts
const { isPending, data } = useQuery({
  queryKey: ["books"],                       // ← constant
  queryFn: () => searchOpenLibrary(debounced),
});
```

The key never changes, so React Query believes every search is *the same query*. It runs
`queryFn` once on mount — with `debounced` as `""` — and then never re-runs it in response
to typing. The app fetches once and stops.

It isn't quite "never updates again," which is what makes it nasty to debug: default
`refetchOnWindowFocus` means tabbing away and back *does* refetch, and the closure then picks
up the current `debounced`. So it looks intermittently alive. That's worse than being plainly
broken.

Two follow-on effects, both mistaken for separate bugs:

- **`isPending` dies after the first resolve.** In v5 it means "no data yet." With a frozen
  key, data arrives once and `isPending` is false forever — so requirement 3 appears to work
  and then silently stops.
- **Cancellation looks unnecessary.** With one query there's no race to lose. React Query
  would have handled requirement 6 for free — it passes an `AbortSignal` into `queryFn` and
  keys separate in-flight requests — but only if the key varies. `searchOpenLibrary` also
  ignores the signal it was never given.

The fix is one line: `queryKey: ["books", debounced]`.

## The pattern underneath — this is the finding

That bug is not a React Query bug. It's an **identity** bug, and it's the third time the same
misconception has surfaced:

| Where | What was missed |
| --- | --- |
| Calibration **Q9** | A new element object means a re-render; a stable one means a bail-out |
| Calibration **Q5** | Resetting state on prop change is a `key`, because a new key means a new instance |
| **`queryKey: ["books"]`** | A stable key means "same query," so nothing re-runs |
| **`<li>` with no `key`** | React can't tell which row is which across renders |

`key`, `queryKey`, and the dependency array are the same mechanism wearing three hats:
*something declares what makes this a different thing, and the system re-runs when it
changes.* Missing it in one place is a slip. Missing it in four is a model gap.

This is exactly what [lesson 2](../../lessons/0002-render-is-a-snapshot.html) is about, which
settles the "lesson 1 or lesson 2" question.

## The strategic error

Reaching for TanStack Query was defensible on instinct — it *is* the 2026 default for server
state, and it matches your 3/4 on modern React. In this exercise it was the wrong call, for a
reason worth internalising:

**The requirements list was debounce, loading, error, cancellation. Those are the things the
interviewer wants to watch you build.** Delegating them to a library answers a question nobody
asked ("do you know the ecosystem?") while skipping the one they did ask ("can you reason
about async state?"). And it cost the whole budget: 45 minutes went to wiring a provider and
fighting an unfamiliar API, leaving keyboard navigation — the requirement that most separates
senior from mid — untouched.

`useState` + `useEffect` + `AbortController` would have hit all six in the time available.

The interview-safe version of your instinct, said out loud: *"In production I'd reach for
TanStack Query here — it gives me caching, dedup and cancellation for free. For this exercise
I'll hand-roll it so you can see the mechanics."* That earns the ecosystem credit **and**
answers the actual question. Thirty seconds of narration, no downside.

## What was genuinely good

Not consolation — these are things a lot of candidates don't do:

- **You extracted `useDebounce` and `api.ts` under time pressure.** Most people put everything
  in `App.tsx` and apologise for it. Structure while the clock runs is a senior signal.
- **Your debounce effect has correct symmetric cleanup.** `clearInterval` in the return, keyed
  on `[str, delay]`. That is precisely lesson 2's derivation 4, done right, unprompted — the
  concept you missed on calibration Q6 you then applied correctly in real code.
- **`aria-label` on the input**, unasked. Accessibility instinct is rarer than it should be,
  and it partly offsets your Q18 miss.
- **You threw on `!response.ok`** rather than letting a 404 arrive as JSON. You thought about
  the error path at the boundary; you just ran out of clock before rendering it.

## Smaller things, for the record

- `useEffectEvent` is imported and unused — the only typecheck error.
- `setInterval` should be `setTimeout`. Yours fires repeatedly forever; it *looks* correct
  because `setDebounced(str)` with an unchanged value makes React bail out of re-rendering.
  A timer that never stops is still a leak.
- `<li>` elements live inside a `<div>` and carry no `key`. Invalid HTML, and the provided CSS
  targets `ul li`, so they render unstyled.
- `author_name` is `string[]` in the real payload, typed here as `string`. It renders anyway,
  which is how wrong types survive.
- `response.json()` returns `any`, so `data` is unchecked from the boundary inward — you got
  calibration Q16 (`unknown` vs `any`) right and then didn't apply it under pressure. That gap
  between knowing and reaching-for is what this exercise exists to expose.
- No `enabled: debounced.length > 0`, so an empty query fires on mount.
- `<form>` has no `onSubmit`, so pressing Enter reloads the page — which would have collided
  with requirement 5.
