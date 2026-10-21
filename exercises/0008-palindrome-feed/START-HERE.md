# Exercise 0008: palindrome feed (build from scratch)

**35 minutes on a timer, then about 15 to grade. Six requirements, which may not all fit. Name
what you skip.**

Friday's format: a palindrome problem in React, then "how fast is it, and can you make it
faster?". **Talk out loud the whole time.** No AI. MDN lookups for an API or attribute name are fine:
say out loud what you're looking up, and list each lookup at the buzzer. Don't search for
solutions ("palindrome javascript").

```sh
npm run dev
```

## The app

**Palindrome Cup** is a word game: players submit phrases, and a palindrome scores.

- **Yours:** `src/palindrome.ts` and `src/Palindromes.tsx`. You can add files.
- **Not yours, and correct:** `data.ts` (20,000 submissions, each `{ id, player, text }`),
  `counter.ts`, `main.tsx`.
- **The Checks panel** at the top of the page:
  - *run checks* tests your two functions against fixed cases.
  - *isPalindrome calls* counts every call. Keep the `counter.calls++` line.
  - *Truth* shows the correct number of palindromes in the feed: 3,956.

## Start routine (first 2 minutes)

1. Copy the six requirements into the comment at the top of `Palindromes.tsx`.
2. Say out loud what goes in and what comes out.
3. Write the simplest version that works, then say its Big-O, then improve it.

## What the page must look like when you're done

The text must match; styling doesn't matter.

```
[ Checks panel — already there ]

Phrase [__________________]           ← an <input> with the label "Phrase"
Palindrome                            ← verdict line

Search [__________]  [x] Palindromes only
3956 matches                          ← TOTAL that match, not the rows shown
  #8 · bo · wow                       ← one <li> per row: #id · player · text
  #13 · gus · wow
  …at most 100 rows, inside <ul id="feed">
```

## Requirements

Each scores **1 only if every check under it passes.**

**1 · Does it score?** A player types a phrase and sees whether it's a palindrome. Case, spaces
and punctuation don't count; letters and digits do.
- *run checks*: every `isPalindrome` row says `pass` (the *stretch* row may fail).
- Type `Never odd or even` → the verdict line shows `Palindrome`.
- Type `Never odd or evens` → it shows `Not a palindrome`.

**2 · Someone pasted a novel.** Players paste whole books, so `isPalindrome` must not copy the
text.
- `isPalindrome` builds no new string or array: no `replace`, `split`, `reverse`, `join`,
  spread, `+=` on a string, or `toLowerCase()` on the whole text.
- A comment above it: `// Time: O(?)  Space: O(?)  — why`.
- *run checks* still passes.

**3 · The feed stutters.** Typing in the search must stay smooth.
- Click *reset counter*.
- Type `radar` in the search, then click *Palindromes only* on, off, on.
- The counter still reads `isPalindrome calls: 0`.

**4 · The feed freezes on open.** Never put all 20,000 rows on the page.
- In the console, `document.querySelectorAll("#feed li").length` is `100` or less, whatever
  the filter.
- The match count shows the total: with *Palindromes only* on and an empty search, it reads
  `3956 matches`.
- Type `radar`: the count goes down, and every row contains "radar".

**5 · A moderator uses a screen reader.** They must hear the verdict as they type.
- DevTools → Accessibility, with the phrase input selected: *Name* is `Phrase`.
- DevTools → Elements on page load, before typing: the verdict element is already there,
  empty, with `role="status"`.

**6 · Partial credit.** A non-palindrome scores the length of the longest palindrome inside its
raw text (exact characters, case-sensitive). Write `longestPalindrome`.
- *run checks*: every `longestPalindrome` row says `pass`.
- A comment above it: `// Time: O(?)  Space: O(?)  — why`.

**Stretch, not scored:** the accented row (`Ésope reste ici et se repose`).

## At the buzzer

Under each requirement in your comment, write `pass` or what's unmet. A requirement you name
as skipped scores better than one left blank.

**Don't open `AFTER-THE-TIMER.md` until the 35 minutes are up.**
