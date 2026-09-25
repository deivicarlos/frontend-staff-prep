---
name: grade-exercise
description: Grade an exercise he has finished. Use when he says he is done with an exercise, a timer ran out, or he pastes AFTER-THE-TIMER results.
---

# Grade an exercise

## Steps

1. **Read his diff yourself** (`git diff` in the exercise directory). Treat his report as a
   claim to check, not a result (LR-0011).
2. **Score each requirement 1 or 0** against its done-condition, checking what the code does,
   not what it looks like. Run the check yourself where you can. Done when every requirement
   has a score and a one-line cause.
3. **Flag placement separately:** the right technique in the wrong place is its own finding
   (LR-0011).
4. **Report back** in a few lines: the score, each failure with its cause, and what passed.
   Ask at most one question, in prose, about where the clock went.
5. **When he fixes and asks you to check again:** re-read the diff and re-score. If a hint
   that pointed at other code didn't land, give the exact line next time.
6. **Record:** write `EVALUATION.md` in the exercise directory. If the evidence changes what to
   teach next, write the next learning record and add its line to `learning-records/INDEX.md`.
   Update `STATE.md` (queue and "what we know"). Commit.
