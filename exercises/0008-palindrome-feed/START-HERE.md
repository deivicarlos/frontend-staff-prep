# Exercise 0008: palindrome feed (build from scratch)

**35 minutes, then about 15 to paste and grade. Plan 50. Six requirements, which don't all fit,
and that's deliberate.**

This is Friday's format: a palindrome problem in React, then "how fast is it, and can you make it
faster?". **Talk out loud the whole time, as you would on the call.** Before you write each
function, say its time and space complexity, and say it again once it works. No AI and no docs.
MDN is fine for one API lookup; say which one.

```sh
npm install
npm run dev
```

**Palindrome Cup** is a word game. Players submit phrases, and a palindrome scores. Your files
are `src/palindrome.ts` and `src/Palindromes.tsx`, and you can add more. `data.ts` (20,000
submissions), `counter.ts` and `main.tsx` are not yours and are correct. The **Checks** panel at
the top runs fixed cases against your functions, counts every `isPalindrome` call (keep the
counter line in it), and shows the true palindrome count. In dev, StrictMode runs each `useMemo`
calculation twice, so the counter's load-time number is doubled. Only its value after **reset
counter** matters.

## Protocol

1. Before the clock, copy the six requirements into the comment block in `Palindromes.tsx`.
2. Finish each requirement against its done-condition before moving on to the next one.
3. Budget the clock. Take one cheap pass first: sketch the component tree and name the
   algorithm before you go deep on anything.
4. At the buzzer, write under each requirement in that comment: pass, or what's unmet. A
   requirement you name as skipped scores better than one left untouched without a word.

## Requirements

A requirement scores **1 only if its done-condition passes** when re-run.

**1 · Does it score?** A player types a phrase and wants to know whether it's a palindrome. Case,
spaces and punctuation don't count. Letters and digits do.
**Done when:** *run checks* shows every `isPalindrome` row as pass (the *stretch* row may fail),
and the verdict on screen differs between `Never odd or even` and `Never odd or evens`.

**2 · Someone pasted a novel.** Some players paste whole books. A reviewer left a comment on the
first version: "this makes several full copies of the text before it compares a single
character."
**Done when:** `isPalindrome` makes no copy of its input (no `replace`, `split`, `reverse`,
`join`, spread, or whole-string `toLowerCase`), the checks still pass, and a comment above it
states its time and space complexity.

**3 · The feed stutters.** Moderators see every submission, with a search box and a *palindromes
only* toggle. They say typing in the search stutters.
**Done when:** click *reset counter*, type `radar` into the search, then toggle *palindromes
only* on, off, on. The counter still reads **0**.

**4 · The feed freezes on open.** Opening the feed locks the tab for a moment.
**Done when:** `document.querySelectorAll("#feed li").length` in the console is at most 200 with
any filter, and the screen says how many submissions match in total. With *palindromes only* on
and an empty search, that number equals the Truth line.

**5 · A moderator uses a screen reader.** They need to hear the verdict from requirement 1 as
they type.
**Done when:** in the DevTools Accessibility pane, the phrase input has a non-empty *Name*, and
the verdict sits in a live region that is already in the DOM on page load, before any text is
typed.

**6 · Partial credit.** A non-palindrome scores the length of the longest palindromic run inside
it, taken from the raw text (exact characters, case-sensitive). Write `longestPalindrome`.
**Done when:** every `longestPalindrome` row passes, and a comment above it states its time and
space complexity.

**Stretch, not scored:** the accented row (`Ésope reste ici et se repose`).

**Do not open `AFTER-THE-TIMER.md` until the 35 minutes are up.**

---

## Redo (20 minutes, added 10-21): exactly what the screen shows

Same folder, same code. Keep what you have and change only what's listed. When you're done,
the page reads top to bottom like this. The text must match; the styling doesn't matter.

**Checks panel** (already there): after *run checks*, every `isPalindrome` row and every
`longestPalindrome` row says `pass`.

**Phrase checker** (requirements 1 and 5), above the feed:

```
Phrase [__________________]        ← an <input>; its label text is "Phrase"
Palindrome                         ← verdict line
```

- Empty input: the verdict line is empty, but the element is still on the page.
- Typing `Never odd or even` shows `Palindrome`. Adding an `s` shows `Not a palindrome`.
- Done when DevTools → Elements shows the verdict element on load (empty) with
  `role="status"`, and DevTools → Accessibility shows the input's *Name* as `Phrase`.

**Feed** (requirements 3 and 4), below it:

```
Search [__________]  [x] Palindromes only      ← search label text is "Search"
3956 matches                                    ← the TOTAL that match, not the rows shown
<ul id="feed">
  #8 · bo · wow                                ← first row with the toggle on; format: #id · player · text
  …at most 100 rows…
</ul>
```

- Toggle on with an empty search: the count reads `3956 matches`, the same as the Truth line.
- Type `radar`: the count drops, and the rows all contain "radar".
- Console: `document.querySelectorAll("#feed li").length` is `100` or less, and never 20000.
- Counter check unchanged: *reset counter*, type `radar`, toggle on, off, on → `isPalindrome
  calls: 0`.

**Code** (requirements 2 and 6): a comment above `isPalindrome` and above `longestPalindrome`
in this form:

```ts
// Time: O(?)  Space: O(?)  — one line on why
```

`isPalindrome` builds no new string. The feed filters use no spread inside `reduce`.
