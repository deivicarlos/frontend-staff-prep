# Exercise 0003 — evaluation

**4/6.** Doubles both previous exercises, on the layer that went unwritten in both of them.
Attempt is in `src/Typeahead.tsx`; the keyboard is no longer a knowledge gap.

## Protocol

| | |
| --- | --- |
| Requirements transcribed into the file before the clock | ☑ verbatim, top of `Typeahead.tsx` |
| Re-read at the 10-minute mark | ☐ — "No" |
| Unmet requirements named at the buzzer, in writing | ☐ nothing in the tree |

One of three. See [LR-0009](../../learning-records/0009-the-re-read-is-the-load-bearing-step.md) —
the encoding step alone did not hold the list.

## The six

**1 · Arrow navigation — full.** `(prev + 1) % results.length` and
`prev <= 0 ? results.length - 1 : prev - 1`. Both ends wrap, and `-1` falls into index `0` on
ArrowDown and into the last row on ArrowUp with no special case. Wrap chosen; rationale not
stated in writing, which the rubric asked for.

Edge left open: the guard is `if (!open && results.length <= 0) return` — `&&` where it wanted
`||`. With `open === true` and an empty result set (type `zzz`), ArrowDown evaluates
`(prev + 1) % 0` → `NaN`.

**2 · Enter / Escape — half.** `active` starts at `-1`, which is the modelling half and the part
most candidates get wrong. Neither behaviour it exists for is implemented:

```js
case KEY_VALUES.ENTER:
  e.preventDefault();
  choose(results[active]);   // active === -1 → results[-1] → undefined → throws on .title
```

Type `the`, press Enter without arrowing — the most ordinary action available — and the
component dies. `KEY_VALUES.ESC` is declared and never reaches a `case`.

**3 · DOM focus never left the input — full.** No `.focus()` call anywhere. Typing after arrowing
continues to edit the query by construction. Lesson 3's central claim held under a clock.

**4 · ARIA — half.** `role="listbox"` ✅, `aria-selected` per row ✅, `aria-activedescendant`
present ✅. Against the [APG combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/):

- `<li>` has no `role="option"`; `aria-selected` on a roleless `<li>` is invalid, and
  `aria-activedescendant` must reference a valid descendant role.
- The input has no `role="combobox"`, `aria-expanded`, `aria-controls` or `aria-autocomplete`.
  The listbox half exists; the combobox half does not.
- **`aria-activedescendant` is on the `<ul>`.** The spec: *"DOM focus remains on the combobox and
  the combobox has `aria-activedescendant` set to a value that refers to the focused element
  within the popup."* It belongs on the input. The attribute is only meaningful on the element
  that actually holds DOM focus — which is the entire point of the two-focuses model.
- With `active === -1` it renders `aria-activedescendant="opt--1"`, pointing at nothing.

**5 · The stale index — miss.** Nothing resets `active` when `results` changes. Arrow to row 5,
narrow the list to two, and the index is numerically live and semantically meaningless, with the
aria pointing at an `id` that no longer exists. Identity family, fourth instance: `key`,
`queryKey`, dependency array, and now "what makes this highlight still the same row."

**6 · Scroll into view — full.** Effect keyed to `active`, `scrollIntoView({ block: "nearest" })`.
`nearest` rather than the default is the difference between a list that follows the highlight and
one that yanks itself on every keypress.

## Also graded

**`preventDefault` — passed.** Called on Enter, ArrowUp and ArrowDown. This was the lesson 3 Q4
miss, applied correctly under a clock without a reminder. Closed.

**`any` — third survival, and this time it was causal.** `search()` still returns `any[]`; `Book`
sits exported and unused. With `results: Book[]` and `noUncheckedIndexedAccess`,
`results[active]` is `Book | undefined` and `choose()` takes a non-optional object — **the
requirement-2 crash is a compile error.** The plant and the miss are the same defect. `any` was
not a style nit in this rubric; it was the thing that removed the guard rail.

## Not on the rubric, worth saying

- **Listener is on `document`.** Works, but arrow keys anywhere on the page drive the list.
  `onKeyDown` on the input is the smaller surface and removes the subscribe/unsubscribe effect
  entirely. Defensible either way — the interview cost is not having a reason ready.
- **`useCallback` deps `[open, results, active]`** tear down and re-add the listener on every
  keystroke. `active` is needed only for `choose(results[active])`; everything else already uses
  functional updates.

## Scaffold defect (mine)

`:root` declared `color-scheme: light dark` over a hardcoded-light palette, so in dark mode the
UA restyled the input to light text on an explicit `#fff` background and typing was invisible.
Carlos lost clock time to it and worked around it with `background: #ffffff00; color: black`.
Fixed at source: `color-scheme: light`, input restored to `#fff` / `#1a1a1a`.
