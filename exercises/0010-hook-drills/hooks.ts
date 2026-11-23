// Write the three hooks. No libraries. Run `npm test` after each one (`npm run watch` reruns on save).
// Done when every test passes. With the stubs, most fail.
import { useCallback, useEffect, useRef, useState } from "react";

// 1 · useDebouncedValue(value, ms)
// Returns `value`, but only once it has stopped changing for `ms`. The first render returns
// the initial value right away. Nothing may still be pending after unmount.
export function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, ms);

    return () => {
      clearTimeout(id);
    };
  }, [value, ms]);

  return debounced; // replace
}

// 2 · useDebouncedCallback(fn, ms)
// Returns a function that calls `fn` once, `ms` after its last call, with that call's
// arguments. It always calls the `fn` from the LATEST render, not the first. It keeps the same
// identity across renders (safe in deps). A call still pending at unmount never runs.
export function useDebouncedCallback<A extends unknown[]>(
  fn: (...args: A) => void,
  ms: number,
): (...args: A) => void {
  // const refFn = useRef<(...args: A) => void>(fn);

  const _fn = useCallback((...args: A) => fn(...args), [fn]);

  const debouncedFn: (...args: A) => void = useCallback(
    (...args: A) => {
      const id = setTimeout(() => {
        _fn(...args);
      }, ms);

      return () => {
        clearTimeout(id);
      };
    },
    [_fn, ms],
  );

  return debouncedFn;
}
// 3 · useSearch(query, fetcher)
// Fetches `fetcher(query)` whenever `query` changes. Returns { data, error, loading }.
// - query "" → no request; { data: null, error: null, loading: false }.
// - While a request is in flight, loading is true.
// - Only the response for the CURRENT query may reach the screen: a slow response for an old
//   query, success or failure, is dropped.
// - A failure for the current query sets error (the thrown Error) and loading false.
export type SearchState<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

export function useSearch<T>(
  query: string,
  fetcher: (q: string) => Promise<T>,
): SearchState<T> {
  const [state, setState] = useState<{
    data: T | null;
    error: Error | null;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    let inFlight = true;

    async function fetch() {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const data: T = await fetcher(query);

        if (inFlight) {
          setState((prev) => ({ ...prev, loading: false, data }));
        }
      } catch (err) {
        if (inFlight) {
          setState((prev) => ({
            ...prev,
            error: err as Error,
            loading: false,
          }));
        }
      }
    }

    fetch();

    return () => {
      inFlight = false;
    };
  }, [query]);

  return { ...state }; // replace
}

// Then say out loud: why does #2 need a ref, and which line of #3 is the guard that #3's
// "old failure is dropped" check tests?
