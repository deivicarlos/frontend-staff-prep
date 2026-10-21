import { counter } from "./counter.ts";

// Keep the counter line as the first line of isPalindrome: the checks panel reads it.

export function isPalindrome(text: string): boolean {
  counter.calls++;
  throw new Error(`not implemented (${text.length} chars)`);
}

export function longestPalindrome(text: string): string {
  throw new Error(`not implemented (${text.length} chars)`);
}
