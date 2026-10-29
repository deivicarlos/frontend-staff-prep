// Write the three hooks. No libraries. Run `npm test` after each one (`npm run watch` reruns on save).
// Done when every test passes. With the stubs, most fail.
import { ErrorInfo, useCallback, useEffect, useRef, useState } from "react";

// 1 · useDebouncedValue(value, ms)
// Returns `value`, but only once it has stopped changing for `ms`. The first render returns
// the initial value right away. Nothing may still be pending after unmount.
export function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value);
    }, ms);

    return () => {
      clearTimeout(timerId);
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
  const ref = useRef(fn);
  const timeRef = useRef(0);

  useEffect(() => {
    ref.current = fn;
  });

  const debouncedFunction = useCallback(
    (...args: A) => {
      clearTimeout(timeRef.current);

      timeRef.current = setTimeout(() => {
        ref.current(...args);
      }, ms);
    },
    [ms],
  );

  useEffect(() => {
    return () => clearTimeout(timeRef.current);
  }, []);

  return debouncedFunction; // replace
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
  const initialState: SearchState<T> = {
    data: null,
    error: null,
    loading: false,
  };

  const [searchState, setSearchState] = useState<SearchState<T>>(initialState);

  const _fetcher = useCallback((q: string) => fetcher(q), [fetcher]);

  useEffect(() => {
    if (!query) {
      setSearchState(initialState);
      return;
    }

    let isCurrent = true;

    async function performFetch() {
      try {
        setSearchState((prev) => ({ ...prev, loading: true, error: null }));

        const dt = await _fetcher(query);

        if (isCurrent) {
          setSearchState((prev) => ({ ...prev, data: dt, loading: false }));
        }
      } catch (err) {
        if (isCurrent) {
          setSearchState((prev) => ({
            ...prev,
            error: err as Error,
            loading: false,
          }));
        }
      }
    }

    performFetch();

    return () => {
      isCurrent = false;
    };
  }, [query]);

  return { ...searchState }; // replace
}

// Then say out loud: why does #2 need a ref, and which line of #3 is the guard that #3's
// "old failure is dropped" check tests?
