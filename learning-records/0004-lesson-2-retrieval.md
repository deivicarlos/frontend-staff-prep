# Lesson 2 retrieval: 5/6, and one gap in my own lesson design

Carlos scored 5/6 on [lesson 0002's](../lessons/0002-render-is-a-snapshot.html) retrieval
check — snapshot & closures 2/2, effects 2/2, re-render rules 1/2. **The snapshot and effect
model has landed.** Those were the four calibration misses the lesson was built to close
(Q5, Q6, Q8, Q9), and they now return correct answers in new clothing.

The single miss was Q2, on **what React Compiler does and does not automate**. He knows the
compiler exists and what it does in general terms (calibration Q1, correct) and he knows
virtualisation answers a huge list (calibration Q12, correct) — but he does not yet hold the
*boundary*: memoisation is automated, structural and network problems are not. That is a
knowledge gap with a clean edge, already partly covered by
[the reference sheet](../reference/whats-changed-2024-2026.html#the-memoisation-shift).
It earns a lesson on compiler-era performance diagnosis, but not yet — see below.

## Flaw in lesson 0002 worth recording

The lesson taught identity in derivation 2 (element identity, `children` bail-out) and then
**never re-tested it in the retrieval check** — both re-render questions were about compiler
scope and context propagation instead. So the four-times-confirmed identity gap from
[LR-0003](0003-identity-is-the-gap.md) is *taught but unverified*. Design lesson quizzes to
re-test the lesson's own central claim; this one didn't.

[Exercise 0002](../exercises/0002-typeahead-rebuild/) is therefore the first real test of
whether identity landed — hand-rolled, the mechanism becomes the dependency array.

## Sequencing decision

Deferring the compiler-performance lesson in favour of the rebuild, because
[LR-0003](0003-identity-is-the-gap.md) found his gap is retrieval rather than knowledge, and
he has now had two consecutive inputs (lesson 2, exercise evaluation) with zero application.
Application is overdue. Compiler-era performance becomes lesson 3 after the rebuild returns.
