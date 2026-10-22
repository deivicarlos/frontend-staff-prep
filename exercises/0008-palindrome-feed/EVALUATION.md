# Exercise 0008: evaluation

**1 of 6** under binary scoring, checked by a browser script against each done-condition
(2026-10-21). The buzzer notes were not written, so all five misses are **silent**.

| # | Score | Cause |
| --- | --- | --- |
| 1 · does it score | 0 | `isPalindrome` passes all 12 rows (`ab_a` and `0P` too). There is no phrase input or verdict on screen, so the second half fails. |
| 2 · novel paste | 0 | Builds two full copies (`reverse` and `cleanStr`), so it's O(n) extra space and can't exit early. `ch + cleanStr` prepends, which is O(n²) in principle. `RegExp(/[a-z0-9]/)` allocates a new regex for every character. No complexity comment. |
| 3 · feed stutters | 1 | Counter reads 0. **Placement right:** the flags are computed once at module level, and the search value goes through `useDeferredValue` into a `memo` table. |
| 4 · feed freezes | 0 | All 20,000 rows are rendered (3,956 with the toggle on, which is correct) and no match count is shown. |
| 5 · screen reader | 0 | No verdict and no live region. The search input has only a placeholder, so no accessible name. The checkbox label is correct (`htmlFor`). |
| 6 · partial credit | 0 | Not attempted. |

## Not scored, but the finding that matters for Friday

Both filters use `reduce` with `[...acc, curr]`, which copies the accumulator on every element:
**O(n²)**. Measured on the 20,000 submissions with an empty query: **273 ms vs 1.2 ms** for
`filter`. That is the real stutter, and it's the exact "performance and complexity" question
the round asks. He applied complexity thinking to the algorithm (he knew copies were the
issue in requirement 2), but not to his own React data code.

## Protocol

- Requirements transcribed: yes.
- Buzzer notes: none. Requirements 1, 2, 4, 5 and 6 are unnamed.
- Order: he built the feed (requirements 3 and 4) before the phrase checker, which is
  requirement 1's on-screen half.

## After the clock (his report, 10-21)

He ran over 35 min and didn't time it. He froze at the start ("didn't know what to do"), first
time coding from scratch in a long while. He asked for a quick method to evaluate Big-O and was
given the loop-counting recipe (hidden loops: spread, `includes`, string building).

## Attempt 2 (2026-10-22): 2 of 6

He stopped before finishing. Not a clean measure: he asked for three mid-attempt checks, I listed
the bugs each time, and I explained requirement 1's Phrase input, which the brief doesn't spell out
(brief defect, not counted against him).

| # | Score | Cause |
| --- | --- | --- |
| 1 · does it score | 1 | All 12 rows pass, and the feed count is 3,956. The verdict shows `Palindrome` / `Not a palindrome`. |
| 2 · novel paste | 0 | Two pointers, no copies: the code is right. The Big-O comment is missing. |
| 3 · feed stutters | 1 | Module-level flags, plus `useMemo([phrase])` on the verdict. The counter stays 0. |
| 4 · feed freezes | 0 | All rows rendered in a `<table>`, no `ul#feed`, "Total items" instead of "N matches". |
| 5 · screen reader | 0 | The Phrase label is right. The `role="status"` element shows `Palindrome` on load (`isPalindrome("")` is true) instead of being empty. |
| 6 · partial credit | 0 | Not attempted. |

Fixed since attempt 1: `reduce` + spread replaced by `push` (O(n)); `isPalindrome` uses two pointers.
Bugs he wrote and fixed after a hint: the regex without `[]` and the inverted skip, `reduce` with a
missing `return` (pushed twice), `useMemo` deps missing `filteredSubs`, and an un-memoized verdict
call that broke requirement 3.
