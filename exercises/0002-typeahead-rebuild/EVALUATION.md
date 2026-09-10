# Exercise 0002 — Evaluation

45 minutes, hand-rolled as briefed. No library, no provider wiring — the constraint held.
Self-reported: ran out of time, and did not know how to do the keyboard navigation.

## Requirement scorecard

| # | Requirement | Attempt 1 | Attempt 2 |
| --- | --- | --- | --- |
| 1 | Debounced input | ⚠️ Worked by accident (`setInterval`) | ✅ Correct |
| 2 | Fetch a public API | ✅ | ✅ (fires on empty mount; URL degraded — see below) |
| 3 | Loading state | ⚠️ First query only | ❌ Absent entirely |
| 4 | Error state | ❌ Thrown, never rendered | ❌ Thrown, then *swallowed* |
| 5 | Arrow keys + Enter | ❌ Not started | ❌ Not started |
| 6 | Cancellation | ❌ Not implemented | ❌ Wired, then not armed |

**Roughly 2 of 6 again.** The number didn't move. Several things underneath it did, and one
thing moved backwards. Both matter more than the total.

## The finding: cleanup is attached to timers, not to effects

This is the headline, and it's new.

```ts
useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;

  const fetchData = async () => {
    try {
      const result = await searchBooks(debounced, signal);
      setBooks(result?.docs);
    } catch (e) {
      controller.abort();          // ← aborting a request that already settled
    }
  };

  fetchData();
                                   // ← no return. Nothing ever cancels.
}, [debounced]);
```

You built the entire cancellation apparatus. `AbortController` constructed, `signal`
destructured, threaded through `searchBooks`, and `fetch` receives it. That is roughly 90% of
requirement 6, and none of it existed in attempt one. Then the effect returns nothing, so
`.abort()` is never called when `debounced` changes — and the one `.abort()` you did write
runs *inside `catch`*, after the request has already failed, where it does nothing at all.

Now put that next to `useDebounce.ts`, written in the same 45 minutes:

```ts
useEffect(() => {
  const timerId = setTimeout(() => setDebounced(txt), msDelay);
  return () => { clearTimeout(timerId); };     // ← textbook symmetric cleanup
}, [txt]);
```

Perfect cleanup. Second time in a row — attempt one had it too, on the same hook.

So: **you write cleanup reliably when the effect sets a timer, and not at all when it starts a
request.** That is a pattern you've memorised keyed on `setTimeout`, not a principle you apply
to effects. The principle is lesson 2's derivation 4 — *an effect must be able to undo itself,
because React will re-run it and the old run must stop mattering* — and a timer is only its
most familiar instance. A fetch is the same shape: the cleanup is what makes the stale
response stop mattering.

The rubric predicted this exact half-landing as a possibility before seeing your code. It's
the most specific thing this exercise found.

The fix is three lines, and worth typing out by hand rather than reading:

```ts
useEffect(() => {
  const controller = new AbortController();
  fetchData(controller.signal);
  return () => controller.abort();
}, [debounced]);
```

## Identity: 2 of 3, and the third one is a tell

This exercise existed to test whether the four-times-confirmed identity gap closed. Scoring
the three checks the rubric named:

- **Does the fetch effect depend on the debounced value?** ✅ `[debounced]`. Correct, and this
  is the direct successor to `queryKey: ["books"]`. The bug that ate attempt one is gone.
- **Does the debounce effect depend on the raw input?** ✅ `[txt]`. Correct.
- **Do list items carry a stable non-index key?** ⚠️ `key={`${index}-${book.title}`}`.

Every row has a key now, where attempt one had none. But you reached for the index and then
made it unique by appending the title. That ordering is the tell: the question you answered
was *"how do I make this string unique?"* rather than *"what makes this row the same row
across renders?"* The index is the one ingredient guaranteed to change when the list reorders,
so mixing it in is strictly worse than `key={book.title}` alone.

There is a cause worth tracing. The brief gave you this URL:

```
https://openlibrary.org/search.json?q=SEARCH&limit=8&fields=key,title,author_name
```

You shipped `search.json?q=` and dropped the rest. `fields=key` was the stable OpenLibrary
identifier — the actual right answer for `key` — and dropping it from the URL removed the
identity from the payload, which is why the index was the best thing left to reach for.
Dropping `limit=8` also means every keystroke now pulls back the default 100 documents with
all fields, which is a few hundred KB per request instead of a couple of KB. In a live
interview an observer sees that on the network tab.

