# After the timer — exercise 0003

Score yourself honestly, then paste the result back. Partial credit is real: say "half" and say why.

## The protocol (graded first, on purpose)

| | |
| --- | --- |
| Requirements transcribed into the file before the clock | ☐ |
| Re-read at the 10-minute mark | ☐ |
| Unmet requirements named at the buzzer, in writing | ☐ |

LR-0006 found you lost requirements to process, not skill. If these three are checked and the
score is still short, that is a *different* and more useful finding than last time. If they are
unchecked, the score below doesn't measure what it claims to.

## The six

**1 · Arrow navigation with a deliberate wrap policy.**
Full credit: ArrowDown and ArrowUp move an index, both ends behave, and you can state why you
chose wrapping or clamping. Wrapping suits a short list the user is cycling; clamping suits a
long one where hitting the end is information. Either is right, "I didn't think about it" is not.
Half credit if it moves but an end is unhandled — off-by-one at the boundary is the classic.

**2 · Enter selects, and `-1` means nothing.**
The state should start at `-1`, not `0`. If it starts at `0`, a fresh result set arrives with a
row already highlighted and Enter selects something the user never looked at. Escape closes the
list and resets the highlight.

**3 · DOM focus never left the input.**
Full credit only if you never called `.focus()` on a result. If typing after arrowing still edits
the query, you passed this by construction. This is lesson 3's central claim and you answered it
correctly in Q1 — it should hold.

**4 · The ARIA state is real state.**
Looking for: `role="combobox"` on the input with `aria-expanded`, `aria-controls`,
`aria-activedescendant` pointing at the active option's `id`; `role="listbox"` on the list;
`role="option"` with `aria-selected` on the rows. Half credit for a visual highlight with no ARIA
— that's the bolted-on version the lesson argued against. The attributes *are* the state you had
to track anyway.

**5 · The stale index.**
The bug: `active` is `5`, a narrower query returns two results, and the index is now numerically
valid and semantically meaningless. Reset to `-1` when `results` changes. Clamping to
`length - 1` scores half — it keeps a highlight on a row the user never chose, and Enter then
selects it. This is the identity family again: `key`, `queryKey`, dependency array, and now this.

**6 · Scroll into view.**
Nothing is DOM-focused, so nothing scrolls itself — that is the cost of the technique you picked,
and the APG says so explicitly. Full credit for an effect keyed to the active index calling
`scrollIntoView({ block: "nearest" })`. Half credit if you used the default options: they yank the
list even when the row is already visible.

## Also graded

**`any` at the boundary.** `search()` returns `any[]`. Did you change it to `Book[]`, or annotate
at the call site? It has now survived two exercises. You answered calibration Q16 correctly —
this is the third chance to apply it.

**Fighting the browser.** ArrowUp in a text input moves the caret to the start. That's the input's
*default action*, so it runs alongside your handler unless you call `e.preventDefault()` on the
keys you're claiming. `stopPropagation()` does not help — nothing is bubbling. You missed exactly
this as Q4 of the lesson 3 check, which is why it is a graded line here and not a footnote.

## Three questions to answer with the score

1. Did the two-focuses framing come to mind while building, or did you implement from memory of
   the lesson's code?
2. Which requirement did you write first, and why that one?
3. Was 20 minutes short, right, or long for this layer?

## A reference implementation is not provided

On purpose. If you want to check yourself against a specification rather than against my code,
the [APG combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) is the actual
contract — its "Keyboard Interaction" table is the grading rubric the industry uses. Compare
against that, and tell me where you diverged.
