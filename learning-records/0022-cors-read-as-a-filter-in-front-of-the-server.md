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
