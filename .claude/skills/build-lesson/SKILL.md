---
name: build-lesson
description: Build a lesson (lessons/) or a reference sheet (reference/). Use when STATE.md's next item is a lesson, sheet or diagnostic, or he asks to learn a topic.
---

# Build a lesson or reference sheet

## Choose the artifact

- **Lesson** (`lessons/NNNN-slug.html`, about 30 min): for a topic with a model to build.
- **Reference sheet** (`reference/slug.html`): for pure knowledge with nothing to derive. It
  ends with a 3-minute cold-recall task: delete, rewrite from memory, check.
- **Diagnostic**: for an area that has never been measured (auth, backend). Measure first, then
  teach only the gaps. Lesson 1 is the model.

## Steps

1. **Read the evidence.** `learning-records/INDEX.md`, then the relevant records. Done when you
   can say what he already articulates (skip it) and what he misses under a clock (target it).
2. **Verify every fact against a primary source** from `RESOURCES.md` or the web. Cite each
   one in a Sources section.
3. **Build** with `assets/course.css`. Reuse `assets/quiz.js` (locking MCQ) and
   `assets/predict.js` (the answer is gated behind a written prediction) before writing new
   widgets.
4. **Structure:** input, then application, then input, then application. Every input is followed
   by something he does before the next one.
5. **Retrieval check:** it re-tests the lesson's own central claim, not neighbouring topics
   (LR-0004). Prefer his writing over recognising an option.
6. **Check it renders in light and dark.** Update `STATE.md`. Commit.

## Style

Start from zero: the first section builds the mechanism the rest depends on, and assumes no
prior knowledge of it (CLAUDE.md, LR-0014). Concise. A table where he'd otherwise read a paragraph. One "sentence to
have ready" for interviews, as in the existing reference sheets.
