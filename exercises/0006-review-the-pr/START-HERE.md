# Exercise 0006: review the PR

**20 minutes: 15 reading, 5 running. Then about 10 minutes to paste and grade. Plan 30.**

This is the Global Relay round-2 format: someone shares React code and asks "what happens here,
what's missing, how would you review it?". No AI, no docs, no running the app for the first 15
minutes.

## The PR

> **#482 Reviewer queue v2.** Adds subject search, a Live mode that pulls in newly archived
> messages, a Flag button, and an `f` keyboard shortcut to flag the selected message. Mostly
> written with an AI assistant. I clicked through it locally and it works. No tests yet,
> will follow up.

The users are compliance reviewers. They read archived messages all day. **Flagging a message
escalates it to an investigation.** The "reviewed" tick is how they track what they have read.
Message bodies are archived emails, **from any sender, inside or outside the bank.**

Review only `src/ReviewQueue.tsx` (~140 lines). `api.ts` (fake backend, latencies documented at the
top) and `main.tsx` (page shell, request log) are correct and not part of the PR. In dev, React
StrictMode runs mount effects twice, so each mount request appears twice in the log. That's
expected, not a finding.

## Protocol

1. **Minutes 0–15, read only.** Say each comment out loud, as if he's watching your screen.
   Then add one line per finding to `REVIEW.md`: the line number, what the **user** sees go
   wrong, why it happens, the fix, and a severity (blocker / must fix / nit).
2. Take one fast pass over the whole file before you go deep on anything. There are more problems
   than most reviewers find in 15 minutes, so **rank them**: what blocks the merge?
3. **Minutes 15–20, run it** (`npm install && npm run dev`). For each finding, try to reproduce it
   and note what you saw in the log or on screen. A finding you can't reproduce is still worth
   keeping. Mark it "unconfirmed".
4. At the buzzer, end `REVIEW.md` with: your verdict (approve / request changes) and one line on
   what you'd require of this PR **because** it was AI-written.

**Do not open `AFTER-THE-TIMER.md` until the 20 minutes are up.**
