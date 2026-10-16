# Review of PR #482

| #   | Line | What the user sees | Why | Fix | Severity | Confirmed (log/screen) |
| --- | ---- | ------------------ | --- | --- | -------- | ---------------------- |
| 1   |      |                    |     |     |          |                        |

25 - No cleanup for setInterval
36 - that doesnt work, its supposed to be message.!flagged, and we are mutating here instead of returning a new array with the value updated for that particular message.
42 - different onMount effects, group that code together for better readability
69 - its better to use the message.id as index as this is uniq, using only the index can cause inconsistencies at render if the order of filtered messages changes.
130 - Absolutely not, we cannot use dangerouslySetInnerHTML. html has to be sanatized with DOMPurify, block out of origin scripts and images.

Other, we need to add tests as part of the PR. We cannot be asking for review without tests.

Bug: After running The flag is not changing properly (not being updated in the UI) but the call is made and its been updated in the backend. (Mayor)

**Verdict:**
Rejected

**What I'd require because it was AI-written:**
We need to add tests as part of the PR always, PRs with no tests will be rejected. (Some exceptions may apply)
