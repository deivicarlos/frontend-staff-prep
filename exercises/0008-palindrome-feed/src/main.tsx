import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Palindromes } from "./Palindromes.tsx";
import { counter } from "./counter.ts";
import { isPalindrome, longestPalindrome } from "./palindrome.ts";
import "./index.css";

// Not yours: the page shell and the checks panel.

const PALINDROME_CASES: [string, boolean][] = [
  ["A man, a plan, a canal: Panama", true],
  ["race a car", false],
  ["", true],
  [" ", true],
  ["a.", true],
  ["Aa", true],
  ["0P", false],
  ["ab_a", true],
  ["Was it a car or a cat I saw?", true],
  ["No 'x' in Nixon", true],
  ["12321", true],
  ["123210", false],
];

const STRETCH_CASE: [string, boolean] = ["Ésope reste ici et se repose", true];

// Expected length of the longest palindromic substring (exact characters, case-sensitive).
const LONGEST_CASES: [string, number][] = [
  ["babad", 3],
  ["cbbd", 2],
  ["forgeeksskeegfor", 10],
  ["abacdfgdcaba", 3],
  ["a", 1],
  ["", 0],
];

// How many of the 20,000 submissions are palindromes under the rule in requirement 1.
const TRUE_PALINDROME_COUNT = 3956;

type Row = { label: string; input: string; expected: string; got: string; pass: boolean };

function attempt<T>(fn: () => T): T | Error {
  try {
    return fn();
  } catch (e) {
    return e instanceof Error ? e : new Error(String(e));
  }
}

function runChecks(): Row[] {
  const rows: Row[] = [];
  for (const [label, [input, expected]] of [
    ...PALINDROME_CASES.map((c) => ["isPalindrome", c] as const),
    ["isPalindrome (stretch)", STRETCH_CASE] as const,
  ]) {
    const got = attempt(() => isPalindrome(input));
    rows.push({
      label,
      input,
      expected: String(expected),
      got: got instanceof Error ? got.message : String(got),
      pass: got === expected,
    });
  }
  for (const [input, length] of LONGEST_CASES) {
    const got = attempt(() => longestPalindrome(input));
    const pass =
      typeof got === "string" &&
      got.length === length &&
      input.includes(got) &&
      [...got].reverse().join("") === got;
    rows.push({
      label: "longestPalindrome",
      input,
      expected: `length ${length}`,
      got: got instanceof Error ? got.message : JSON.stringify(got),
      pass,
    });
  }
  return rows;
}

function ChecksPanel() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [calls, setCalls] = useState(counter.calls);

  useEffect(() => {
    const id = setInterval(() => setCalls(counter.calls), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="checks">
      <header>
        <h2>Checks</h2>
        <span className="counter" data-testid="calls">
          isPalindrome calls: {calls.toLocaleString("en-US")}
        </span>
        <button type="button" onClick={() => (counter.calls = 0)}>
          reset counter
        </button>
        <button type="button" onClick={() => setRows(runChecks())}>
          run checks
        </button>
      </header>
      <p className="muted">
        Truth: {TRUE_PALINDROME_COUNT.toLocaleString("en-US")} of 20,000 submissions are
        palindromes.
      </p>
      {rows && (
        <table>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} data-testid="check">
                <td className={r.pass ? "pass" : "fail"}>{r.pass ? "pass" : "FAIL"}</td>
                <td>{r.label}</td>
                <td>
                  <code>{JSON.stringify(r.input)}</code>
                </td>
                <td>expected {r.expected}</td>
                <td>got {r.got}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function App() {
  return (
    <main>
      <h1>Palindrome Cup</h1>
      <ChecksPanel />
      <Palindromes />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
