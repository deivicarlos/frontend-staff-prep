# Exercise 0007: review the desk (review rep 2)

**20 minutes: 15 reading, 5 running. Then about 10 minutes to paste and grade. Plan 30.**

Same format as 0006 and the GR round-2 screen share: "what happens here, what's missing, how
would you review it?". No AI, no docs, and don't run the app for the first 15 minutes.

## The PR

> **#517 Agent desk: server search, draft autosave, replies.** Search now hits the server so it
> covers every open ticket. Drafts autosave so an agent never loses a half-written reply.
> Errors on send are handled. Written with an AI assistant, reviewed the diff myself, works
> locally.

The users are support agents answering paying customers. Each ticket belongs to a different
customer company. **A reply goes out by email the moment it is sent.**

Review only `src/TicketDesk.tsx` (~165 lines). `api.ts` (fake backend, latencies at the top),
`debounce.ts` and `main.tsx` (page shell, request log) are correct and not part of the PR. In
dev, StrictMode runs mount effects twice, so mount requests show up twice in the log. That's
expected, not a finding.

## Protocol

1. **Minutes 0–15, read only.** For **every effect and every handler**, write the three answers
   in `REVIEW.md` before any comment:
   1. What does it close over, and when does that value go stale?
   2. What if it runs twice, or two runs overlap? Name the order: "A starts, B starts, B lands,
      A lands → the screen shows…"
   3. What if the call fails? What does the agent see?
2. Then write your comments, free-form. Each one gives the line, **"it breaks when…"**, and the
   fix. Rank them: what blocks the merge?
3. Take one fast pass over the whole file before you go deep on anything.
4. **Minutes 15–20, run it** (`npm install && npm run dev`). Try to reproduce each finding and
   paste what the log or screen showed under it. Mark any you couldn't reproduce "unconfirmed".
5. At the buzzer, end `REVIEW.md` with your verdict and what you'd write as the top comment to
   the author.

**Do not open `AFTER-THE-TIMER.md` until the 20 minutes are up.**
