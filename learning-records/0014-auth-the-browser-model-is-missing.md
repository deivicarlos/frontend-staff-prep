# Auth: the right architecture, without the browser model under it

Lesson 6, 2026-10-07. The first measurement of the auth area. Drill **2/5**, retrieval 1
**1.5/5**, retrieval 2 **0.5/4**, quiz **1/4** (only the JWT `exp` question was right). Revocation 1/3.

## Finding 1: he names the right answer and can't defend it

The cold answer was already a BFF with tokens on the server. That is RFC 10017's recommendation.
The final answer added flags and CSP but said the BFF protects against CSRF, which is backwards:
the cookie is what *creates* CSRF exposure. In an interview he gets one follow-up, and
it lands on that.

## Finding 2: no model of when the browser sends a cookie, or what CORS does

- He marked every drill attack "blocked". He credited `Secure` and `HttpOnly` with stopping
  requests. Neither one changes whether a cookie is sent on an HTTPS request. Only SameSite,
  Domain and Path do that.
- He thinks of CORS as a server-side filter on incoming requests ("no CORS means it can get
  requests from other origins"). He doesn't know that the default is deny-read, that a preflight
  gates non-simple requests, and that simple requests go out anyway.
- Without those two facts, the flag table and the CSRF defences had nothing to attach to.
  Reading the reveals didn't fix it: the retrieval answers repeat the same misconceptions.

## Finding 3: revocation is read as "revoking the refresh token ends access"

He answered (c) 10:00, not 10:05. That is the lesson's central number: an access token outlives
a revocation. He answered (b) as 11:00, computing from the revocation, not the issue time.

## What changes

Do not build lesson 7 on this. First, repair the two browser facts with application in chat,
then retest the drill cold on a later day (spacing). Lesson 7 waits until the drill is 4/5+.
Lesson 6's reveals were sound, so the problem was ordering: the lesson assumed the browser model
was already there.

## Repair attempt, same day

He didn't know what a preflight is. He said Lax covers it but couldn't say whether the request
is sent. He credited `HttpOnly` with "preventing XSS" (it limits what XSS takes, it doesn't
prevent it). He asked for cookies to be explained from the beginning, which confirms finding 2.
The mechanics were taught from zero in chat (what the browser attaches to a request, the four
rules, same-origin policy, preflight).
