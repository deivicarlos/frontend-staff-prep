# Teach from zero; security, authentication and authorization become a track

2026-10-08, his request, at the end of the lesson 6 repair.

## Decision

- **Every lesson starts from zero.** In his words: "I have a lot of voids in the knowledge and
  not going from Zero makes it harder sometimes for me to understand." The evidence agrees:
  lesson 6 assumed he knew when the browser sends a cookie and what CORS does, and everything
  built on that failed (2/5, [LR-0014](0014-auth-the-browser-model-is-missing.md)). Once the
  mechanism was taught from zero in chat, he went 3/3 and reasoned past the question. This
  replaces "no basics" in CLAUDE.md and the "rust, not absence" constraint in MISSION.md.
- **Security, authentication and authorization is a zero-to-hero track** (MISSION.md success
  criteria), aimed at system design rounds and Staff discussions. It replaces the two-lesson
  auth plan (lesson 6 + lesson 7). The sequence is in STATE.md.

## What to watch

"From zero" means building the mechanism first, not padding. The test is whether he can
predict what the browser or server does in a new case. If he still can't, the base was too
thin.
