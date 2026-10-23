# Exercise 0007: evaluation

**1 of 3** (2026-10-22, re-scored from 0 after he pointed at his fix). It wasn't run, and there's no ranked comment list or top comment.
His three-question pass covers 3 of the 6 effects and handlers. It never reached
`saveLater`, `handleDraftChange` or `handleSend`.

| # | Score | Cause |
| --- | --- | --- |
| 1 · `saveLater` saves to the first ticket (L87–88) | 0 | Not reviewed. |
| 2 · Search race (`handleSearch`, L29–34) | 1 | Right line. Cause: no cancellation, so an in-flight request isn't stopped. Fix: move the fetch into an effect keyed on `query` with cancellation, plus debounce. That fix also closes the mount-request race. Re-scored 10-22 under his rule (score the mechanism, not the wording). Still missing the impact sentence: "`?q=r` lands after `?q=refund`, and the list shows all 6".
| 3 · Failed send shows "Reply sent" and wipes the draft (L117–131) | 0 | Not reviewed. |

## Wrong claims (worse in an interview than a miss)

1. ~~Mount effect: "the ignore flag is unnecessary"~~. **Retracted 10-22 after he challenged it.**
   With `[]`, cleanup runs only on unmount (and once between StrictMode's dev double mount). A
   `setState` after unmount is a harmless no-op (React 18 removed the warning). So the flag
   protects nothing there. His comment was essentially right. "It only runs once" is still
   loose: StrictMode runs it twice in dev.
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
