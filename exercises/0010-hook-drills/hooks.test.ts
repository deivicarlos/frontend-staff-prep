// Not yours. Run: npm test
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedCallback, useDebouncedValue, useSearch } from "./hooks";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

// A fetcher whose responses land after `ms` (fake time). Fails when the query starts with "!".
const after = (ms: number) =>
  vi.fn(
    (q: string) =>
      new Promise<string>((res, rej) =>
        setTimeout(() => (q.startsWith("!") ? rej(new Error(`fail ${q}`)) : res(`result ${q}`)), ms),
      ),
  );
// Latency by query, so an older query can land after a newer one.
const byQuery = (latency: Record<string, number>) =>
  vi.fn(
    (q: string) =>
      new Promise<string>((res, rej) =>
        setTimeout(
          () => (q.startsWith("!") ? rej(new Error(`fail ${q}`)) : res(`result ${q}`)),
          latency[q] ?? 50,
        ),
      ),
  );
const tick = (ms: number) => act(() => vi.advanceTimersByTimeAsync(ms));

describe("1 · useDebouncedValue", () => {
  it("returns the initial value on the first render", () => {
    const { result } = renderHook(() => useDebouncedValue("a", 300));
    expect(result.current).toBe("a");
  });

  it("holds the old value while changes keep coming, then shows the last one", async () => {
    const { result, rerender } = renderHook(({ v }) => useDebouncedValue(v, 300), {
      initialProps: { v: "a" },
    });
    rerender({ v: "ab" });
    await tick(200);
    rerender({ v: "abc" });
    await tick(200);
    expect(result.current).toBe("a"); // 400 ms total, but only 200 since the last change
    await tick(100);
    expect(result.current).toBe("abc");
  });

  it("leaves no timer pending after unmount", async () => {
    const { rerender, unmount } = renderHook(({ v }) => useDebouncedValue(v, 300), {
      initialProps: { v: "a" },
    });
    rerender({ v: "b" });
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("2 · useDebouncedCallback", () => {
  it("calls once, ms after the last call, with the last call's arguments", async () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(fn, 300));
    result.current("h");
    await tick(100);
    result.current("he");
    await tick(299);
    expect(fn).not.toHaveBeenCalled();
    await tick(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("he");
  });

  it("keeps the same function identity across renders", () => {
    const { result, rerender } = renderHook(({ fn }) => useDebouncedCallback(fn, 300), {
      initialProps: { fn: () => {} },
    });
    const first = result.current;
    rerender({ fn: () => {} });
    expect(result.current).toBe(first);
  });

  it("calls the fn from the latest render, not the first (the 0007 saveLater bug)", async () => {
    const saves: string[] = [];
    const { result, rerender } = renderHook(
      ({ id }) => useDebouncedCallback((text: string) => saves.push(`${id}:${text}`), 300),
      { initialProps: { id: "T-101" } },
    );
    rerender({ id: "T-104" });
    result.current("hello");
    await tick(300);
    expect(saves).toEqual(["T-104:hello"]);
  });

  it("never runs a call that is still pending at unmount", async () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(() => useDebouncedCallback(fn, 300));
    result.current("x");
    unmount();
    await tick(500);
    expect(fn).not.toHaveBeenCalled();
  });
});

describe("3 · useSearch", () => {
  it('does not fetch for ""', async () => {
    const fetcher = after(50);
    const { result } = renderHook(() => useSearch("", fetcher));
    await tick(100);
    expect(fetcher).not.toHaveBeenCalled();
    expect(result.current).toEqual({ data: null, error: null, loading: false });
  });

  it("is loading while in flight, then shows the data", async () => {
    const { result } = renderHook(() => useSearch("cat", after(50)));
    await tick(0);
    expect(result.current.loading).toBe(true);
    await tick(50);
    expect(result.current).toEqual({ data: "result cat", error: null, loading: false });
  });

  it("two in flight: r (slow) then refund (fast). The screen ends on refund", async () => {
    const fetcher = byQuery({ r: 300, refund: 50 });
    const { result, rerender } = renderHook(({ q }) => useSearch(q, fetcher), {
      initialProps: { q: "r" },
    });
    await tick(10);
    rerender({ q: "refund" });
    await tick(50); // refund lands
    expect(result.current.data).toBe("result refund");
    await tick(300); // r lands late
    expect(result.current).toEqual({ data: "result refund", error: null, loading: false });
  });

  it("a failure for the current query sets error and stops loading", async () => {
    const { result } = renderHook(() => useSearch("!boom", after(50)));
    await tick(50);
    expect(result.current.error?.message).toBe("fail !boom");
    expect(result.current.loading).toBe(false);
  });

  it("an OLD query's failure is dropped (the abort-without-guard bug)", async () => {
    const fetcher = byQuery({ "!old": 300, new: 50 });
    const { result, rerender } = renderHook(({ q }) => useSearch(q, fetcher), {
      initialProps: { q: "!old" },
    });
    await tick(10);
    rerender({ q: "new" });
    await tick(400);
    expect(result.current).toEqual({ data: "result new", error: null, loading: false });
  });

  it("a new query clears the previous query's error", async () => {
    const { result, rerender } = renderHook(({ q }) => useSearch(q, after(50)), {
      initialProps: { q: "!boom" },
    });
    await tick(50);
    rerender({ q: "ok" });
    await tick(50);
    expect(result.current).toEqual({ data: "result ok", error: null, loading: false });
  });
});
