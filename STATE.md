# State

_Updated 2026-11-22. Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`. Scores and closed items: `HISTORY.md`._

## GR loop closed (10-26)

Global Relay round 2 done 10-23; offer at **Senior**, not Staff. **Never raise the interview or
ask about it** (his rule, 10-26). The sprint record is in `HISTORY.md` → "GR loop closed". Back on
the Staff roadmap: the tracks paused 10-17 are restored below.

## Now: Geomagical Labs loop (screen done 11-23, felt good; awaiting invite)

Pod lead, ~50/50 code/lead, owns frontend architecture + technical roadmap. Debrief:
`career/private/2026-11-23-geomagical-debrief.md`. Rounds left: 2 pair programming (practical, not
LeetCode) · 3 architecture whiteboard · 4 product (measuring the right feature) · 5 CTO.
Prep in round order: practical timed builds talking out loud → RADIO lesson 5 + Kreativ-style
design drills → one product/metrics career session → MCP explained correctly in 60 s.
Round 2 setup (his guess): shared browser IDE (CoderPad-style), likely no AI, docs/MDN fine, he can
ask the engineer. Build round-2 reps in that shape: docs allowed, no AI, an ambiguous requirement
that only resolves if he asks (answers in a file he opens by asking).
MCP: verified explanation given 11-23 (spec + Bedrock Converse docs). His ask: a separate Q&A on it,
cold teach-back, then a 60 s interview version. 11-23: confirmed one Python service
(orchestrator runs the loop + tool handlers); tools call the backend REST API, not Mongo; viewer tools return
`viewer_command` the frontend runs via the viewer SDK. 60 s version given; he says it back next.
**Next: exercise 0012 room planner** (round-2 rep, 45 min, built 11-23). I play the pairing engineer
in chat; R5's room-bound rules are deliberately unstated (answers in its AFTER-THE-TIMER). Grade asked-or-not.
Security track stays paused until the loop ends.

## After the interview: grade lesson 12 (S2, AuthN from zero)

[Lesson 12](lessons/0012-who-are-you-again.html) built 10-29: S1 warm-up (navigations never meet CORS),
then password storage, sessions (fixation, timeouts, logout), passkeys. He pastes the cold answer and the
retrieval check (key `0012-check`) and says the fixation trace back in his own words. Grade with
`grade-exercise`'s rigour, log in a new LR, then S3 (retake/rebuild lesson 6).

## Security, AuthN and AuthZ: zero to hero (his ask, 2026-10-08)

For system design rounds and Staff discussions. One lesson per session, from zero, each ending in
a cold retrieval check against a clock. Sources: `RESOURCES.md` auth section; fetch RFC 9700 and
OWASP API Top 10 before S5 and S7.

| # | Lesson | Status |
|---|---|---|
| S1 | How the browser talks to servers: origins, cookies, SOP, CORS, the two gates | lesson 11: 1/5; retests 10-28 1/5, 10-29 5/5 (LR-0022). Cleared |
| S2 | AuthN from zero: password hashing, server sessions (ID, store, fixation, timeouts, logout), MFA/passkeys | lesson 12 built 10-29 |
| S3 | Attacks on a logged-in user: XSS, CSRF, cookie flags, CSP. [Lesson 6](lessons/0006-the-browser-attaches-the-cookie.html) exists: retake or rebuild after S1–S2 | lesson 6: 2/5 (LR-0014) |
| S4 | Tokens: JWT, signing and validation, sessions vs JWT, access + refresh, revocation | |
| S5 | OAuth 2 and OIDC: delegation, roles, Code + PKCE, ID vs access token, SSO | |
| S6 | SPA login architectures: BFF, token-mediating backend, browser client, server sessions | |
| S7 | AuthZ: RBAC/ABAC/ReBAC, enforce on the server, scopes vs permissions, multi-tenancy, BOLA | |
| S8 | Staff synthesis: auth in a design round, out loud, against a clock; one reference sheet | |

His setup (Node BFF, Passport + Auth0, express-session) only places him; never teach VEERUM's code.

## Weekly rhythm (40–60 min a day; bends to his day)

Mon–Thu: security lesson or a timed exercise · Fri: frontend system design · Sat/Sun: career.
**System design track:** Lesson 5 (RADIO, built, unworked) first, ~30 min; he brings the
chat-channel drill /4 and quiz /3; grade decision 1 on picking cursor *because of* C3. Then one a
week: data grid/dashboard, autocomplete, design system, news feed, chat (confirm order against
`research/2026-hiring-landscape.md`).

## Queue after the security track (09-26; GR already covered some)

1. Exercise: evolving AI-allowed build (grid robot, three requirement drops).
2. Code review exercise: a flawed PR diff against a clock (0007 reps done; next must need a sequence simulated, LR-0019).
3. Lesson 4: rendering, hooks and the event loop (LR-0011; lessons 8–9 covered part).
4. Project deep dive (career session).
5. Bonus: Web Worker vs Service Worker sheet.
Then Phase 2, engineering with AI (`MISSION.md`).

## Carry-over from GR (fold into reps as warm-ups, 5 min, cold)

- Hook drills 0010 cold retest 11-22: 9/13 (#3 guard held; #2 1/4, returned cleanup nobody calls),
  coached to 13/13 (LR-0023). **Retest #2 cold ~11-29**, from the stub; ask who calls a returned fn.
- `withTimeout` drops the input's rejection; clear every timer you start (LR-0019 stop conditions).
- Cleanup timing and a stale-response sequence (LR-0021).
- CSS: `div .selected` is descendant; cascade ≠ inheritance; specificity tuple.
- Big-O of idiomatic JS (`reduce`+spread, string `+=`, `includes` in a loop) (LR-0020).
- INP phase 2; `useEffect` before paint when an interaction caused it.

## How to work with him now

**Teach-back works (10-28):** concepts clicked when he restated them in his own analogy (effect runs as
"parallel timelines", hooks as a class constructor) and I corrected the analogy. Ask him to say it back.
He may answer by voice dictation (macOS), so expect mistranscribed terms. Typed mocks are dropped
(his call, 10-15): he rehearses out loud alone. Don't end turns with "move on?". He says when.
Never remind him of the clock or prompt him for interview recall; he manages his time and brings
the debrief himself (his rule, 10-16).

## What we know about him (detail in `learning-records/INDEX.md`)

- **Real voids outside React. Teach from zero** (LR-0014, LR-0015).
- Review finds bugs on a line, misses bugs that need a sequence simulated (LR-0019, held on rep 2).
- Reads the effect `ignore` flag as noise; no model of when cleanup runs (LR-0021).
- Knows complexity in the abstract, doesn't apply it to his own JS (`reduce`+spread) (LR-0020).
- Recalls what a tool does, omits when it fails (lesson 7 cold check, 10-17).
- Placement of request-effect parts holds under a clock (LR-0013).
- Finishes what he starts, but starts too few things (LR-0010). Protocol in `build-exercise`.
- A constraint he states doesn't carry into later design decisions (LR-0007).
- Scenario-phrased requirements don't become tasks; he doesn't ask when stuck (LR-0009, LR-0013).
- No model of microtask ordering relative to effects (LR-0011).
- A smooth rewrite isn't a checked one. Ask for evidence (LR-0011).
- TypeScript strong, generics a miss (Q14). React 19 knowledge current.
- Material read once, without application, falls out within 24 h (LR-0017).

## Open, not yet scheduled

- Request state as a discriminated union is unmeasured.
- Generics (Q14): fold into a component-API exercise.
- `invalidateQueries` prefix matching missed in 0005 (LR-0013).
- Upgrade 0006's `eslint-plugin-react-hooks` (4.6.2, predates `useEffectEvent`) before reusing it.
