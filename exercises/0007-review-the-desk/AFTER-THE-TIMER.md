# After the timer: exercise 0007

Paste your `REVIEW.md` in chat exactly as it was at the buzzer. Don't edit it first.

## Scoring

There are three planted bugs, one per review question. A bug scores **1 only if your comment
has all three**: the right line, an "it breaks when…" that names the sequence or failure, and a
fix that works. Two other checks are scored separately:

- **Pass:** did your three-question block for that handler or effect already contain the bug,
  before you wrote any comment? This is what LR-0019 is measuring.
- **Confirmed:** for each bug you reproduced, paste what the log or screen showed.

## The three

**1 · Blocker. Draft autosave writes to the wrong customer's ticket (`saveLater`, lines 87–88).**
*Question 1: what does it close over?* `useRef(initial)` keeps only the **first** render's
value. The debounced function closes over the `ticketId` from that render, and `TicketPanel`
isn't remounted when the ticket changes (no `key`). So every draft saves to the first ticket
the agent opened.
Repro: open *Can't log in…* (T-101), then *Export to CSV…* (T-104), type `hello`, and wait 1 s.
The log shows `PUT /api/tickets/T-101/draft "hello"`. Reopen T-101 and Northwind's reply box
holds a message written for Osei & Partners. The agent then sends it to the wrong company.
There's no `exhaustive-deps` warning here, because refs are invisible to the linter.
Fix: pass the id as an argument, `debounce((id, text) => saveDraft(id, text))`, and call
`saveLater(ticketId, value)`. Two other fixes also work: `key={selectedId}` on `<TicketPanel>`
(a remount builds a new ref), or `useEffectEvent`/a ref holding the latest id.

**2 · Must fix. Search shows results for an older query (`handleSearch`, lines 29–34).**
*Question 2: what if two runs overlap?* Every keystroke starts a request, and whichever lands
**last** wins. Shorter queries are slower (`api.ts` header).
Repro: type `refund` at normal speed. `?q=r` (750 ms) lands after `?q=refund` (120 ms), so
the box says *refund* and the list shows all 6 tickets. This is the 0006 race, moved out of an
effect into a handler, so the cleanup/`ignore` pattern doesn't apply as written.
Fix: a request counter in a ref (`if (n === latest.current) setResults(found)`), an
`AbortController` kept in a ref, or move the fetch into an effect keyed on `query` with an
`ignore` flag. The Staff version is TanStack Query with `queryKey: ["tickets", q]`, or
debouncing the input.

**3 · Blocker. A failed reply shows "Reply sent" and deletes the reply (`handleSend`, lines 117–131).**
*Question 3: what if it fails?* The PR does have a `try/catch`, so a scan for missing
`catch` passes. But the catch only logs, and the code after the `try` runs either way:
`setDraft("")`, `saveLater("")` and `setSent(true)`.
Repro: open *Invoice shows wrong currency* (T-103), type, and send. The log shows the POST
returning 500. The screen shows **Reply sent ✓**, an empty box, and a `PUT … draft ""` that
also wipes the saved draft. The customer never gets the answer, the agent thinks they're done,
and the text is gone. ("Errors on send are handled" in the PR description is the tell.)
Fix: put the success effects inside the `try` after the `await`, and set an error state in
the `catch` ("Not sent, your reply is kept") so the draft survives for a retry.

## Smells (not scored, worth a Staff comment)

- Lines 93–95 reset state inside the effect when `ticketId` changes. `key={ticketId}` on the
  panel does that reset properly, and it also removes bug 1. Saying so is the best comment in
  this PR.
- `useRef(debounce(...))` builds a throwaway debounced function on every render.
- The `saveDraft` and `searchTickets` rejections are never handled.
- The mount effect's `?q=` can land after the agent's first keystroke. This is the same race
  family as bug 2.
- `key={i}` on the thread (line 144) is **fine**: the list is append-only and has no item
  state. Flagging it means matching on a pattern, not on what the code does.
- No tests. Each of the three bugs is a one-test catch with fake timers.

## Paste back

1. Your `REVIEW.md`, unedited.
2. For each of the three bugs: was it in your three-question pass, in your comments, both, or
   neither?
3. One line: which question did you answer too quickly?
