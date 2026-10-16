# Evaluation: exercise 0006, review the PR (2026-10-16)

**4/7.** Verdict "rejected" (correct). Line numbers matched the original file.

| # | Bug | Found | Notes |
|---|---|---|---|
| 1 | XSS via `dangerouslySetInnerHTML` | yes | "Absolutely not". Fix: DOMPurify + block scripts/images. No sandboxed iframe or separate origin. Listed last, unranked. |
| 2 | Race in `MessageBody` effect | **no** | He fixed this exact bug by writing code in 0005 #6. He didn't spot it when reading. |
| 3 | Mutation + same array in `toggleFlag` | yes | Mechanism and fix right. Confirmed by running it (PATCH sent, UI unchanged). The only finding with a severity label. |
| 4 | Stale closure in keydown effect | **no, looked at it** | Line 42: "different onMount effects, group that code together". He read `[]` as "on mount" and stopped. The `eslint-disable` above it wasn't commented on. |
| 5 | Interval without cleanup | yes | "No cleanup for setInterval". The consequence (keeps polling, doubles on re-toggle) wasn't stated. |
| 6 | `key={index}` | yes | Correct, and he named reordering. The consequence ("reviewed" tick moves to another message) wasn't stated. |
| 7 | No error path on body fetch | **no** | |

- **"What the user sees": empty on every line.** He wrote mechanisms, not impact. In the interview,
  impact is the Staff signal ("a reviewer escalates the wrong message").
- **Ranking:** none, apart from "Major" on #3.
- **AI line:** "tests always". That's true of any PR, not AI-specific. The AI-specific tell in this
  PR was the disabled lint rule, plus "I clicked through it and it works".
- Smell: derived state in an effect (`filtered`) wasn't mentioned.
- Stated as process: "we cannot be asking for review without tests". Good, and he should keep it.
