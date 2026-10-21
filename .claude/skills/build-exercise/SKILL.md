---
name: build-exercise
description: Build a timed exercise in exercises/. Use when STATE.md's next item is an exercise, or he asks for a build, debug or AI-assisted exercise.
---

# Build an exercise

## Steps

1. **Read the evidence.** Open `learning-records/INDEX.md`, then the records for the areas this
   exercise touches. Done when you can name which finding each requirement tests.
2. **Pick the format:**
   - **Debug a broken app:** the scaffold runs and a chain of bugs follows, each fix revealing
     the next. Models real "fix this codebase" rounds.
   - **Build from scratch:** 45 min, empty component, logic graded before layout.
   - **AI-assisted:** only on material he has already shown he knows (see the learning
     records). Graded on decomposition, what he delegates, how he reviews and verifies the
     generated code, and narrated decisions, never on whether the prompting worked.
3. **Write the requirements** (rules below). Done when every requirement has a **Done when**
   he can check on screen or in a log.
4. **Scaffold** `exercises/NNNN-slug/`, reusing the previous exercise's Vite setup. Include a
   log panel whenever there is async behaviour.
5. **Prove the scaffold.** Run `npm install && npm run build`. Check every done-condition goes
   **red** on the scaffold and **green** on a reference solution you write and then delete.
   Check it renders in both light and dark colour schemes (0003 shipped an invisible input in
   dark mode). Done when all three hold.
6. **Write `START-HERE.md`** (briefing, no spoilers) and **`AFTER-THE-TIMER.md`** (rubric,
   opened only after the clock).
7. **Update `STATE.md` and commit.**

## Requirement rules

- Keep them **scenario-shaped**, the way real briefs are ("the service falls over; the user
  needs to know and carry on"). Concise in words, never flattened into instructions (LR-0009).
- **Show the exact output** (his rule, 2026-10-21). Every requirement that puts something on
  screen gives a literal example of it: the element, its text, and the format of each row
  (e.g. `#1 · bo · stats thunder`). Keep the scenario sentence for the why. The example says
  what to show, never how to build it.
- **Binary scoring:** a requirement is 1 only if its done-condition passes (LR-0010).
- When triage is the axis, include **more requirements than fit in the clock**, and the brief
  says so. A requirement he names as skipped scores better than one silently untouched.
- Size it so the timer plus grading fits a 40–60 min session.
- Include a **placement** check wherever a technique has parts that must sit in the right
  place (LR-0011).
- For async, include a done-condition with **two requests in flight**. A single-request check
  misses stale-handler bugs (LR-0011).

## Standing protocol (goes in every `START-HERE.md`)

1. Before the clock, copy the requirements into the file as comments.
2. Finish each requirement against its done-condition before moving to the next one.
3. Budget the clock across the requirements, and take one cheap pass over all of them before
   going deep on any.
4. At the buzzer, write down what's unmet.
5. A requirement you can't turn into a task in one pass is a question to ask, not one to skip
   (LR-0013).

## Rubric rules

- **Every checklist row names its object**, so it stands alone out of context (0003's "re-read
  at the 10-minute mark" was misread).
- For each requirement, `AFTER-THE-TIMER.md` asks him to **paste the log or screen output**,
  not tick a box (LR-0011).
