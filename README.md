# Frontend Senior/Staff Prep

A teaching workspace. Built and maintained with Claude Code's `/teach` skill; the state of
the learning lives in these files, so a session can resume cold weeks later.

| File | What it is |
| --- | --- |
| [MISSION.md](./MISSION.md) | Why this exists. Every lesson traces back to it. |
| [RESOURCES.md](./RESOURCES.md) | Trusted sources. Lessons cite from here, not from guesses. |
| [HISTORY.md](./HISTORY.md) | Past scores and closed items. |
| `career/` | The job search: decisions, status. Private files go in `career/private/` (gitignored). |
| `research/` | Sourced research on the hiring market. |
| `lessons/` | Self-contained HTML lessons, numbered in order. |
| `reference/` | Cheat sheets worth revisiting. Lessons are read once; these are read often. |
| `learning-records/` | What has actually been learned, and what that changes. |
| `assets/` | Shared stylesheet and widgets. Reuse before writing new. |

## Resume here

**[STATE.md](./STATE.md)** holds what's next. A fresh Claude Code session reads
[CLAUDE.md](./CLAUDE.md), then STATE.md, and loads everything else only when the task needs it:
skills in `.claude/skills/`, evidence through `learning-records/INDEX.md`, and the job search in
`career/`.

## Exercises

Timed practice builds live in `exercises/`. Each has a `START-HERE.md` briefing and an
`AFTER-THE-TIMER.md` rubric that must not be opened until the clock runs out.

- `0001-typeahead/` — 45 min. Debounce, cancellation, keyboard nav, loading and error states.
