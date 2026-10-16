# State

_Updated 2026-10-15 (evening). Earlier: 2026-10-08, every lesson starts from zero and
Security becomes a track ([LR-0015](learning-records/0015-from-zero-and-a-security-track.md)).
Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`._

## Next session

**Global Relay round 1 done 2026-10-16** ([LR-0018](learning-records/0018-gr-round-1-was-js-fundamentals.md)).
**Round 2:** he shares his screen, gets React code, and answers "what happens / what's missing / how
does it behave / how would you review it"; maybe a small build from scratch; an AI-team interviewer
may ask LeetCode. Likely the week of 10-19; plan as if it's **Tue 10-20**. Later: a senior leadership round.
Pay confirmed CAD 180-200k + 4%. GR is building its AI code-review strategy: item 4 adds that answer. Skill `career-session` for GR; `build-exercise` for reps.

**GR sprint (agreed 10-16; replaces the security track until the GR loop ends). The challenge round is the priority: items 1 and 3 first. Sat: 1 + 2. Sun: 3 + 1. Mon: 1 + 4 + 6.** He works in slots as they open, including before Sat: always tell him the length of the next item up front. If items run out before round 2, add more.
1. **Code-review reps (30 min each incl. grading).** Rep 1 built: `exercises/0006-review-the-pr` (7 planted bugs, verified red/green with Playwright; grade with `AFTER-THE-TIMER.md`). Reps 2-3 to build: 15-20 min each, a React component with 3-5 planted
   bugs (stale closure, missing cleanup, wrong deps, key misuse, effect ordering, race, derived
   state). He answers out loud: what renders, what breaks, the fix. This is queue item 3, moved up.
2. **JS fundamentals drill (20 min):** `this` (4 call-site rules + arrows +
   lost `this` in callbacks), `==` coercion, closures in loops, hoisting/TDZ, event loop order
   (LR-0011 gap), promises/async.
3. **A from-scratch build (45 min + 15 grading)** (Vite + React + TS: fetch, list, filter, loading/error). Exercise 0006, reshaped.
4. **Three Staff answers out loud (10 min each):** reviewing AI-written code (team policy), migrating a legacy JS framework to React (strangler, React
   islands, a shared design system, a Playwright safety net), and Redux to TanStack Query (to make
   his round-1 claim defensible; see `career/private/2026-10-16-global-relay-debrief.md`).
5. Fix the 6 s to 3 s story's cause (TTI was removed in Lighthouse 10; re-renders don't move a load metric).
6. LeetCode (25 min per problem): only easy/medium arrays, hashmaps, strings, and only if the recruiter confirms it.

Open recall items (LR-0016/17, warm-up 10-16 ~2/5): INP phase 2 (processing), useEffect runs
*after* paint, RUM behind login, CSP nonce + `strict-dynamic`. Fold them into the reps; no more CSP drilling.

He may answer by voice dictation (macOS), so expect mistranscribed terms. Typed mocks are dropped
(his call, 10-15): he rehearses out loud alone. Don't end turns with "move on?". He says when.
Never remind him of the clock or prompt him for interview recall; he manages his time and
brings the debrief himself (his rule, 10-16).

### Then (paused for the GR loop)

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

1. Exercise 0007+: an evolving, AI-allowed build (grid robot, three requirement drops).
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
