# Exercise 0012: room planner (pair-programming rep, build from scratch)

**45 minutes on a timer, then about 15 to grade. Six requirements, which may not all fit. Name
what you skip.**

This is the shape of the Geomagical round 2: a practical, day-to-day task with an engineer
beside you. **I'm the engineer.** Ask me anything in chat you'd ask them, in one line; I answer
in one line. **Talk out loud the whole time.** Docs are fine (React docs, MDN): say what you're
looking up. No AI, no searching for solutions.

```sh
npm run dev
```

## The app

A shopper furnishes a room: they search the catalogue, drop furniture in, and arrange it.

- **Yours:** `src/Planner.tsx`. You can add files.
- **Not yours, and correct:** `catalog.ts` (`searchCatalog(query)`, which logs every request and
  response), `log.ts` (call `log.add("...")` to write to the panel), `main.tsx`.
- The room is **400 × 300 cm**. Positions are in cm from the top-left corner: x to the right, y
  down. Every product has a `width` (along x) and a `depth` (along y).

## Start routine (first 3 minutes)

1. Copy the six requirements into the comment at the top of `Planner.tsx`.
2. Say out loud what state the app holds, and where each piece lives.
3. Take one cheap pass over all six before going deep on any. Budget the 45 minutes.
4. Finish each requirement against its done-condition before moving to the next.
5. A requirement you can't turn into a task in one pass is a question to ask me, not one to skip.

## What the page must look like

The text must match; styling doesn't matter.

```
Catalogue                         Room
Search [de______]                 Items in room: 3 · 2 selected
Loading…              ← in flight [Delete selected] [←][→][↑][↓] [Undo]
SOLMA desk · 120×60 cm [Add]      #1 · SOLMA desk · (0, 0)     ← selected rows highlighted
                                  #2 · LUMA lamp · (0, 0)
                                  #3 · KORP chair · (0, 0)
```

## Requirements

Each scores **1 only if every check under it passes.**

**1 · Find the desk.** A shopper types fast; the list must match what's in the box, never an
older search.
- Empty box → no request in the log, no results.
- Type `de` quickly (two keystrokes). The log shows two requests. Once both have landed, the
  list is exactly one row: `SOLMA desk · 120×60 cm [Add]`.
- `Loading…` shows while the current search is in flight, and is gone after.

**2 · Put it in the room.** Each piece they add appears in the room at the corner.
- Add the desk, the lamp, the chair → rows `#1 · SOLMA desk · (0, 0)`, `#2 · LUMA lamp · (0, 0)`,
  `#3 · KORP chair · (0, 0)`, and `Items in room: 3`.
- Numbers are never reused: after deleting any item, the next one added gets the next number.

**3 · Pick several.** They want to rearrange a group, not one piece at a time.
- Click #1 → only #1 is highlighted; `1 selected`.
- Cmd-click (Ctrl on Windows) #3 → #1 and #3 highlighted; `2 selected`.
- Cmd-click #1 → only #3; `1 selected`. Plain click #2 → only #2; `1 selected`.

**4 · Clear them out.** The group they picked goes in one action.
- `Delete selected` is disabled with nothing selected.
- Select #1 and #3, click it → only #2 is left; `Items in room: 1 · 0 selected`.

**5 · Nudge them.** Arrows move every selected piece 10 cm. Nothing may leave the room.
- Select #1 and #2, click `→` once → both rows show `(10, 0)`; #3 hasn't moved.
- Keep clicking `→` until something stops the move. What you see on screen and in the log
  matches what you agreed with the engineer.

**6 · Oops.** Shoppers change their minds.
- `Undo` reverts the last add, delete or move, and again for the one before.
- Delete two selected items, then `Undo` once → both are back with the same numbers and positions.
- `Undo` is disabled when there's nothing to undo.

## At the buzzer

Under each requirement in your comment, write `pass` or what's unmet. Write down every question
you asked me and when. A requirement you name as skipped scores better than one left blank.

**Don't open `AFTER-THE-TIMER.md` until the 45 minutes are up.**
