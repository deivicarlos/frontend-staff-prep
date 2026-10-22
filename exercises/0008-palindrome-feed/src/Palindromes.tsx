import { memo, useDeferredValue, useMemo, useState } from "react";
import { submissions, type Submission } from "./data.ts";
import { isPalindrome } from "./palindrome.ts";

/*
  Requirements (copy them here before the clock):

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

*/

const palindromeSubmissions: ProcessedSubmission[] = submissions.reduce(
  (acc, curr) => {
    if (isPalindrome(curr.text)) {
      acc.push({ ...curr, result: "PASS" });
      return acc;
    }

    acc.push({ ...curr, result: "FAILED" });
    return acc;
  },
  [] as ProcessedSubmission[],
);

type ProcessedSubmission = Submission & {
  result: "PASS" | "FAILED";
};

type ResultsTableProps = {
  query: string;
  showP: boolean;
};

function ResultsTable({ query, showP }: ResultsTableProps) {
  const filteredSubs = useMemo(() => {
    if (!query) {
      return palindromeSubmissions;
    }

    return palindromeSubmissions.filter(({ text }) => {
      return text.toLowerCase().includes(query.toLowerCase());
    });
  }, [query]);

  const results = useMemo(() => {
    if (!showP) {
      return filteredSubs;
    }

    return filteredSubs.filter(({ result }) => result === "PASS");
  }, [showP, filteredSubs]);

  return (
    <div>
      <p>{`Total items: ${results.length}`}</p>
      <table>
        <tbody>
          {results.map(({ id, text, player, result }) => {
            return (
              <tr key={`${id}}`}>
                <td>{player}</td>
                <td>{text}</td>
                <td>{result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const MemoResultsTable = memo(ResultsTable);

export function Palindromes() {
  const [query, setQuery] = useState("");
  const [showP, setShowP] = useState(false);
  const [phrase, setPhrase] = useState("");
  const deferredQuery = useDeferredValue(query);
  const deferredShowP = useDeferredValue(showP);

  const isPhrasePalindrome = useMemo(() => isPalindrome(phrase), [phrase]);

  return (
    <div>
      <p className="muted">
        Start here. {submissions.length} submissions loaded.
      </p>
      <p role="status">
        {isPhrasePalindrome ? "Palindrome" : "Not a palindrome"}
      </p>

      <div>
        <input
          id="phrase"
          type="text"
          placeholder="Phrase"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
        <label htmlFor="phrase">Phrase</label>
      </div>

      <input
        type="text"
        placeholder=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <input
        id="showPalindromes"
        type="checkbox"
        checked={showP}
        onChange={(e) => setShowP(e.target.checked)}
      />

      <label htmlFor="showPalindromes">Only Palindromes</label>

      <MemoResultsTable query={deferredQuery} showP={deferredShowP} />
    </div>
  );
}
