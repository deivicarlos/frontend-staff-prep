import { counter } from "./counter.ts";

// Keep the counter line as the first line of isPalindrome: the checks panel reads it.

export function isPalindrome(text: string): boolean {
  counter.calls++;

  const regex = RegExp(/[a-z0-9]/);
  let i = 0;
  let j = text.length - 1;

  while (i < j) {
    const charAtI = text[i].toLowerCase(); // text[i]
    const charAtJ = text.charAt(j).toLowerCase();

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

  return true;
}

export function longestPalindrome(text: string): string {
  throw new Error(`not implemented (${text.length} chars)`);
}
