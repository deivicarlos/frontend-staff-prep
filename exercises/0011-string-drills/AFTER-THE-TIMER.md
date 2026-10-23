# After the timer: exercise 0011

Paste the `node check.mjs` output and your four Big-O comments.

| Problem | Pattern | Target |
| --- | --- | --- |
| 125 isPalindrome | Two pointers from both ends; skip non-alphanumerics in place | O(n) time, O(1) space. Cleaning into a new string is O(n) space. Say so. |
| 680 validPalindromeII | Two pointers; at the first mismatch, try skipping the left OR the right character, then check the rest once | O(n). Deleting each character and re-checking is O(n²). |
| 3 longest substring | Sliding window; a Map of each character's last index; move `left` only forward (`abba` catches `left` moving backwards) | O(n) time, O(alphabet) space |
| 5 longest palindrome | Expand around each centre, 2n − 1 of them (odd and even) | O(n²) time, O(1) space. Checking every substring is O(n³). |

Out loud: what's the one-sentence reason 680 is still O(n), even though it can check twice?
