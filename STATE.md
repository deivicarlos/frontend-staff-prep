# State

_Updated 2026-10-14. Interview Fri 2026-10-16 with Global Relay; prep in
`career/private/2026-10-16-global-relay-prep.md`. Earlier: 2026-10-08. Lesson 6 graded and repaired. New rule: every lesson starts from zero.
Security becomes a track ([LR-0015](learning-records/0015-from-zero-and-a-security-track.md)).
Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`._

## Next session

**Global Relay interview prep until Fri 2026-10-16, 10:30 PDT** (30 min, Lead SWD, same posting as
the 10-06 screen). Skill `career-session`. Pay and logistics are settled with the recruiter: don't raise them.
Done 10-14/15: GR summary, Core Web Vitals, SPA/SSR (he has no SSR experience; knowing it is enough),
security block 1 + BFF/tokens/SSO/multi-tenant, all in the prep file §2b–2g ([LR-0016](learning-records/0016-preflight-closed-csp-and-layers-open.md)).
**Next (Thu 10-15):** (1) cold preflight re-check, E/F style, 2 scenarios. (2) Cold check on CSP rollout,
email layers, session ID vs token. (3) **Mock**: Claude as Benjamin, mixed (opener, perf/CWV, state,
security, a verbal design question like "a UI to review millions of archived messages"), follow-ups,
grade on answer-first / correct / concise. Questions use only taught concepts. Don't end turns with
"move on?". He says when.
After Friday: grade the interview from his recall, then resume S1 below (block 1 partly covers it).

### Then (paused for the interview)


**Build Security track lesson S1** (he types `/teach browser security from zero`, then skill
`build-lesson`). Start from zero, per the CLAUDE.md rule. S1 is the base that lesson 6 assumed
and he didn't have:
HTTP request/response, origin vs site, how cookies are set, stored and attached (by destination,
whoever starts the request), the same-origin policy, CORS and preflight. Teach it as **two gates**:
gate 1, preflight/CORS, decides whether the request is sent. Gate 2, SameSite/Domain/Path/Secure,
decides whether the cookie goes with it. `HttpOnly` is in neither. It only stops JS reading the cookie.
**Retrieval check:** lesson 6's cookie-flags drill (5 attacks) and its retrieval check 1, cold.
The target is 4/5+. Fold in what he asked on 2026-10-07: where a request without a cookie gets
rejected (app auth middleware, not the load balancer), and why public APIs use header tokens.


## Security, AuthN and AuthZ: zero to hero (his ask, 2026-10-08)

Aimed at system design rounds and Staff discussions. One lesson per session, from zero, each one
ending in a cold retrieval check against a clock. Sources: `RESOURCES.md` auth section; fetch
RFC 9700 (OAuth security BCP) and OWASP API Top 10 before S5 and S7.

| # | Lesson | Status |
|---|---|---|
| S1 | How the browser talks to servers: origins, cookies, SOP, CORS, the two gates | **next** |
| S2 | Authentication from zero: proving identity, password hashing, server sessions (ID, store, fixation, timeouts, logout), MFA/passkeys overview | |
| S3 | Attacks on a logged-in user: XSS, CSRF, cookie flags, CSP. [Lesson 6](lessons/0006-the-browser-attaches-the-cookie.html) exists. Retake it after S1–S2, or rebuild it | lesson 6: 2/5 ([LR-0014](learning-records/0014-auth-the-browser-model-is-missing.md)) |
| S4 | Tokens: what a JWT is, signing and validation, sessions vs JWT, access + refresh, revocation | |
| S5 | OAuth 2 and OIDC from zero: the delegation problem, roles, Code + PKCE, ID vs access token, SSO | |
| S6 | Login architectures for SPAs: BFF, token-mediating backend, browser client (RFC 10017 §6), server sessions; place his BFF on the map | |
| S7 | Authorization: authN vs authZ, RBAC/ABAC/ReBAC, enforce on the server (the UI only hides), scopes vs permissions, multi-tenancy, object-level authorization bugs | |
| S8 | Staff synthesis: auth inside a design round, out loud, against a clock; one reference sheet for the track | |

Scope rule (2026-10-06): **teach the field, never VEERUM's code.** His setup (Node BFF,
Passport + Auth0, express-session, `connect.sid` HttpOnly/Secure/Lax) is used only to place him.

## Live: a Staff React screen through a recruiter

Company: **Global Relay** (Vancouver). Screen passed, 1st interview Fri 2026-10-16. Five written
answers in `career/private/2026-10-06-staff-react-screen.md`. Open: pay band, on-site vs remote.

## Weekly rhythm (40–60 min a day; bends to his day)

Mon–Thu timed exercises · Fri frontend system design · Sat or Sun a career session. The security
track takes the daily slot while the screen is live.

**System design is a track** (2026-10-06): Lesson 5 (RADIO, built, unworked) first. It is worked in
~30 min, and he brings the chat-channel drill score /4 and the quiz score /3. Grade decision 1 on picking cursor
*because of* C3. Then one design lesson a week: data grid/dashboard, autocomplete, design
system, news feed, chat. Confirm the order against `research/2026-hiring-landscape.md`.

## Queue after the security track (agreed 2026-09-26)

1. Exercise 0006: an evolving, AI-allowed build (grid robot, three requirement drops).
2. JS utilities drill, no AI, 25 min (debounce/throttle, Promise.all, event emitter).
3. Code review exercise: a flawed PR diff against a clock.
4. Lesson 4: rendering, hooks and the event loop (LR-0011).
5. Project deep dive (career session).
6. Bonus: Web Worker vs Service Worker reference sheet, only once 1–5 are solid.

Then Phase 2, engineering with AI (`MISSION.md`). The old item "auth and backend diagnostic" is
absorbed into the security track.

## What we know about him (detail in `learning-records/INDEX.md`)

- **He has real voids outside React. Teach from zero** (LR-0014, LR-0015). In auth he named the right
  architecture (BFF) but had no browser model under it. Taught from zero, it landed the same day.
- Placement of request-effect parts holds under a clock (LR-0013).
- Finishes what he starts, but starts too few things, going depth-first (LR-0010). The protocol is in `build-exercise`.
- A constraint he states doesn't carry into later design decisions (LR-0007).
- Scenario-phrased requirements don't become tasks for him, and he doesn't ask when stuck (LR-0009, LR-0013).
- No model of microtask ordering relative to effects (LR-0011).
- A smooth rewrite isn't a checked one. Ask for evidence (LR-0011).
- TypeScript is strong, but generics were a miss (Q14). React 19 knowledge is current.

## Open, not yet scheduled

- Request state as a discriminated union is unmeasured. Check it when the async layer appears.
- Generics (Q14): fold into a component-API exercise.
- `invalidateQueries` prefix matching missed in 0005 (LR-0013).
- How he sounds out loud is unmeasured. Consider mock interviews.
