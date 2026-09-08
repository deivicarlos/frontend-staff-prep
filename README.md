# Frontend Senior/Staff Prep

A teaching workspace. Built and maintained with Claude Code's `/teach` skill; the state of
the learning lives in these files, so a session can resume cold weeks later.

| File | What it is |
| --- | --- |
| [MISSION.md](./MISSION.md) | Why this exists. Every lesson traces back to it. |
| [RESOURCES.md](./RESOURCES.md) | Trusted sources. Lessons cite from here, not from guesses. |
| [NOTES.md](./NOTES.md) | Teaching preferences and open questions. |
| `lessons/` | Self-contained HTML lessons, numbered in order. |
| `reference/` | Cheat sheets worth revisiting. Lessons are read once; these are read often. |
| `learning-records/` | What has actually been learned, and what that changes. |
| `assets/` | Shared stylesheet and widgets. Reuse before writing new. |

## Start here

```sh
open lessons/0001-calibration.html
```

Answer all twenty questions from memory, then click **Copy results for Claude** and paste
them into a session. Lesson 2 is chosen from that profile.

## Exercises

Timed practice builds live in `exercises/`. Each has a `START-HERE.md` briefing and an
`AFTER-THE-TIMER.md` rubric that must not be opened until the clock runs out.

- `0001-typeahead/` — 45 min. Debounce, cancellation, keyboard nav, loading and error states.
