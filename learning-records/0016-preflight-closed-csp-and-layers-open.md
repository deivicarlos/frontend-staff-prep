# Browser request model closed in one session; CSP and layered answers still open

2026-10-14/15, Global Relay interview prep (career session), security block 1 taught in chat.

## Evidence

- Benchmark cold (5 questions): 2.5/5. Q5 said CORS stops CSRF "if you allowlist origins",
  contradicting his own Q1. Same gap as LR-0014.
- Four rounds on preflight. Rounds 1–3: he attached a preflight to any cross-origin or any
  `fetch` (A, C, E, 2, 3) and believed a failed preflight still lets the request through (F).
  What fixed it was the *reason*, not the rule: preflight exists because `fetch` gave scripts
  powers a link/img/form never had (JSON, PUT/DELETE, custom headers). Round 4: 4/5
  (missed `Authorization` as a custom header). Closing set: preflight 4/4, cookie and
  CORS scenarios 2/2.
- Closing set misses: CSP (couldn't define it or the rollout, 3rd time), archived-email rendering
  (gave one layer of three, 2nd time), "CORS protects our API?" (missed: protects the user's
  browser, not the server).
- His questions went past the material unprompted: who rejects a request with no cookie,
  compromised devices, in-memory tokens vs XSS, BFF session vs token ownership, signing keys,
  where the client secret lives, multi-tenant IdPs, and tenant enumeration via the org picker,
  which he raised himself.

## My errors

- I used `credentials: 'include'` and multi-tenancy in questions before teaching them. He
  called it out. Rule: a question may only use concepts already taught.
- CSP was given as summary lines (lesson 6, prep file), never built from zero. Built
  2026-10-15.
- He asked me to stop ending turns with "want to move on?". He says when to move on.

## What to watch

- Re-test preflight cold after a night (E/F style) before building on it.
- Application answers need all their layers (email: sanitize + sandbox + separate origin;
  CORS: user vs server). Ask for "all layers" explicitly.
- BFF: the session ID (the BFF creates it) vs the access token (the issuer creates it) confused
  him twice. Check it cold.
