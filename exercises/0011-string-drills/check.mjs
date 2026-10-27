// Not yours. Run: node check.mjs
import {
  isPalindrome,
  validPalindromeII,
  lengthOfLongestSubstring,
  longestPalindrome,
} from "./strings.mjs";

const results = [];
function check(name, fn) {
  try {
    const got = fn();
    results.push([
      got === true ? "pass" : "FAIL",
      name,
      got === true ? "" : got,
    ]);
  } catch (e) {
    results.push(["FAIL", name, `threw ${e?.message ?? e}`]);
  }
}
const cases = (f, rows) => {
  for (const [input, want] of rows) {
    const got = f(input);
    const ok = Array.isArray(want) ? want.includes(got) : got === want;
    if (!ok)
      return `${f.name}(${JSON.stringify(input).slice(0, 40)}) → ${JSON.stringify(got)}, want ${JSON.stringify(want)}`;
  }
  return true;
};
const timed = (f, input, limitMs, want) => {
  const t = performance.now();
  const got = f(input);
  const d = performance.now() - t;
  if (want !== undefined && got !== want)
    return `large input → ${JSON.stringify(got).slice(0, 40)}, want ${JSON.stringify(want).slice(0, 40)}`;
  return (
    d < limitMs || `large input took ${d.toFixed(0)} ms (limit ${limitMs})`
  );
};
const half = (n) =>
  Array.from({ length: n }, (_, i) =>
    String.fromCharCode(97 + ((i * 7) % 26)),
  ).join("");
const rev = (s) => [...s].reverse().join("");

check("1 · isPalindrome: the examples", () =>
  cases(isPalindrome, [
    ["A man, a plan, a canal: Panama", true],
    ["race a car", false],
  ]),
);
check("1 · isPalindrome: edge cases", () =>
  cases(isPalindrome, [
    [" ", true],
    ["", true],
    ["0P", false],
    ["ab_a", true],
    [".,", true],
    ["a.", true],
    ["Aa", true],
    ["1b1", true],
    ["12", false],
  ]),
);
check("1 · isPalindrome: 2,000,000 chars", () => {
  const h = half(1_000_000);
  return timed(isPalindrome, h + rev(h).toUpperCase(), 300, true);
});

check("2 · validPalindromeII: the examples", () =>
  cases(validPalindromeII, [
    ["abca", true],
    ["abc", false],
    ["aba", true],
  ]),
);
check("2 · validPalindromeII: the deletion can be on either side", () =>
  cases(validPalindromeII, [
    ["deeee", true],
    ["eeeed", true],
    ["cbbcc", true],
    ["ebcbbececabbacecbbcbe", true],
    ["abccdba", true],
    ["abcddcbea", true],
    ["abcdeba", false],
    ["", true],
    ["a", true],
  ]),
);
check("2 · validPalindromeII: 40,000 chars, one extra in the middle", () => {
  const h = half(20_000);
  return timed(validPalindromeII, h + "z" + "q" + rev(h), 200, true);
});

check("3 · lengthOfLongestSubstring: the examples", () =>
  cases(lengthOfLongestSubstring, [
    ["abcabcbb", 3],
    ["bbbbb", 1],
    ["pwwkew", 3],
  ]),
);
check("3 · lengthOfLongestSubstring: edge cases", () =>
  cases(lengthOfLongestSubstring, [
    ["", 0],
    [" ", 1],
    ["au", 2],
    ["dvdf", 3],
    ["abba", 2],
    ["tmmzuxt", 5],
  ]),
);
check("3 · lengthOfLongestSubstring: 40,000 chars, windows of 20,000", () => {
  const block = Array.from({ length: 20_000 }, (_, i) =>
    String.fromCharCode(0x4e00 + i),
  ).join("");
  return timed(lengthOfLongestSubstring, block + block, 200, 20_000);
});

check("4 · longestPalindrome: the examples", () =>
  cases(longestPalindrome, [
    ["babad", ["bab", "aba"]],
    ["cbbd", "bb"],
  ]),
);
check("4 · longestPalindrome: edge cases", () =>
  cases(longestPalindrome, [
    ["a", "a"],
    ["ac", ["a", "c"]],
    ["bb", "bb"],
    ["forgeeksskeegfor", "geeksskeeg"],
    ["abacdfgdcaba", ["aba", "aca"]],
    ["aaaa", "aaaa"],
  ]),
);
check("4 · longestPalindrome: 3,000 chars", () => {
  const h = half(1_000);
  return timed(
    longestPalindrome,
    h + "x" + rev(h) + half(999),
    300,
    h + "x" + rev(h),
  );
});

for (const [status, name, why] of results)
  console.log(`${status}  ${name}${why ? `\n        ${why}` : ""}`);
console.log(
  `\n${results.filter(([s]) => s === "pass").length}/${results.length} pass`,
);
