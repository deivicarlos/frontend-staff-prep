// Write all four. No regex-free rule, use what you like. Run `node check.mjs` after each one.
// Done when the last line reads 12/12 pass. Each also has a large-input check: it fails if your
// solution is a power of n slower than it needs to be.
// After each, write its time and extra space as a comment, e.g. // O(n) time, O(1) space.

// 1 · Valid palindrome (LeetCode 125). Ignore everything but letters and digits; case-insensitive.
// isPalindrome("A man, a plan, a canal: Panama") → true · isPalindrome("race a car") → false
export function isPalindrome(s) {
  const regex = new RegExp(/[a-z0-9]/);
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    const charAtI = s[i].toLowerCase();
    const charAtJ = s[j].toLowerCase();

    if (!regex.test(charAtI)) {
      i++;
      continue;
    }

    if (!regex.test(charAtJ)) {
      j--;
      continue;
    }

    if (charAtI !== charAtJ) {
      return false;
    }

    i++;
    j--;
  }
  return true; // replace
}

// 2 · Valid palindrome II (LeetCode 680). True if s is a palindrome after deleting AT MOST one
// character. Lowercase letters only.
// validPalindromeII("abca") → true (delete "c") · validPalindromeII("abc") → false
export function validPalindromeII(s) {
  if (isPalindrome(s)) {
    return true;
  }

  const init = 0;
  const end = s.length;

  for (let i = 0; i <= s.length - 1; i++) {
    const first = s.slice(init, i);
    const last = s.slice(i + 1, end);
    const str = first + last;

    if (isPalindrome(str)) {
      return true;
    }
  }
  return false; // replace
}

// 3 · Longest substring without repeating characters (LeetCode 3). Return its length.
// lengthOfLongestSubstring("abcabcbb") → 3 ("abc") · ("pwwkew") → 3 ("wke")
export function lengthOfLongestSubstring(s) {
  let i = 0;
  let j = 1;

  const longest = new Set();

  for (let i = 0; i <= s.length - 1; i++) {}

  return 0; // replace
}

// 4 · Longest palindromic substring (LeetCode 5). Return the substring. On a tie, any one.
// longestPalindrome("babad") → "bab" or "aba" · longestPalindrome("cbbd") → "bb"
export function longestPalindrome(s) {
  return ""; // replace
}
