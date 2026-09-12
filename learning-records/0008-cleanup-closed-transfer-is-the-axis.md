# Lesson 3: 4/6. Cleanup closed; the transfer failure moved to a new topic

Carlos scored 4/6 on [lesson 0003](../lessons/0003-the-keyboard-is-the-widget.html) —
focus model 1/2, interaction contract 1/2, cleanup 2/2. Missed Q2 and Q4.

## Cleanup is closed

Q5 and Q6 were deliberately set on surfaces the lesson never used as examples — the design rule
introduced after [LR-0005](0005-cleanup-is-keyed-to-timers.md), where the timer-only reflex
survived a 5/6 because the check tested cleanup in the same clothing the lesson taught it in.
Both correct. **The principle transferred off its example. Stop teaching cleanup.**

That also validates the check-design rule itself, which is now worth treating as standing: every
retrieval check tests at least one track on a surface the lesson did not use.

## Q2: the same shape, one topic over

Q1 correct (focus stays in the input — the combobox case, the lesson's worked example).
Q2 wrong (a toolbar: roving `tabindex`, which buys you the user agent scrolling the focused
element into view). So he holds the technique **for the widget the lesson was about** and not the
choice between the two techniques.

This is the third instance of one axis: the idea lands on its example rather than on its
principle. LR-0005 (cleanup keyed to timers), [LR-0007](0007-constraints-do-not-travel.md)
(a constraint that didn't survive one question), and now this. Cleanup *closed* on this axis
while the new material opened on it — which suggests the fix is not a different teaching style
but simply more surfaces per idea, and time.

**Do not build a lesson for this.** It is a property of how new material settles, not a topic.
Keep applying the multi-surface rule and re-measure.

## Q4: a plain platform gap, and a live trap

`preventDefault` vs `stopPropagation` — the caret jump on ArrowUp is the input's *default
action*, not another listener. Clean-edged knowledge, consistent with platform 2/4 at
calibration. Too small for a lesson; it is a **graded line in exercise 0003's rubric**, because he
will hit it in the first five minutes of that build.

## Exercise 0003 was built anyway, overruling STATE's rule

STATE said a short focus track meant not starting the exercise. Overruled, with reason: the
exercise is a typeahead keyboard layer, i.e. technique A — `aria-activedescendant` — which is
exactly what Q1 got right. The miss is on roving `tabindex`, the technique the build does not
touch. The blunt rule was written before the tracks could be read at question granularity.

[Exercise 0003](../exercises/0003-keyboard-layer/) ships as specced: 20 minutes, keyboard layer
only, results handed over pre-fetched and synchronous so the debounce/request/cancellation layer
he has already proved twice cannot absorb the clock. It carries the LR-0006 protocol as three
graded lines, plants `any[]` as the return type of `search()`, and grades `preventDefault`
explicitly. Scaffold verified: installs, typechecks, builds.
