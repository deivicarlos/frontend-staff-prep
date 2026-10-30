# CORS is still read as a filter in front of the server, after a third teaching

2026-10-26, lesson 11 (S1, the request pipeline). Cold check (lesson 6's drill): **1/5**, 2/5 on
10-07. Jar 2/6, origin/site 4/6, traces A–H about 3/8, public API partial.

## Finding 1: preflight and CORS are applied to every request, and placed before the server

He wrote this with the four-stop table directly above it:
- A preflight on simple GETs (A, B, C), on a same-origin fetch (check 5, "blocked"), and on curl (G).
- Requests "not made" when the cookie is withheld (cold answer, C). That's the LR-0014 collapse
  again: gate 2 read as gate 1.
- CORS rejects requests "without reaching the server" (G), and blocks a cross-site form POST
  (check 1: right verdict, wrong rule).
- F: an XSS inside app.shop.com is "not readable", so the same-origin request is treated as foreign.
H (both mistakes shipped) was fully right, so he can run the stops when every one of them applies.

LR-0016's "preflight closed (4/4)" didn't hold 11 days later. The model he falls back on is one
gate: "CORS checks every request at the door".

## Finding 2: the jar rules aren't there

He said `http:` sends a Secure cookie, that a host-only cookie goes to a subdomain, that
"subdomains are same origin", and missed schemeful site and `github.io` as a public suffix.
`fetch`'s default `credentials: same-origin` was unknown (B: "cookie sent").

## What to do

Not S2 yet. A repair on two rules only, by application, with no reading: (1) preflight happens only for a
script request that is cross-origin **and** does something a form couldn't. Forms, links, images,
same-origin requests and curl never get one. (2) The server runs before the read check, so CORS
can't stop side effects of a sent request. Drill it as rapid verdicts, then retest lesson 11's
check cold on another day (target 4/5) before S2.

## Cold retest, 10-28: 1/5 (target 4/5), (6) unanswered

Repair round 3 (5/5 preflight, fetch-only cases) didn't transfer. Every answer ran preflight + CORS:
- (1) Right verdict and rule (Lax keeps the cookie home), plus "does preflight, no request to backend".
- (2) and (4): form/link "blocked by CORS". Neither is a script request, so CORS never runs.
- (3) "Cookies added, request goes to backend, CORS blocks read" → "blocked". The delete ran by his
  own trace, so he scored a read block as a stopped attack. New: he doesn't ask what the attacker needs.
- (5) A relative `fetch` inside app.example.com read as "cross-origin same site".

The rounds drilled fetch() cases; the check is forms, links and images. Next repair has to start
from the initiator (navigation/subresource vs script) and the attacker's goal (side effect vs read).
He says he misread (2) as a script GET, not a link. Scored out of 4 that's 1/4, and his rule for (2)
("cookies added, CORS blocks") is still the read-block error from (3).

## Repair round 4, 10-28 (initiator + attacker goal)

Cross-site/same-site fetch, 3/3: names the server running before the read and the side effect.
Form POST with SameSite=None: "deleted" right, but "response not read because of CORS" (skipped
the initiator; a navigation never meets CORS). `<img>` GET with Lax: "cookie added, basic GET",
wrong (Lax = top-level navigation + safe method). Then a/img/iframe/window.location: 4/4 verdicts;
iframe reasoned as "same as img", window.location as "new tab". Held: CORS out of non-script
requests, read ≠ side effect. Shaky: Lax's top-level rule. Retest §5 cold on a later day.

## Cold retest, 10-29: 5/5 (target met), (6) half

The answers don't match the 10-28 log, so they are graded as a fresh cold take.
- (1), (3), (5) right, with the right stops: no cookie on a cross-site POST or an `<img>`, and
  relative fetch read as same-origin. Preflight now appears nowhere, which is the 10-26 fix holding.
- (4) Right verdict and rule (same site, so SameSite never applies), plus "CORS will block the
  response". It's a form, so CORS never runs.
- (2) First graded a miss: "CORS blocks it but it is actioned" → "blocked". Flipped on his appeal:
  he read "blocked" as naming what blocks the response, and (4) has the same trace scored "succeeds",
  so side effect vs read holds. Deciding rule (Lax top-level GET sends the cookie) was right. The
  CORS-on-a-navigation add-on is still wrong, the same as in (4).
- (6) Half: CORS doesn't stop CSRF, and simple requests get through. "Good cookie policy prevents
  it" is wrong by his own (4) and (5). The server needs its own authN/authZ, CSRF tokens or Fetch Metadata.
Residual: "CORS blocks the response" still gets attached to forms and links. S2 can start; open
with a 2-minute warm-up (navigation vs script, who won when the side effect ran).
