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
