# State

_Updated 2026-10-26. Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`. Scores and closed items: `HISTORY.md`._

## GR loop closed (10-26)

Global Relay round 2 done 10-23; offer at **Senior**, not Staff. **Never raise the interview or
ask about it** (his rule, 10-26). The sprint record is in `HISTORY.md` → "GR loop closed". Back on
the Staff roadmap: the tracks paused 10-17 are restored below.

## Next session: grade S1 (lesson 11)

Built 10-26: `lessons/0011-the-request-pipeline.html` (~35 min). Four stops (gate 1 sent?, gate 2
cookies?, server, gate 3 read?), jar rules, origin vs site, 8-scenario trace, header tokens vs
cookies. Retrieval = lesson 6's 5-item drill cold + "CORS protects our API?" (target 4/5+, verdict
**and** rule). He pastes the cold answer, traces A–H and the check as first written. Grade, write an
LR, then S2 (`/teach authentication from zero`). Lesson 6 check 1 (token storage) moves to S3.

## Security, AuthN and AuthZ: zero to hero (his ask, 2026-10-08)

For system design rounds and Staff discussions. One lesson per session, from zero, each ending in
a cold retrieval check against a clock. Sources: `RESOURCES.md` auth section; fetch RFC 9700 and
OWASP API Top 10 before S5 and S7.

| # | Lesson | Status |
|---|---|---|
| S1 | How the browser talks to servers: origins, cookies, SOP, CORS, the two gates | lesson 11 built 10-26, ungraded |
| S2 | AuthN from zero: password hashing, server sessions (ID, store, fixation, timeouts, logout), MFA/passkeys | |
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

- Hook drills 0010 #2 (debounce: fn ref + timer) and #3 (guard in `catch`, return, clear loading): 5/13 at bedtime.
- `withTimeout` drops the input's rejection; clear every timer you start (LR-0019 stop conditions).
- Cleanup timing and a stale-response sequence (LR-0021).
- CSS: `div .selected` is descendant; cascade ≠ inheritance; specificity tuple.
- Big-O of idiomatic JS (`reduce`+spread, string `+=`, `includes` in a loop) (LR-0020).
- INP phase 2; `useEffect` before paint when an interaction caused it.

## How to work with him now

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
