# After the timer: exercise 0005

Reload, re-run each done-condition in the browser now, and **paste what you see**: the log
lines, plus the list or panel text where the condition is about the screen. Don't tick boxes.
A requirement with no pasted output scores 0.

Scoring is binary: 1 if the done-condition passes, 0 if it doesn't. Separately, every
requirement is marked **named** or **silent**, depending on whether your buzzer table in
`DeviceList.tsx` says what is unmet.

## Paste back

For each of the six, give the log and screen output, and your one-line fix from the buzzer
table.

## What each one was

**1 · List empty: `api.ts`, `fetchDevices`.** There were two bugs in a chain. The path was
`/api/device`, which returned 404. Once the path is fixed the log shows 200 and the list is
still empty, because the body is `{ items, total }` and the code read `json.devices`. The
second bug only shows up after the first is fixed. Did your one-line fix name both?

**2 · Filters: `DeviceList.tsx`, the `useQuery` call.** The `queryKey` was `["devices"]` and
didn't include `status`, so every filter shared one cache entry and nothing refetched. The fix
is `["devices", status]`. Calling `refetch()` from the click handler doesn't count: it runs
the stale closure's `queryFn`, and the double-click check catches it.

**3 · Wrong device expanded: the `key` on `<DeviceRow>`.** It was `key={i}`, so the expanded
state belonged to the row position and not to the device. The fix is `key={device.id}`. This
bug can't be seen until requirement 2 is fixed, because the list never changes before that.

**4 · Toggle doesn't stick: `useMutation` in `DeviceList.tsx`.** Nothing invalidated the list,
and `staleTime: 60_000` means nothing refetches on its own. The graded point is where the
invalidation goes:

- Passes: `onSuccess` (or `onSettled`) on the mutation, calling
  `invalidateQueries({ queryKey: ["devices"] })`. The prefix covers every filter's cache entry.
- Fails: `mutate(d)` followed by `invalidateQueries(...)` in the click handler. The GET starts
  while the PATCH is still in flight and reads the old status. The log's times show it.
- Fails: invalidating only `["devices", status]`. *all* stays stale.

**5 · Outage: two layers.** `fetchDevices` never checked `res.ok`, so a 500 went through
`res.json()` and returned `undefined`. TanStack then raised its own "data is undefined" error in
the console. The component also had no error branch. Both need fixing: `throw` on `!res.ok` in
`api.ts`, and render `isError` in the list. If you rendered the error without the throw, the
message on screen is TanStack's, the console has an error, and the requirement fails.

**6 · Detail panel: `DeviceDetail.tsx`. This is the placement check.** There were two bugs,
and fixing the first reveals the second:

1. The `AbortController` was created *inside* `load()`, and the cleanup was `() => {}`. The
   cleanup couldn't reach the controller, so nothing was ever aborted and cam-01's answer
   landed in the panel. The fix is to create it in the effect body and return
   `() => controller.abort()`.
2. `finally` sets `isLoading(false)` without a guard. Once cam-01 is aborted, its `finally`
   runs as a microtask **after** gw-08's effect has set loading to `true`, so the spinner drops
   while gw-08 is still in flight. The fix is `if (!controller.signal.aborted)` in the
   `finally`. Adding `setIsLoading(false)` to the cleanup doesn't fix it (LR-0011).

Moving this panel onto `useQuery` with `queryKey: ["device", id]` also passes, and it's the
answer a Staff candidate should at least mention.

## Two questions

1. Which requirement did you pass over on your cheap pass, and why that one?
2. In `DeviceDetail`, `device`, `isLoading` and `error` are three separate states. Name a
   combination the panel can render that should be impossible, and what type would rule it
   out.
