# Exercise 0005: evaluation

**4 of 6** under binary scoring, checked by a browser script against each done-condition. The
buzzer table was left empty, so both misses are **silent**.

| # | Score | Cause |
| --- | --- | --- |
| 1 · list empty | 1 | Fixed both layers: the path, then `json.items`. |
| 2 · filters | 1 | `["devices", { status }]`. Also left a stray `useEffect(() => { fetchDevices(status) }, [status])`: it fires a second, uncancelled GET on every filter change and discards the result. It doesn't fail the check, but a reviewer would flag it. |
| 3 · row identity | 1 | `key={device.id}`. |
| 4 · toggle | 0 | **Right place, wrong scope.** The invalidation is in `onSuccess`, which is correct, but its key is `["devices", { status }]`, so only the current filter refetches. *all* still shows cam-05 as online. `["devices"]` as a prefix fixes it. |
| 5 · outage | 0 | Not attempted. He reported he "didn't understand requirement #5 and the message". `fetchDevices` still doesn't throw on `!res.ok`, and there is no `isError` branch. |
| 6 · detail panel | 1 | **Placement correct on the first attempt:** the controller is in the effect body, `abort()` is in the cleanup, and both `catch` and `finally` are guarded. The unguarded `finally` took three passes in the sheet-1 rewrite (LR-0011). |

## Placement

- Controller and `finally` guard: both correct, under a clock, unprompted.
- Invalidation: placed in `onSuccess`, not the click handler. It was the key scope that was
  wrong, not the placement.

## Protocol

- Requirements transcribed: yes, verbatim.
- Buzzer table: empty. Requirements 4 and 5 are unnamed.
- Requirement 5 was not understood and no question was asked about it during the clock.
