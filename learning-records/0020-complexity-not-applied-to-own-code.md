# Complexity is known in the abstract and not applied to his own data code; the build stays narrow

2026-10-21, exercise 0008 (palindrome feed, from scratch, 35 min). **1/6.** See
[the evaluation](../exercises/0008-palindrome-feed/EVALUATION.md).

## Finding 1: O(n²) in his own React code, unseen

He knew whole-string copies were the requirement-2 issue, yet still wrote `isPalindrome` with
two string copies. In the feed he used `reduce` + spread (O(n²); 273 ms vs 1.2 ms for `filter`
on 20k rows) inside the very `useMemo` meant to fix the stutter. The React placement was right:
flags computed once at module level, plus `useDeferredValue` and `memo`. The cost model of the
JS he wrote was absent.

## Finding 2: the pattern from LR-0010 again

He finished one area in depth (the feed). The phrase UI, the live region, the row cap and
`longestPalindrome` went untouched, and the buzzer notes weren't written. That's "starts too
few things" again, now on a from-scratch build.

## Before he started

He asked for the approach. Regex and ASCII case conversion weren't fresh, and he was given the
character-range check. Algorithm retrieval (two pointers, expand around centre) is the gap
LeetCode-style rounds probe.

## After the clock

He ran over 35 min, untimed, and reports freezing at the start. So 1/6 overstates nothing: the
clock was looser than graded. He had no working method for Big-O; the loop-counting recipe was
given 10-21. Check it cold on Thursday (E).

## Direction (Friday round)

- A 20-min redo of 0008: two pointers, expand around centre, and the phrase UI with a live region,
  stating Big-O out loud before writing.
- Thursday's cold drill: "what's the complexity of this snippet" on idiomatic JS (`reduce` +
  spread, `includes` in a loop, `shift`, string `+=`).
