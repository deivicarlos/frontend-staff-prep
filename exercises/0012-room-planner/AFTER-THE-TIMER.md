# 0012 · after the timer

Paste, don't tick. For each requirement, paste the screen text or log lines that prove it.

## 1 · Find the desk (search, two requests in flight)
- Paste the log lines for typing `de`: two `→ search` lines and two `← search` lines, in the
  order they landed.
- Paste the result list after both landed. Pass = exactly `SOLMA desk · 120×60 cm [Add]`.
  (`"d"` takes 1500 ms and `"de"` 300 ms, so `"d"` lands last. Without a guard, the list ends on
  3 rows.)
- Where is the guard? Name the line. It must sit after the `await`/`.then`, before `setState`.

## 2 · Put it in the room (adding and numbering)
- Paste the three room rows and the count line.
- Paste the row for the item added after a delete. Pass = the number after the highest one ever
  used, not `length + 1`.

## 3 · Pick several (multi-select)
- Paste the `N selected` line after each of the four clicks.

## 4 · Clear them out (group delete)
- Paste the room panel after deleting #1 and #3.

## 5 · Nudge them (group move, room bounds)
The engineer's answers, if asked:
- **What counts as leaving?** The whole footprint stays inside: `x ≥ 0`, `y ≥ 0`,
  `x + width ≤ 400`, `y + depth ≤ 300`.
- **One piece of the group would leave?** Nothing moves, and the log says
  `move blocked: #N would leave the room`.

With the desk (120 wide) and lamp selected, `→` stops with both at `(280, 0)` and the log line
`move blocked: #1 would leave the room`. Paste your rows and log line.
- Pass = both answers implemented. Clamping each piece separately, or checking only the corner
  point, is 0.
- Did you ask before you wrote the move? Paste your question and its timestamp.

## 6 · Oops (undo)
- Paste the rows after delete → `Undo`.
- Paste the rows after two `Undo`s following a move. Pass = they step back one action at a time.
- Was `Undo` disabled on a fresh page? Yes or no.

## Process (not scored, graded in the debrief)
- How many questions did you ask, and when? A pairing partner hears these more than your code.
- Did you talk out loud throughout? Where did you go quiet?
- What did you skip, and when did you decide?