**Verdict: identity is mostly closed.** The dependency array — the part that was actively
breaking your code — is right in both effects. The `key` half is a weaker reflex than the
deps half, but it is no longer absent.

## State shape: still option A, and thinner than last time

No `loading`, no `error`, no union — just `useState<Book[]>([])`. Attempt one at least
rendered `Loading...` via `isPending`.

That is requirement 3 going from partial to zero, and it's the one genuine regression here.
The likely reason is that last time the library handed you loading for free, and this time
nothing did. Which is exactly what the constraint was for: it revealed that "render a loading
state" wasn't a thing you had built, it was a thing you had received.

The rubric asked a question I still need answered: did you consider the discriminated union
and reject it on time, or did it never come to mind? Those are different findings and I can't
tell them apart from the code.

Note how cheap it would have been. With cancellation wired properly, three lines of state and
two ternaries close requirements 3 and 4 — call it five minutes, for a third of the scorecard.

## Error handling: this one moved backwards

`http.ts` throws on `!response.ok`, same good instinct as last time. Then:

```ts
} catch (e) {
  controller.abort();
}
```

The error is caught and discarded. Nothing is stored, nothing is rendered, nothing is logged.
Attempt one at least let it propagate. And the `catch` conflates two different events that
must be told apart before requirement 4 can exist at all:

- an **`AbortError`**, which is the *success* path of cancellation and must be ignored
- a **real failure** — network down, 500 — which must become visible UI

The idiom, worth memorising as one unit with the cleanup above:

```ts
catch (err) {
  if (err instanceof DOMException && err.name === 'AbortError') return;
  setState({ status: 'error', message: 'Could not load books' });
}
```

## Real defects, not style

- **`BookList` will crash on a bad payload.** `setBooks(result?.docs)` writes `undefined` when
  `docs` is missing, and `books.map` has no guard. Attempt one wrote `docs?.map` and survived
  this. The optional chaining moved to the wrong side of the boundary.
- **`response.json()` is `any`.** Unchanged from attempt one, and it's why the bullet above
  typechecks: `Promise<any>` assigned to `Book[]` raises nothing. You answered calibration Q16
  (`unknown` vs `any`) correctly and did not reach for it under pressure, for the second time.
  Same knowing-versus-reaching-for split as LR-0003, now confirmed twice in the same spot.
- **No `encodeURIComponent(query)`.** A search containing `&`, `#` or `+` builds a malformed
  URL and silently returns the wrong results.
- **Empty query fires on mount.** `debounced` starts `""`, so a `q=` request goes out before
  any typing. Identical to attempt one. Guard with `if (!debounced) return;`.

## Smaller things

- `console.log({ books })` left in the render body, as in attempt one.
- `useDebounce` deps are `[txt]` but the effect also reads `msDelay`. Harmless while it's a
  default, and `exhaustive-deps` will flag it.
- `author_name?.toString().replace(",", " ")` replaces only the *first* comma — three authors
  render as `A B,C`. `author_name?.join(", ")` is the intended tool.
- `<div className="">` in `App.tsx`.

## What genuinely improved

Not padding — these are the deltas between two files written three weeks apart under the same
clock:

- **The debounce is actually correct.** `setTimeout`, not `setInterval`. The leak is gone.
- **`author_name` is typed `string[]`**, matching the real payload.
- **You reached for `AbortController` unprompted.** It did not appear anywhere in attempt one.
  The mechanism is known; only the wiring point is missing.
- **You decomposed into `BookItem` / `BookList` with typed props**, under time pressure, having
  also extracted the hook and the API module. Composition instinct is intact and improving.
- **Every list row has a key**, where none did before.
- **You followed the constraint.** No library, no provider, no time lost to unfamiliar API
  surface. Attempt one spent its whole budget there; this one didn't.

The 45 minutes bought you a correct debounce, correct dependency arrays, a component
hierarchy, and most of a cancellation implementation. Attempt one bought a frozen query key.
The scorecard says 2/6 both times because the scorecard measures finished requirements, and
you spent this run rebuilding the foundation rather than adding surface.

## The keyboard, twice now

Requirement 5 has gone unstarted in both attempts, and you named the reason: *you don't know
how to do it.* That is worth separating from everything else on this page, because everything
else here is a retrieval problem — things you know and don't reach for — and this one isn't.
It's a plain knowledge gap, and it's the single strongest senior/mid discriminator in the
brief. It gets taught next rather than assigned again.
