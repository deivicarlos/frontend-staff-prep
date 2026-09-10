# Cleanup is keyed to timers, not to effects — and identity mostly closed

Exercise 0002 (the hand-rolled rebuild) scored ~2/6 again, but the composition of that 2/6
changed completely. See [the full evaluation](../exercises/0002-typeahead-rebuild/EVALUATION.md).

## Finding 1: the cleanup reflex is pattern-matched to `setTimeout`

In the same 45 minutes, in two files, Carlos wrote:

- `useDebounce` — `setTimeout` with a `clearTimeout` cleanup returned from the effect. Textbook
  symmetric cleanup, correct deps. **Second time in a row** (attempt 0001 had it too).
- The fetch effect — `AbortController` constructed, `signal` threaded through the API module
  into `fetch`, and then **no return from the effect at all**. The only `.abort()` call sits
  inside `catch`, firing after the request has already settled, where it is a no-op.

So he built ~90% of requirement 6 and left the arming step off. This is not "he doesn't know
about cleanup" — he demonstrably does, twice. It is that cleanup is stored as *a thing you do
when you set a timer*, not as *the effect must be able to undo itself*. Lesson 2's derivation 4
landed on its example rather than on its principle, and the retrieval check (5/6) never caught
that because it tested the concept in the same timer clothing the lesson taught it in.

**Implication:** the next treatment of cleanup must present it in a non-timer instance —
subscription, event listener, in-flight request — and the check must use a different instance
than the teaching did. Same design error as [LR-0004](0004-lesson-2-retrieval.md), one level
down: I varied the topic and not the *surface*.

## Finding 2: identity is mostly closed

The three checks the exercise was built to run:

| Check | Result |
| --- | --- |
| Fetch effect depends on debounced value | ✅ `[debounced]` — the successor to `queryKey: ["books"]`, fixed |
| Debounce effect depends on raw input | ✅ `[txt]` |
| Stable non-index `key` on list rows | ⚠️ `` key={`${index}-${book.title}`} `` |

The dependency-array half — the half that was actively breaking his code across
[LR-0002](0002-calibration-results.md) and [LR-0003](0003-identity-is-the-gap.md) — is right in
both effects. The `key` half is weaker: every row has one now (none did before), but he reached
for the index and appended the title to make it unique, which answers *"how do I make this
string unique"* rather than *"what makes this row the same row."*

Contributing cause worth noting: he dropped `&limit=8&fields=key,title,author_name` from the
briefed URL, which removed the stable OpenLibrary id from the payload, leaving the index as the
best available ingredient. Partly a spec-reading miss, not purely a model gap.

**Verdict: stop treating identity as the open wound.** Downgrade to spot-checks in future
exercises rather than dedicated teaching.

## Finding 3: knowing ≠ reaching for, confirmed a second time in the same spot

`response.json()` came back as `any` again, unchecked from the boundary inward, exactly as in
attempt 0001 — despite calibration Q16 correct. Also no discriminated union for request state
despite Q15 correct, and requirement 3 (loading) went from *partial* to *absent* once the
library stopped providing it for free. That regression is informative: the loading state was
something he had been **receiving**, not something he had built.

Unresolved and worth asking in prose: did he consider the union and reject it on time, or did
it never surface? Different findings, indistinguishable from the code.

## Finding 4: the keyboard is a knowledge gap, not a retrieval gap

Requirement 5 is unstarted for the second time, and he self-reported the reason plainly: he
does not know how to do it. Everything else in this workspace is retrieval — principles he can
state and doesn't reach for under a clock. This one is different in kind, and it is the
strongest senior/mid discriminator in the exercise brief.

**Implication:** it has now failed twice as an assignment, so it stops being assigned and gets
taught. Lesson 3 becomes the composite-widget keyboard lesson — roving `tabIndex` /
`aria-activedescendant`, the listbox/combobox interaction contract, focus return on Escape —
which also absorbs the still-outstanding calibration **Q18** (accessible widget behaviour).

## Sequencing consequence

Compiler-era performance (queued as lesson 3 by [LR-0004](0004-lesson-2-retrieval.md)) is
displaced to lesson 4. It closes a single retrieval miss on a topic with partial reference-sheet
cover; the keyboard is two failed attempts, an unmet requirement, and a calibration miss. Not
close.
