# After the timer: exercise 0006

Paste your `REVIEW.md` in chat as it stood at the buzzer. Don't edit it first.

## Scoring

Seven planted bugs. Each one scores **1 only if your comment has all three**: the right line,
what the user sees, and a fix that would work. "This looks off" scores 0. Separately:

- **Ranking:** did your top two include #1 and #2 below?
- **Confirmed:** for each one you reproduced, what did the log or screen show?

## The seven, by severity

**1 · Blocker: XSS from archived email (`MessageBody`, `dangerouslySetInnerHTML`).**
Open *Invoice attached* and the log shows `EVENT injected script ran inside the app's origin`.
The body is HTML from an outside sender, rendered inside your origin. Its script can call your
API as the reviewer. The fix has three layers: sanitize (DOMPurify), render in `<iframe sandbox>`
without `allow-scripts`, ideally on a separate origin. Rendering as plain text also passes.
This was in your prep (§2e). For a compliance product it's the first comment.

**2 · Blocker: race, wrong message on screen (`MessageBody` effect).**
Click *Q3 allocation* (1.5 s), then *Re: client pricing* (0.3 s). The panel shows pricing,
then flips to Q3 while pricing is still selected. Nothing ignores or aborts the stale request.
A reviewer reads, and might escalate, the wrong evidence. Fix: an `ignore` flag or
`AbortController` in the effect, set in the cleanup (exercise 0005 #6).

**3 · Must fix: Flag button does nothing visible (`toggleFlag`).**
The log shows the `PATCH`, but no FLAGGED badge appears. `message.flagged = …` mutates the
object in place, then `setMessages(messages)` passes the **same array**, so React compares
references, sees no change and skips the render. Fix: a new array and a new object:
`setMessages(prev => prev.map(m => m.id === id ? { ...m, flagged } : m))`. Bonus: the UI
updates before the PATCH succeeds and nothing handles its failure.

**4 · Must fix: `f` shortcut never fires (keydown effect, `[]` deps).**
Select *Lunch Thursday?*, click outside the search box, press `f`: no `PATCH` in the log. The
handler is a closure from the first render, where `selectedId` is `null` and `messages` is `[]`.
The `eslint-disable` line is hiding exactly this, and **an AI PR that disables
`exhaustive-deps` is a comment by itself.** Fix: `useEffectEvent` (React 19.2) for the
handler, or add `selectedId`/`messages` to the deps (re-subscribes on each change), or a ref.

**5 · Must fix: interval never cleared (Live effect).**
Tick Live, untick it: polls keep coming every 3 s. Tick it again: two polls per tick. There's no
`return () => clearInterval(id)`. It leaks forever and multiplies on every toggle.

**6 · Must fix: "reviewed" tick jumps to another message (`key={index}`).**
Tick *Lunch Thursday?*, type `lunch` in search: it shows unticked. Turn Live on and wait for
the new message: every tick shifts down a row. State belongs to the position, not the message.
Fix: `key={message.id}`. For compliance, "marked as read" landing on the wrong message is
serious. Also the tick is local state, so it's lost on reload: it should be saved on the server.

**7 · Must fix: a failed body loads forever (`MessageBody`, no `catch`).**
Open *Trade confirmation 88231*: `Loading…` forever, plus an unhandled rejection in the console.
The reviewer needs to know it failed and be able to move on. Fix: `.catch` → an error state with a retry.

**Smells (not scored, Staff-level comments):**
- `filtered` kept in state and synced by an effect. That's derived state: compute it during
  render. The effect costs an extra render and one frame of stale list.
- `fetchMessages().then(setMessages)` has no error handling either.
- No tests on a PR that changes reviewer behaviour, and "I clicked through it" missed 1, 2 and 4.

## Paste back

1. Your `REVIEW.md`, unedited.
2. Which of the seven you found, in the order you ranked them.
3. One line: which one did you look straight at and not see?
