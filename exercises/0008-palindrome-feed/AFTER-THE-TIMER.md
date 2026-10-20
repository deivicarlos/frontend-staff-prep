# 0008 after the timer

Reload the page and re-run every done-condition. Don't tick boxes. **Paste the output** under
each one, then score it 1 or 0. Then paste your buzzer comment block from `Palindromes.tsx`.

## Score

| # | Requirement | What to paste | 1 / 0 |
| --- | --- | --- | --- |
| 1 | `isPalindrome` rows in the Checks panel | the 12 rows; the verdict text for each of the two phrases | |
| 2 | `isPalindrome` makes no copy of the input | the function, with its complexity comment | |
| 3 | `isPalindrome` call counter after search and toggles | the counter text after `radar` + on/off/on | |
| 4 | `#feed li` count and the total-match count | the console number; the count on screen vs Truth | |
| 5 | phrase input name and verdict live region | the Accessibility pane *Name*; the verdict element's markup on load | |
| 6 | `longestPalindrome` rows in the Checks panel | the 6 rows, plus its complexity comment | |

Also note: did you say each function's complexity **before** you wrote it, or only after?

## What each requirement was testing

**1. Normalisation traps.** Three cases catch most solutions.
- `ab_a`: `replace(/\W/g, "")` keeps `_`, because `\w` is `[A-Za-z0-9_]`. Use `[^a-z0-9]` after
  lowercasing, or test each character.
- `0P`: a filter that keeps only letters turns it into `p` and answers true. Digits count.
- `""` and `" "`: an empty string is a palindrome. A two-pointer loop gets this for free.

**2. Two pointers, O(n) time, O(1) extra space.** `i` from the left and `j` from the right skip
anything that isn't a letter or digit, compare one lowercased character each, and stop at the
first mismatch. Clean, reverse and compare is also O(n) time, but it's O(n) space: `replace`,
`split`, `reverse` and `join` each build a full copy, and it can't stop early. Both are O(n), so
the honest answer to "which is faster?" is "same complexity; two pointers allocates nothing and
exits at the first mismatch".
Expected follow-up: `text[i]` is a UTF-16 code unit. An emoji is two of them, so a naive
reverse corrupts it. Real character-level work needs `Array.from` (code points) or
`Intl.Segmenter` (graphemes). The stretch row needs accent folding: `normalize("NFD")`, then
drop the combining marks.

**3. What re-renders, and where state lives.** Two traps, in this order:
- Computing `isPalindrome(s.text)` for 20,000 rows in render, or in a `useMemo` whose deps
  include the query or the toggle. Flag every submission **once**, in a `useMemo` that depends
  only on the data (or at module level, since the data never changes). Filter on the flag after
  that.
- The phrase verdict. If the phrase checker is in the same component as the feed's state, or is a
  child of it, every keystroke in the search re-renders it and re-runs `isPalindrome(phrase)`. The
  reference solution hit exactly this and read 26. Fixes: make the checker and the feed
  **siblings**, each owning its own state, or wrap the checker in `memo`. This is lesson 7: a
  child re-renders when its parent does, whatever its props.

Debounce vs `useDeferredValue`: debouncing delays the work. `useDeferredValue` keeps the input
urgent and lets React render the expensive list behind it, interruptibly. With the flags
memoised, the filter itself is cheap, so neither is the main fix. Say that.

**4. Don't put 20,000 nodes in the DOM.** Cap the rows (first 100 matches plus "N matches"),
paginate, or virtualise (TanStack Virtual, react-window) so only the visible rows exist. This is
the big-data UI topic GR named: pagination, infinite scroll, virtualisation. Know the trade-off:
virtualisation breaks Ctrl+F, and a screen reader only sees the rendered rows.

**5. The live region exists first.** An input needs an accessible name: a `<label>` that wraps
it or uses `htmlFor`, and placeholder text alone doesn't count. The verdict goes in an element
with `role="status"` or `aria-live="polite"` that is **rendered on load and empty**, with only
its text changing. MDN: "Establish the live region before updating its content … The most
reliable way … is to include them in the initial markup." Rendering
`{phrase && <p role="status">…</p>}` mounts the region and its text together, so it's often
not announced. Also, the verdict has to be words, not only a colour.

**6. Expand around the centre: O(n²) time, O(1) space.** There are 2n−1 centres: each character
for odd lengths, and each gap for even ones (`cbbd` → `bb`). Expand while both ends match, and
keep the widest. The alternatives you should be able to name are a DP table (O(n²) time and
space) and Manacher's algorithm (O(n), rarely expected in an interview). Brute force over every
substring is O(n³). `abacdfgdcaba` catches the "longest common substring with the reverse"
idea: that finds `abacd`, which isn't a palindrome.

## Cold-check at grading (one question, answered out loud)

"In your solution, which components re-render when a moderator types one character into the
search, and how many times does `isPalindrome` run?" He should answer from the tree, before he
looks at the counter.
