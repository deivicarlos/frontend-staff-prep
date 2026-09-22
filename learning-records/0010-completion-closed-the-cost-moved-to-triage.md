# Completion closes. The cost moves to triage — and to API recall

Exercise 0004 scored **2 of 4** under binary grading, and the report-back inverts what the
number looks like. See [the evaluation](../exercises/0004-finish-the-job/EVALUATION.md).

## Finding 1: completion was never a discipline problem. It closes.

Asked what he did with the 20 minutes, unprompted:

> "I copied the requirements as comment in Typeahead.tsx and did one by one so I dont forget
> what im doing and before moving from one requirement to another I made sure it was complete
> according to the requirement. I dont wan to be going back and forth."

He designed his own completion protocol and ran it. The result is exactly what it predicts:
both requirements he touched pass their done-conditions cleanly, including the
`AbortController` that was reached for and never armed in 0002
([LR-0005](0005-cleanup-is-keyed-to-timers.md)). Zero scattered holes — the first exercise with
none.

[LR-0009](0009-the-re-read-is-the-load-bearing-step.md) finding 2 read the 0003 scatter as a
completion-criteria gap and this exercise was built to attack it. **It is closed, and the
mechanism that closed it was his, not the rubric's.** Binary scoring is still worth keeping —
it is what made the two passes legible — but stop designing exercises *around* completion.

## Finding 2: the new cost is triage. Depth-first with no budget produces trailing zeros.

The same sentence that closes finding 1 opens this one. "One by one… I don't want to be going
back and forth" is depth-first with no time budget per item, and against a clock that
guarantees the tail gets nothing. Requirements 3 and 4 did not get a bad implementation; they
got no implementation and no mention.

This is a real trade and he took the better side of it for a scored exercise. In a live loop it
reads worse than it scores: an interviewer holding a four-line list watches two lines never get
acknowledged. The cheap fix is not to abandon depth-first — it is a **budget per requirement
and one cheap pass over all of them first**. A `useState(false)` for loading and a `.catch()`
that sets an error string is about ninety seconds of the twenty minutes, and converts two zeros
into two partials plus something to talk about.

**Next exercise tests triage explicitly**: more requirements than fit in the clock, stated as
such in the brief, so that choosing what not to finish becomes the graded act.

## Finding 3: the clock went to API recall, not to reasoning

> "I needed to search again for AbortController and how to use it as I forgot."

That is the second exercise running where minutes went to looking up an API he had already
chosen correctly. In 0003 it was `aria-activedescendant` — *"I forgot how the active descendants
worked"* — selected for the right reason and placed where it does nothing
([LR-0009](0009-the-re-read-is-the-load-bearing-step.md) finding 4).

**The pattern is now firm: technique selection is live, mechanical recall is thin, and the gap
bills in minutes off a 20-minute clock.** This is precisely the CLAUDE.md definition of
reference-sheet material — nothing to derive, pure knowledge. Reference sheets are now the
highest-yield artifact per minute of his time in this workspace, ahead of the next lesson.

## Finding 4: `try/catch` around a promise — named once, understood immediately

He wrapped `search(...).then(...)` in a `try/catch` and believed error handling was covered.
The call throws nothing synchronously, so the block is unreachable. On being told it returns a
promise:

> "now that you mentione that it returns a promise, i understand why is not doing anything if i
> am not awaiting or catching"

One sentence closed it, which means it was never a model gap — it is the same thin-mechanics
axis as finding 3. **Do not teach this. Re-test it**: the next async exercise should reject
somewhere and grade whether the rejection is caught at the right layer, including the
`AbortError` that must be swallowed rather than shown.

## Finding 5: retire the midpoint alarm

Unset, for the third exercise running — but this time the step it was meant to fix did not
fail. The alarm existed to stop requirements falling out of working memory
([LR-0006](0006-requirements-fell-out-of-memory.md)); his per-requirement completion check does
that better, with zero recall demand during the clock, because it never lets a requirement go
half-held in the first place.

**Drop it from the standing protocol.** Three prescriptions of a step he doesn't take, replaced
by one he invented and does. The transcription step stays but reverts to plain copying — the
"write each as an action" upgrade also did not survive contact (the brief's markdown arrived
pasted verbatim, headings included) and its purpose is now served by the completion check.

The buzzer note stays, and gets cheaper to argue: under his own method he knows exactly which
requirements he never reached. Writing those two lines costs seconds and is the difference
between "didn't listen" and "triaged."
