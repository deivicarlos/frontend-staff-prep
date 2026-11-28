# State

_Updated 2026-11-28. Plan re-set 2026-09-24 ([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md));
decisions in `MISSION.md` and `career/CAREER.md`. Scores and closed items: `HISTORY.md`._

## Closed loops

GR: offer at Senior (10-26). **Never raise that interview or ask about it** (his rule). Geomagical:
rejected after the HM screen (11-24); his MCP answer is the likely cause, fixed by the project deep
dive (queue 4, pulled forward). Detail in `HISTORY.md`.

## Next session (Sun 11-29, a career day)

1. Warm-up, 5 min cold: hook drill #2 from the stub (due 11-29, see carry-over). Ask who calls a returned fn.
2. Project deep dive, pulled forward (skill `career-session`): he says the MCP chatbot 60 s version back
   cold (corrected text in `career/private/2026-11-23-geomagical-debrief.md`), grade it, then the rest
   of his recent work at that depth. It's his interview story, not a lesson on VEERUM's code.
3. Unscheduled: exercise 0012 room planner (45 min pairing rep), next weekday slot before 12-02.

## Then: cold S2 + S3 retest ~12-02, then S4

Lesson 12: 2/4 (LR-0024). Lesson 13: 3/4 (LR-0025). All repairs done in chat 11-28, same-day only:
response destinations + preflight + `credentials` 3/4, XSS from payloads 4/4, CSP 4/4, Fetch Metadata 4/4.
Retest cold, mixed, ~12-02: hash properties; session rules → what the attacker does; fixation; who
receives a response (tab / iframe SOP / fetch CORS); preflight only for what a form can't send;
cross-origin fetch omits cookies without `include`; CSRF defences → what each removes; XSS from a
payload; CSP verdicts; Fetch Metadata verdicts incl. a relative fetch. Score the mechanism, never the
name (his rule, 11-25). Pass ≥80% → S4 (tokens). Fetch RFC 9700 before S5.

## Security, AuthN and AuthZ: zero to hero (his ask, 2026-10-08)

For system design rounds and Staff discussions. One lesson per session, from zero, each ending in
a cold retrieval check against a clock. Sources: `RESOURCES.md` auth section; fetch RFC 9700 and
OWASP API Top 10 before S5 and S7.

| # | Lesson | Status |
|---|---|---|
| S1 | How the browser talks to servers: origins, cookies, SOP, CORS, the two gates | lesson 11: 1/5; retests 10-28 1/5, 10-29 5/5 (LR-0022). Cleared |
| S2 | AuthN from zero: password hashing, server sessions (ID, store, fixation, timeouts, logout), MFA/passkeys | lesson 12: 2/4 (LR-0024); retest ~12-02 |
| S3 | Attacks on a logged-in user: XSS, CSRF, cookie flags, CSP. [Lesson 6](lessons/0006-the-browser-attaches-the-cookie.html) exists: retake or rebuild after S1–S2 | lesson 6: 2/5 (LR-0014); lesson 13: 3/4 (LR-0025); repaired 11-28; retest ~12-02 |
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
- Recalls what a tool does, omits when it fails (lesson 7, 10-17); security rules without their attacks (LR-0024).
- Placement of request-effect parts holds under a clock (LR-0013).
- Finishes what he starts, but starts too few things (LR-0010). Protocol in `build-exercise`.
- A constraint he states doesn't carry into later design decisions (LR-0007).
- Scenario-phrased requirements don't become tasks; he doesn't ask when stuck (LR-0009, LR-0013).
- Skims prompts and drops stated setup (11-28, his words: "quick reading"). Have him restate the setup first.
- No model of microtask ordering relative to effects (LR-0011).
- A smooth rewrite isn't a checked one. Ask for evidence (LR-0011).
- TypeScript strong, generics a miss (Q14). React 19 knowledge current.
- Material read once, without application, falls out within 24 h (LR-0017).

## Open, not yet scheduled

- Reading Khononov, *Learning DDD* (O'Reilly), spare time, his pick 11-24. Not on the plan; tie strategic
  design (bounded contexts) into a system design drill when he reaches it.

- Request state as a discriminated union is unmeasured.
- Generics (Q14): fold into a component-API exercise.
- `invalidateQueries` prefix matching missed in 0005 (LR-0013).
- Upgrade 0006's `eslint-plugin-react-hooks` (4.6.2, predates `useEffectEvent`) before reusing it.
