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

## Resume here

**[STATE.md](./STATE.md)** — where we are, what's next, and what's outstanding. Start there.

Right now that means exercise 0002: a hand-rolled typeahead rebuild, scaffolded and waiting
on a 45-minute timer.

```sh
cd exercises/0002-typeahead-rebuild && npm run dev
```

A fresh Claude Code session in this directory picks up [CLAUDE.md](./CLAUDE.md) automatically
and orients itself from these files — you shouldn't have to re-explain anything.

## Exercises

Timed practice builds live in `exercises/`. Each has a `START-HERE.md` briefing and an
`AFTER-THE-TIMER.md` rubric that must not be opened until the clock runs out.

- `0001-typeahead/` — 45 min. Debounce, cancellation, keyboard nav, loading and error states.
