# Exercise 0007: evaluation

**0 of 3** (2026-10-22). It wasn't run, and there's no ranked comment list or top comment.
His three-question pass covers 3 of the 6 effects and handlers. It never reached
`saveLater`, `handleDraftChange` or `handleSend`.

| # | Score | Cause |
| --- | --- | --- |
| 1 · `saveLater` saves to the first ticket (L87–88) | 0 | Not reviewed. |
| 2 · Search race (`handleSearch`, L29–34) | 0 | Right line and a working fix (an effect on `query` with abort, plus debounce). But his "it breaks when…" is "it doesn't cancel the ongoing call", which isn't a sequence or something the agent sees. He never says that the `?q=r` response lands after `?q=refund` and the list shows all 6. He matched on a missing abort, and didn't trace the order. One sentence away from a 1. |
| 3 · Failed send shows "Reply sent" and wipes the draft (L117–131) | 0 | Not reviewed. |

## Wrong claims (worse in an interview than a miss)

1. **Mount effect, L18–26: "the ignore flag is unnecessary, it only runs once".** False. Cleanup
   runs on unmount and, in StrictMode, between the two mount runs. The flag turns a response
   that lands after cleanup into a no-op. Removing it is a regression.
2. **Ticket effect, L91–109: "needs abort; the slowest one will be the last to render, so an
   older ticket shows".** False. The `ignore` flag already prevents exactly that. Click A then B:
   the cleanup for A runs before the effect for B, so A's response finds `ignore === true` and
   is dropped. He described the bug that the flag he wanted to delete prevents. Abort is a
   nice-to-have (it saves bandwidth), but not a correctness fix.
3. "On the return function you clean the ticket, failed and sent": a misread. Those resets
   run at the **start** of the effect (L93–95). The return function only sets `ignore`.

## Placement

The fix he reaches for (an effect keyed on the query, cancellation, debounce) is the right
shape. It went onto the one effect that was already correct, and stayed off the handler that
needed it.
