import { counter } from "./counter.ts";

// Keep the counter line as the first line of isPalindrome: the checks panel reads it.

export function isPalindrome(text: string): boolean {
  counter.calls++;

  const regex = RegExp(/[a-z0-9]/);
  let reverse = "";
  let cleanStr = "";

  for (let i = text.length - 1; i >= 0; i--) {
    const ch = text[i].toLowerCase();

    if (regex.test(ch)) {
      reverse += ch;
      cleanStr = ch + cleanStr;
    }
  }

  return reverse === cleanStr;
  // throw new Error(`not implemented (${text.length} chars)`);
}

export function longestPalindrome(text: string): string {
  throw new Error(`not implemented (${text.length} chars)`);
}
