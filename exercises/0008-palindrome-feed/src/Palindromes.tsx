import { useDeferredValue, useMemo, useState, memo } from "react";
import { submissions, type Submission } from "./data.ts";
import { isPalindrome } from "./palindrome.ts";

/*
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


*/

const palindromeSubmissions = submissions.reduce((acc, curr) => {
  if (isPalindrome(curr.text)) {
    return [...acc, curr];
  }

  return acc;
}, [] as Submission[]);

type ResultsTableProps = {
  query: string;
  showPalindromes: boolean;
};

function ResultsTable({ query, showPalindromes }: ResultsTableProps) {
  const filteredPalindromes = useMemo(() => {
    if (showPalindromes) {
      return palindromeSubmissions.reduce((acc, curr) => {
        if (curr.text.toLowerCase().includes(query.toLowerCase())) {
          return [...acc, curr];
        }

        return acc;
      }, [] as Submission[]);
    }

    return submissions.reduce((acc, curr) => {
      if (curr.text.toLowerCase().includes(query.toLowerCase())) {
        return [...acc, curr];
      }

      return acc;
    }, [] as Submission[]);
  }, [query, showPalindromes]);

  return (
    <table className="checks">
      <tbody>
        {filteredPalindromes.map(({ id, player, text }) => {
          return (
            <tr key={id}>
              <td>{`id: ${id} - player: ${player} - text: ${text}`} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const MemoResultsTable = memo(ResultsTable);

export function Palindromes() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [showPalindromes, setShowPalindromes] = useState(false);

  return (
    <div className="muted">
      <p>Start here. {submissions.length} submissions loaded.</p>
      <div>
        <input
          type="text"
          placeholder="Search for items here..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <input
          id="showPalindromes"
          type="checkbox"
          checked={showPalindromes}
          onChange={(e) => setShowPalindromes(e.target.checked)}
        />
        <label htmlFor="showPalindromes">Show Palindromes</label>
      </div>
      <MemoResultsTable
        query={deferredQuery}
        showPalindromes={showPalindromes}
      />
    </div>
  );
}
