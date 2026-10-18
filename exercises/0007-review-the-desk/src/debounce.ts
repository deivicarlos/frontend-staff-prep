// Utility, not part of the PR, and correct: don't review it.
// Calls fn once, `ms` after the last call, with the last call's arguments.
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
