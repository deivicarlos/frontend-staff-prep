# State

_Updated 2026-10-07 (lesson 6 built: auth security part 1). Earlier: 2026-10-06 (Staff React
screen answers), 2026-09-26 (0005 graded, lesson 5 built). Plan re-set 2026-09-24
([LR-0012](learning-records/0012-reweight-to-what-screens-grade.md)); decisions in `MISSION.md`
and `career/CAREER.md`._

## Next session

**Lesson 6 graded 2026-10-07 ([LR-0014](learning-records/0014-auth-the-browser-model-is-missing.md)):**
drill 2/5, retrieval 1.5/5 + 0.5/4, quiz not reported. He names BFF but has no model of when the
browser sends a cookie or what CORS does. A repair drill was given in chat on 2026-10-07 (two rules + 3
items). Next: if he answered it, grade it. Then, **on a later day**, he redoes lesson 6's
cookie-flags drill and retrieval check 1 cold (clear the boxes in devtools or just write in chat).
**Lesson 7** (OAuth/OIDC + RFC 10017 architectures; brief kept in git history, commit f52584d)
waits until the drill is 4/5+. Sources: `RESOURCES.md` auth section.

**After that, he works Lesson 5** ([`lessons/0005-the-constraint-ledger.html`](lessons/0005-the-constraint-ledger.html),
built 2026-09-26, ~30 min). He brings two numbers: the chat-channel drill score (decisions that
cited the right ledger line, out of 4) and the quiz score (out of 3). Grade the drill on whether
decision 1 picks cursor *because of* C3 (deletes). Choosing page numbers because of deep links
would be the LR-0007 pattern repeating. Then the queue moves to item 2 below.

Exercise 0005: 4/6 timed, 6/6 after the clock (LR-0013).

## From week 2: the weekly rhythm (40–60 min a day)

- **Mon–Thu: timed exercises.** Formats: debugging a broken app, building from scratch, and
  AI-assisted work on material he already knows.
- **Fri: frontend system design.**
- **Sat or Sun: one career session** (applications, stories, the "why IC" answer).

The rhythm bends to what he says he has time for on the day.

## Inserted 2026-10-06, runs before the queue

**Interview prep: a Staff React screen through a recruiter.** All five written answers are done
in his wording, 2026-10-06 (the file `career/private/2026-10-06-staff-react-screen.md` holds my
drafts, plus the full posting and the five questions verbatim; his final text was pasted in chat). Prep targets this posting until he says otherwise. Lesson 6 (part 1) built 2026-10-07; lesson 7 (OAuth/architectures) next. Original brief: He did not build Veerum's
auth and never learned it. Scope, set by him 2026-10-06: **teach the field, not his codebase.**
No review of Veerum's code (he asked to drop the open-redirect and id_token findings). Cover:
- The ways to build login: server sessions; BFF (RFC 10017, Aug 2026); token-mediating backend;
  tokens in the browser. Trade-offs and the industry ranking.
- OAuth 2 / OIDC: Authorization Code + PKCE, ID token vs access token, refresh tokens, SSO.
- Sessions vs JWT: revocation, expiry, per-request cost.
- The attacks and defences: XSS and token storage, CSRF (he does not know it; start from
  zero), session fixation, cookie flags (HttpOnly, Secure, SameSite), CSP.
- What a Senior/Staff must be able to explain and defend out loud, drilled against a clock.
Verify every fact against primary sources (RFCs, OWASP cheat sheets, MDN). His own setup is a
BFF (Node proxy, Passport + Auth0, express-session in a separate store, `connect.sid` HttpOnly,
Secure, Lax), so use it only to place him on the map.
Still open: company, band, Canada eligibility (ask the recruiter).

**System design is a track, not one lesson** (he asked 2026-10-06). Lesson 5 (RADIO) is the
only one so far and is unworked. After it, one design lesson per week (the Friday slot), each
prompt against a clock. Candidates, ordered by fit to Staff postings: a data grid or dashboard
over a large dataset; autocomplete/search; a design system; a news feed; chat. Confirm the order
against `research/2026-hiring-landscape.md` before building.

## Queue, in order (agreed 2026-09-26)

Re-mapped to current round formats (`research/2026-hiring-landscape.md`, addendum 2026-09-26)
after he challenged the roomba, which rested on one 2021 screen. Every item needs a round that
asks for it.

1. **Lesson 5: system design (RADIO).** Unchanged. Highest-weight round, and weight rises at Staff.
2. **Exercise 0006: an evolving, AI-allowed build** (Shopify/Canva format). A grid robot, in his own
   IDE with AI, three requirement drops. Graded on directing the AI, extensibility, and tests.
   This pulls Phase 2 forward as a round format.
3. **JS utilities drill, no AI, 25 min.** Debounce/throttle, Promise.all, event emitter. Graded on
   edge cases (leading/trailing, empty input, ordering).
4. **Auth and backend diagnostic.** Unchanged. Postings: backend 20/24, security/auth 8/24.
5. **Code review exercise.** Review a flawed PR diff under a clock. A Staff signal.
6. **Lesson 4: rendering, hooks and the event loop.** Unchanged (LR-0011).
7. **Project deep dive:** a career session. One project told as architecture, trade-offs, and
   what he would change.

8. **Bonus: Web Worker vs Service Worker** (reference sheet, skill `build-lesson`). Only once items
   1–7 are covered and he performs them consistently. No round asks for it.

Once the frontend track is solid: **Phase 2, engineering with AI** (`MISSION.md`).

## What we know about him (the detail is in `learning-records/INDEX.md`)

- Placement: the request-effect parts (controller, abort in cleanup, guarded `finally`) landed
  first try under a clock in 0005 (LR-0013). Keep grading placement on new surfaces.
- He finishes what he starts but starts too few things, going depth-first with no time budget
  (LR-0010). The standing exercise protocol lives in skill `build-exercise`.
- In design, a constraint he states does not survive into later decisions (LR-0007).
- A requirement phrased as a scenario doesn't become a task for him: 0003, then 0005 req 5
  (LR-0009, LR-0013). He doesn't ask when stuck. The protocol now says to ask.
- He doesn't have the model for microtask ordering relative to effects (LR-0011).
- Writing it smoothly doesn't mean he checked it. Ask for evidence he checked, never whether he
  did (LR-0011).
- A hint that points at other code fails. The second time, name the exact line (LR-0011).
- TypeScript is strong. Generics were a calibration miss (Q14). React 19 knowledge is current.

## Open, not yet scheduled

- A discriminated union for request state has never been measured. Check it whenever the async
  layer appears in an exercise.
- Generics (Q14): fold into a component-API exercise.
- Identity bugs: keys are fine. `invalidateQueries` prefix matching was missed in 0005 (LR-0013).
- There is no live human feedback loop, so how he sounds out loud is unmeasured. Consider mock
  interviews later.
