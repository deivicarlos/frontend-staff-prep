# Placement lands under a clock; a scenario requirement still doesn't become a task

Exercise 0005, 2026-09-26. **4/6 binary** on a chained-bug TanStack Query app, in 25 min.
See [the evaluation](../exercises/0005-device-list/EVALUATION.md).

## Finding 1: the async placement from LR-0011 transferred

The detail panel came back with the controller in the effect body, `abort()` in the cleanup,
and `finally` guarded, on the first attempt under a clock. In the sheet-1 rewrite the same
guard took three passes and a named line ([LR-0011](0011-placement-is-the-thin-layer.md)
finding 2). Stop treating the request-effect placement as open. The *ordering model* (why the
guard is needed) is still unmeasured; lesson 4 keeps that.

## Finding 2: TanStack cache identity is the new identity surface

`queryKey: ["devices", { status }]` was right. The invalidation key copied it exactly, which
scoped the refetch to one filter. He knows keys identify cache entries, but not that
`invalidateQueries` matches by **prefix**, so the broader key is the one to use. This is the
same family as [LR-0003](0003-identity-is-the-gap.md), on a new API. A stray
`useEffect(() => fetchDevices(status))` suggests he didn't trust the key change to refetch.
That hasn't been asked yet.

## Finding 3: "the operator needs to know" did not convert, again

Requirement 5 was phrased as a scenario, the same way as in 0003 ([LR-0009](0009-the-re-read-is-the-load-bearing-step.md)
finding 3). He reported he "didn't understand requirement #5 and the message", asked nothing
during the clock, and left the buzzer table empty. It's the third instance. The miss isn't the
error-handling technique (he wrote a correct guarded `catch` in the same session). The miss is
turning "the user needs to know" into "render an error state". In a live screen, the move is to
ask the interviewer, and that costs ten seconds.

**Keep writing scenario requirements.** Add a standing protocol line: *a requirement you can't
turn into a task in one pass is a question to ask, not one to skip.*
