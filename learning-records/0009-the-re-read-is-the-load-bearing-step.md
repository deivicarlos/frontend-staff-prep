# The re-read is the load-bearing step — and scenario-shaped requirements don't convert

Exercise 0003 scored **4/6**, double both typeahead attempts, on the layer that went unwritten in
both of them. See [the evaluation](../exercises/0003-keyboard-layer/EVALUATION.md). The keyboard
stops being a gap. Three findings replace it.

## Finding 1: encoding alone does not hold the list — the re-read is what does

The [LR-0006](0006-requirements-fell-out-of-memory.md) protocol shipped as three graded lines.
One of three came back checked:

| | |
| --- | --- |
| Transcribed before the clock | ☑ verbatim |
| Re-read at the 10-minute mark | ☐ — asked directly, answered "No" |
| Unmet named at the buzzer | ☐ |

This is the clean version of the experiment LR-0006 designed. Transcription happened and the list
still failed to hold: requirement 5 went to zero and Escape never reached a `case` — despite
`KEY_VALUES.ESC` being *declared*, which proves Escape was in working memory at some point during
the twenty minutes and left before it was spent.

So the encoding step is not the active ingredient. **The re-read is**, and it is the one that
depends on him remembering to do a thing at a moment when he is absorbed — precisely the
condition under which he has now twice failed to do it.

**Intervention: stop asking him to remember the interrupt.** Every exercise from 0004 gets a
halfway alarm as a literal instruction — set a second timer at the midpoint before starting the
first one. One-time cost before the clock, zero recall demand during it. The buzzer step is
cheaper still and also went unchecked; make both mechanical rather than disciplinary.

## Finding 2: he reached the end of the list. Time is not the explanation for the misses

Asked which requirement he wrote first: **"I did requirements in order."** Requirement 6 scored
full credit. Both facts together mean he reached the bottom of the list inside the clock — the
tail was not truncated.

That kills the obvious reading of a 4/6. He did not run out of time at requirement 5; he passed
through it. Scoring by position: 1 full, 2 half, 3 full, 4 half, 5 **zero**, 6 full. The misses
are scattered, not trailing.

He also reported 20 minutes felt short, and part of that is real and mine (see Finding 4). But
short time produces an unfinished tail, and this isn't one. The shape is the same as exercise
0002's `AbortController` — reached, understood, built to roughly 70%, never armed
([LR-0005](0005-cleanup-is-keyed-to-timers.md)). Each requirement got enough attention to look
addressed and not enough to be finished. **That is a completion-criteria problem, not a clock
problem**, and it is the thing to attack next.

## Finding 3: the one requirement he skipped was the one phrased as a scenario

Requirement 5 is the only zero, and it is the only one of the six that does not name a thing to
do. The other five name a key (Arrow/Enter/Escape), an attribute (screen-reader state), or a
visible outcome (the active row must be visible). Requirement 5 describes a situation and asks
for a defensible outcome:

> Type until several results show, arrow down a few rows, then type another character that
> narrows the list. Whatever happens next must be defensible.

Reading that and converting it into "reset `active` to `-1` when `results` changes" requires
deriving the bug first. **Requirements that must be derived into tasks did not become tasks.**
Requirements that arrive pre-converted did — five of five, at least partially.

This is the same axis as [LR-0007](0007-constraints-do-not-travel.md): what must be held and
applied, rather than executed, is what falls out. It now has instances in a design conversation
and in a timed build.

**Do not fix this by rewriting requirements as instructions** — real interview briefs are
scenario-shaped, and so is the ambiguity a staff candidate is being measured on. The fix is the
converse: future briefs should deliberately carry *more* scenario-shaped requirements, and the
transcription step should require writing each one as an action he will take.

## Finding 4: technique selection is live; the mechanics under it are shallow

Asked whether the two-focuses framing came to mind or whether he implemented from memory:

> "I used activedescendant because part of the requirement was to keep the focus. TabIndex will
> move focus out of the input."

That is the choice *between* the two techniques, derived from a stated constraint, in his own
words — and [LR-0008](0008-cleanup-closed-transfer-is-the-axis.md) recorded lesson 3 Q2 as
evidence he held the technique for the taught widget and not the choice between techniques.
**Partial retraction: the selection reasoning is live**, at least in the direction where
`aria-activedescendant` wins. Q2 missed the direction where roving `tabindex` wins. Narrow the
open item from "doesn't hold the choice" to "holds one side of it."

Worth noting separately: requirement 3 drove his requirement 4 decision. **A constraint travelled
across requirements** — the exact move LR-0007 found missing when a constraint from his own
answer failed to survive one follow-up question. First positive instance on that axis.

But he then put `aria-activedescendant` on the `<ul>` instead of the input, which is the one
placement that makes the attribute inert, and omitted `role="option"` and the entire combobox
half. He selected the right technique for the right reason and implemented a version of it that
does not work for a screen reader. He also named the cause himself — *"I forgot how the active
descendants worked."* **Selection is reasoning; placement is knowledge; the knowledge is thin.**
This wants a reference sheet, not a lesson — there is nothing to derive.

## Finding 5: `any` was causal, not cosmetic

`search()` returned `any[]` for a third exercise. With `Book[]` and `noUncheckedIndexedAccess`,
`results[active]` is `Book | undefined`, `choose()` takes a non-optional object, and the
requirement-2 crash **is a compile error**. The standing "make `any` a graded line" note from
STATE has been treating this as hygiene. It is not: the plant and the highest-severity defect in
the submission are the same defect. Say so in the next rubric explicitly — the argument that
lands is not "`any` is bad practice," it is "`any` is why nothing told you."

## Finding 6: the scaffold cost him clock (mine)

`:root` declared `color-scheme: light dark` over a hardcoded-light palette, so the UA restyled the
input for dark mode — light text on an explicit `#fff` background, typing invisible. He spent
exercise time diagnosing and patching CSS. Fixed at source. **Check new scaffolds in both colour
schemes before shipping them**; a 20-minute exercise has no slack for environment friction.

## What to teach next

1. **A combobox/listbox ARIA reference sheet**, not a lesson — `reference/` is for things with
   nothing to derive, and attribute placement is exactly that. Build it from the APG pattern
   tables as primary source, covering which element carries which attribute and why the
   focus-holder carries `aria-activedescendant`.
2. **Lesson 4 (compiler-era performance) still stands next among lessons** — displaced three
   times now, still closing the lesson-2 Q2 miss, and still the natural home for calibration Q17.
3. **Exercise 0004 targets completion criteria, not a new topic.** Finding 2 is the most valuable
   thing here and nothing currently measures it. Candidate shape: a short list of requirements
   where each has an explicit, checkable done-condition, and the rubric grades *finished vs.
   attempted* rather than breadth. Hold the familiar scaffolding constant per LR-0006.
