# CORS is credited with every blocked read; XSS recognised by API, not by payload

2026-11-28, lesson 13 (S3, CSRF/XSS/CSP from zero). Retrieval check **3/4**. Warm-up 1/2, cold 2/2,
Apply 1 2/4, Apply 2 (CSRF) 3/5, Apply 3 (XSS review) 4/4, Apply 4 (CSP) 2/4 (all "yes", no signal).

## Finding 1: "the response is blocked by CORS", for navigations, three times

Warm-up (1) `form.submit()`, Apply 2 (2) link click, check (2). Coached on 11-25 (LR-0024) and restated
correctly then; back three days later. The verdicts are right (the action happens, the attacker reads
nothing), so it's the mechanism: he has one cause for "attacker can't read" (CORS). Missing: a navigation's
response goes to the **tab**, not to the attacker's script; CORS only gates a script reading a
response. Interview risk: "CORS blocks the response" on a form CSRF signals the LR-0022 model.

## Finding 2: XSS recognised by API, not by payload

Apply 1: a stored `<img onerror=…>` rendered as HTML → "neither"; a reflected `?q=` in an emailed link →
"phishing". Apply 3 (code with `dangerouslySetInnerHTML`, `href`) 4/4. He spots the React escape hatch,
not "attacker text running as code" when shown the payload.

## Finding 3: CSP and Fetch Metadata have no model

CSP: "yes" to all four (inline handler, un-nonced script both run in his answer). Fetch Metadata: "I don't
know what it is", after reading §2's table (LR-0017 shape).

## Finding 4: fixation folded into CSRF

Check: "if it is a Fixation attack…" under CSRF, and session regeneration listed as a CSRF defence.

## What held

Cold: CSRF and XSS both named with mechanism before reading. Lax: cross-site POST and `<img>` get no
cookie, a link GET does (2/2 mechanisms). HttpOnly: XSS can't read it but still sends it (Apply 3 (4), and
cold). Fixation warm-up 1/1: the attacker already holds the ID (LR-0024's miss closed).

## What to do

1. In chat now: who receives the response (tab, attacker's script, iframe), by application.
2. Re-teach CSP (nonce, inline handlers) and Fetch Metadata from zero in chat; rerun Apply 4 and (5) cold.
3. XSS: drill from payloads, not code ("where does this text end up, and does the browser run it?").
4. Cold S3 retest with the S2 retest ~12-02.

## Repair in chat, 11-28

- Response destinations taught (same tab / hidden iframe → SOP / fetch → CORS). He asked whether
  `form.submit()` opens a new tab and whether `preventDefault` stops it: no model of submit() as a
  same-tab navigation that fires no submit event.
- Check: `fetch` POST with a `URLSearchParams` body and `SameSite=None` → "needs a preflight, CORS stops it,
  no transfer". Wrong: form-urlencoded is a simple request, so the transfer runs. LR-0022's "preflight on every
  POST" is back. Taught the rule: without a preflight, a script may send only what a form could.
- `credentials`: didn't know a cross-origin `fetch` omits cookies by default (LR-0022 finding 2, again).
  Taught: navigations/subresources attach by default; cross-origin fetch needs `include`; SameSite decides last.
- Preflight verdicts after the rule: 3/4. String body sent, DELETE and JSON preflight. FormData "sent if
  text/plain": verdict right, reason wrong (FormData is always multipart/form-data, a simple type).
  Same-day result; retest cold ~12-02.
- XSS from payloads: 4/4 verdicts (`onmouseover` via innerHTML, React text, reflected `?q=`, look-alike
  domain = phishing); reason given only on (1).
- CSP from zero (nonce per response, inline handlers, npm package, fixed nonce): 4/4.
- Fetch Metadata from zero: 4/4 (re-scored: mechanism right). (2) unsure whether a relative `fetch("/api/…")` from app.example.com is
  same-origin; his conditional rule was right. (4) XSS passes: right, no reason.
All same-day after teaching. The ~12-02 cold retest decides whether the S3 repairs held.
