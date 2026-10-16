# State

_Updated 2026-10-15 (evening). Earlier: 2026-10-08, every lesson starts from zero and
Security becomes a track ([LR-0015](learning-records/0015-from-zero-and-a-security-track.md)).
Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`._

## Next session

**Global Relay 1st interview: Fri 2026-10-16, 10:30–11:00 PDT** (11:30 Calgary). Lead SWD Benjamin
DeLong, same posting as the 10-06 screen. Prep: `career/private/2026-10-16-global-relay-prep.md`.
Skill `career-session`. Pay and logistics are settled: don't raise them. Check today's date and time
first, then pick:

- **Before the interview:** a 10-min warm-up only. Ask 5 one-line cold questions on the open items
  below, give a correction for each miss, no new material. Then send him to prep §1 and §3. No mocks.
- **After the interview:** grade it from his recall: which questions came, where he froze, which
  follow-ups Benjamin pushed. Write an LR, update the career status. Then resume S1 below.

Warm-up done 10-16 10:55 MDT, ~2/5 cold: key=remount hit; render/commit split ok but said useEffect runs before paint; INP phase 2 (processing duration) blank; RUM/web-vitals vague; CSP nonce + strict-dynamic missed a third time. Fold into the post-interview LR.

Open items (LR-0016, [LR-0017](learning-records/0017-internals-and-inp-cold-misses.md)): INP's three
phases + fix for each, render vs commit + effect timing, key change = remount (not re-render), RUM
behind login (Lighthouse can't measure INP), CSP `script-src` nonce + `strict-dynamic` (not URLs),
archived email's separate origin.

He may answer by voice dictation (macOS), so expect mistranscribed terms. Typed mocks are dropped
(his call, 10-15): he rehearses out loud alone. Don't end turns with "move on?". He says when.

### Then (paused for the interview)

**Security lesson S1** (he types `/teach browser security from zero`, then skill `build-lesson`).
From zero: HTTP request/response, origin vs site, how cookies are set/stored/attached (by
destination), SOP, CORS and preflight, taught as **two gates** (gate 1 CORS/preflight: is it sent;
gate 2 SameSite/Domain/Path/Secure: does the cookie go; HttpOnly is in neither). Most of this was
taught in chat 10-14/15 (prep §2e–2f): build on it, don't repeat it. Retrieval: lesson 6's
cookie-flags drill + check 1, cold, target 4/5+. Fold in: where a cookieless request is rejected
(app auth middleware), why public APIs use header tokens.

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

## Weekly rhythm (40–60 min a day; bends to his day)

Mon–Thu timed exercises · Fri frontend system design · Sat or Sun a career session. The security
track takes the daily slot while Global Relay is live.

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
- Material read once, without application, falls out within 24 h (CWV/INP, LR-0017).

## Open, not yet scheduled

- Request state as a discriminated union is unmeasured. Check it when the async layer appears.
- Generics (Q14): fold into a component-API exercise.
- `invalidateQueries` prefix matching missed in 0005 (LR-0013).
- How he sounds out loud is unmeasured. He rehearses alone; dictation could make mocks cheap.
