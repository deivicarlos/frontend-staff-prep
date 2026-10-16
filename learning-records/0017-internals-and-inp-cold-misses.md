# Preflight held overnight; React internals and INP phases missed cold the day before the interview

2026-10-15, Global Relay interview prep (career session), the evening before the interview.

## Evidence

- Preflight cold after a night: 2/2 correct verdicts. Scenario 2 (simple credentialed POST) he said
  "the post will run", which he missed on 10-14. Two wording slips: "CORS blocks cross-origin
  by default" (it's the SOP; CORS relaxes it), and he blended gate 2 (cookie) into a gate 1 failure.
- CSP cold: miss for the 4th time. He answered with an iframe + URL allowlist, i.e. B's answer.
  Rebuilt from the mechanism (CSP protects the app itself; nonce vs allowlist; Report-Only).
  Re-ask: rollout 3/3, `script-src` content still absent. He says he'd look up the syntax.
- Archived email: 2/3 layers (sanitize, sandbox). Separate origin missing a 2nd time.
- Session ID vs token: correct. He pushed back well: with a home-grown password login the
  backend *is* the issuer. Accepted. Frame it as a role: "whoever holds the signing key".
- Rapid-fire on yesterday's material + internals: 2.5/7. Right: state split, SPA vs SSR, CWV
  thresholds. Missed: CWV names (CLS), INP phases, Lighthouse can't measure INP / RUM behind
  login, render vs commit, effects timing, **key change remounts** (an identity question,
  his former strong area).
- Re-ask 10 minutes later, reworded: ~2.5/4. Render/commit right, key-reset trick right but
  the reason was "it causes a re-render" (it's a remount). INP: only input delay of three phases.
  "Real number": "test it myself", not RUM.
- He said "a Staff cannot be a master of all" on two misses. He was tired.

## His decisions

- Skip typed mock interviews: typing answers costs too much time. He rehearses out loud alone.

## What to watch

- After the interview: ask which questions he actually got and which of these came up.
- Taught yesterday ≠ retrievable today. CWV/INP was read once, never applied; it fell out in
  24 h. Material read without application doesn't survive a night for him.
- Identity under a new phrasing ("key changes at the same position") missed. Re-check with
  the remount-vs-re-render distinction.
