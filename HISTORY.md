# History

Archive of closed items and scores. Read on demand; STATE.md is the live file.

## Progress so far

| | |
| --- | --- |
| Lesson 1 — calibration | 11/20. Hooks 1/4, modern React 3/4 — an inverted profile: reading, not shipping |
| Exercise 0001 — typeahead | ~2/6 in 45 min. Constant `queryKey` ate the run |
| Lesson 2 — render is a snapshot | 5/6. Snapshot 2/2, effects 2/2 — the model landed |
| Lesson 3 — keyboard | 4/6. Cleanup 2/2 on untaught surfaces closes LR-0005; missed roving `tabindex` and `preventDefault` |
| Exercise 0002 — rebuild | ~2/6 again, but recomposed: debounce correct, deps correct, `AbortController` reached for. Cancellation wired but never armed |
| Design probe — news feed | ~3/6. Scroll compensation strong, Tailwind correctly judged non-load-bearing; offset pagination chosen one question after describing what breaks it |
| Exercise 0003 — keyboard layer | **4/6 in 20 min.** Arrow nav, focus model and scroll-into-view full; Enter guard and Escape absent, ARIA half-placed, stale index unreset. Protocol 1 of 3 |
| Sheet 1 cold rewrite | Three passes. Controller out of cleanup's reach, then unguarded `finally`, then correct. `Book[]` at source |
| Exercise 0004 — finish the job | **2/4 binary in 20 min.** Debounce and cancellation both pass — the 0002 `AbortController` is armed. Error and loading never started; clock went to an API lookup |
| Exercise 0005 — device list | **4/6 binary in 25 min.** API chain, queryKey, row key and detail-panel placement all pass. Invalidation scoped to one filter; outage not understood, not asked. Buzzer table empty |
| Exercise 0006 — review the PR | **4/7.** Caught line-visible bugs (XSS, mutation, key, interval); missed stale closure, race, error path (LR-0019) |
| Lesson 7 — why did it render | Quiz 4/4. Cold check: 3/3 triggers, `memo` blocks parent, **omitted the `Object.is` condition**. Task: `useEffectEvent` right; merged the listener into the mount effect, split after pushback (react.dev: one effect per sync process) |

**Reps remain the primary instrument** (LR-0006, unchanged). Exercise 0003 is the first exercise
to score above ~2/6 and the first where a lesson's central claim was visibly applied under a clock.

**The open axis is how he runs the clock, and it has narrowed twice.** LR-0009 called it
completion; [LR-0010](learning-records/0010-completion-closed-the-cost-moved-to-triage.md) closed
completion and moved it to **triage** — he finishes what he starts and starts too few things.
Alongside it sits the one knowledge axis still billing real minutes: **mechanical API recall**
(LR-0010 finding 3). Selection is live, mechanics are thin, and the lookups come out of a
20-minute clock. Reference sheets first, then the triage exercise.

## Closed

- **Completion criteria** ([LR-0010](learning-records/0010-completion-closed-the-cost-moved-to-triage.md)).
  Both requirements he touched in 0004 passed their done-conditions, with no scattered holes —
  the first exercise with none. He built the protocol himself. Stop designing exercises around it;
  keep binary scoring, which is what made it legible.
- **The keyboard.** Exercise 0003 at 4/6 on the layer that went unwritten in exercises 0001 and
  0002. Requirement 3 (DOM focus never leaves the input) full credit — lesson 3's central claim
  survived a clock. Stop treating it as a gap.
- **`preventDefault` vs `stopPropagation`** — lesson 3 Q4 miss, applied correctly under time
  pressure without a reminder ([LR-0009](learning-records/0009-the-re-read-is-the-load-bearing-step.md)).
- **Cleanup as a principle** ([LR-0008](learning-records/0008-cleanup-closed-transfer-is-the-axis.md)).
- **Lesson 1 Task B** — retired, he declined it and the finding was obtained in prose anyway
  ([LR-0007](learning-records/0007-constraints-do-not-travel.md)). Do not chase a fourth time.

## Gap notes as of 2026-09-24 (detail behind STATE.md's short list)

- **Triage under a clock** — LR-0010 finding 2, the largest open axis. Exercise 0005 above.
- **Mechanical API recall is thin while technique selection is live** — LR-0010 finding 3, two
  instances (`aria-activedescendant`, `AbortController`). Reference sheets, not lessons.
- **Scenario-shaped requirements don't convert into tasks** — LR-0009 finding 3. Still open but
  unmeasured in 0004: all four requirements there arrived pre-converted. Do *not* fix by writing
  requirements as instructions; real briefs are scenario-shaped. Keep them coming.
- **Roving `tabindex`** — narrowed by LR-0009. He holds the *choice between* techniques in the
  direction where `aria-activedescendant` wins, and missed the direction where roving wins
  (lesson 3 Q2). Goes into the reference sheet above, then wants a composite-widget exercise
  (tabs, menu, toolbar) where roving is the correct answer.
- Calibration **Q14** (generics) — only TypeScript miss against 3/4. Fold into a component-API
  lesson where generic props are the natural vehicle.
- **CLOSED 2026-09-24 (LR-0011 finding 5)** — ~~`any` at the fetch boundary~~ — survived four exercises, and in 0003 it was causal.** With
  `Book[]` and `noUncheckedIndexedAccess` the requirement-2 crash is a compile error. Keep it a
  graded line, but argue it as *"`any` is why nothing told you,"* not as hygiene.
- **Discriminated union for request state.** Still parked, still unmeasured — 0004's error and
  loading requirements are exactly where it would have shown and neither was built. Re-check
  whenever the async layer is next in an exercise.
- **`try/catch` around a promise-returning call catches nothing.** Named once in 0004 and
  understood immediately (LR-0010 finding 4). Do not teach; re-test, including whether
  `AbortError` is swallowed rather than rendered.
- **Identity** — fourth instance in 0003 (the stale `active` index surviving a new result set),
  after `key`, `queryKey` and the dependency array. Downgraded from "open wound" by LR-0005 and
  still correctly downgraded — the dependency-array half stays right. Keep spot-checking.
- **Verify new scaffolds in both colour schemes before shipping.** 0003 shipped with
  `color-scheme: light dark` over a hardcoded-light palette and the input rendered invisible in
  dark mode, costing him exercise time. Fixed at source.
- **No human feedback loop exists.** Everything is asynchronous; self-assessment cannot measure
  how he sounds live. Flagged in `RESOURCES.md` under Gaps. Ask before pushing communities again.

## Moved from STATE 2026-10-07

## Week 1: getting interviews (career comes first)

1. Resume and LinkedIn review. Done 2026-09-25.
2. Done 2026-09-25. The "why IC" answer: write it with him, then he rehearses it out loud. The framing is agreed in
   `career/CAREER.md`.
3. Dropped 2026-09-25 (he searches himself). A list of Canada-eligible target companies, built from `research/2026-canada-remote-eligibility.md`.

## Moved from STATE 2026-10-15

- GR prep done 10-14/15: GR summary, Core Web Vitals, SPA/SSR (no SSR experience; knowing it is
  enough), security block 1 + BFF/tokens/SSO/multi-tenant, prep file §2b–2g (LR-0016).
- 10-15: preflight held 2/2 overnight, CSP rollout 3/3 on re-ask, internals/INP 2.5/7 cold →
  ~2.5/4 re-asked (LR-0017).

## Paused 2026-10-17 for the GR loop (restored to STATE 2026-10-26)

### Security lesson S1, next when resumed

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

## Lesson 8 (2026-10-18)

Lesson 8 done 10-18: quiz 4/4. Cold check: order and blocking right; missed again that
`useEffect` may run before paint when a click caused it (LR-0016/17 item, 2nd miss); left
useTransition vs useDeferredValue blank. `useOptimistic` task took 4 passes: optimistic value
not rendered, setter outside the transition, then the stale value moved around (deleted
setMessages → `setMessages(optimisticMessages)` from the click closure → array from click-time
`messages`) until an updater with an explicit `flag`. He skipped the A-then-B simulation
question twice. LR-0019 confirmed: he does not simulate the sequence before writing; in rep 2
make him state the A-then-B outcome before he edits. 0006 now carries his lesson-8 edits.

## GR sprint re-planned 2026-10-20

The 10-16 sprint (review reps, JS drill, a Vite fetch build, three Staff answers, the 6 s story,
LeetCode) was replaced by a Tue–Fri plan built from the recruiter's round-2 list (see STATE.md).
Kept: 0007, the 6 s story, the AI-review answer. The JS drill was folded into the promises lesson
and the Thu cold drill. Dropped for this round: the Vite fetch build and the Redux-to-TanStack
answer.

## GR loop closed 2026-10-26 (moved from STATE)

Round 2 done 10-23. Result: offer at **Senior**, not Staff. He doesn't want to discuss the interview (his rule, 10-26): never raise it.

### Next session (Thu 10-22 afternoon)

**Thursday, in order (about 3 h 10):** C (70) → D (20) → B (30) → F (40) → E (30). G only if
time is left. Say each item's length up front. (His Wednesday session ran past midnight; no day
was lost. Earlier entries dated "Wed 10-22" mean that same night.)

**A2 done 10-22: 3/6** (coached mid-attempt, so not clean; `EVALUATION.md`). He rates #2 (comment)
and #5 (empty-on-load) minor. Brief defect he called out: requirement 1 never said "build a
separate Phrase input". In future briefs, name every element to build in the requirement text.
**C drills graded 10-22: 1/4 on mechanism** (10/10 on the original checks, 10/13 after I added 3
for the gaps; `exercises/0009-promise-drills/EVALUATION.md`). The failures were all stop
conditions: `promiseAll` used a sparse `results.length`, `withTimeout` drops the input's
rejection, `retry` setInterval is never cleared (LR-0019 pattern). Attempt 2: 11/13, he moved on;
`withTimeout` still drops rejections. Cold-check in E. **Next:
C's predictions + quiz skipped (his call). D built 10-22: `lessons/0010-which-declaration-wins.html`
(5 drills + retrieval check, verified in Chrome); he did it, no review (his call).
**B graded 10-22: 1/3** (LR-0021: missed that the `[ticketId]` cleanup already drops stale responses; no model of when cleanup
runs). E must cold-check cleanup timing and a stale-response sequence.
**He skipped F for now (10-22) and asked for no-boilerplate drills. Built: `exercises/0010-hook-drills`
(30 min, 13 vitest tests) and `exercises/0011-string-drills` (50 min, LC 125/680/3/5, 12 checks; this is G).
Both verified red on stubs, green on a reference, brute force fails timing. Next: 0010 → 0011 → grade → E/F.**
**0010 at bedtime 10-22: 5/13.** #1 right. #2 had no fn ref and no timer (returned raw `fn`). #3 had no
guard in `catch`, no `return` after the empty-query branch, and loading never cleared. He got the fixed
version in chat. Fri warm-up: rewrite #2 and #3 cold (10 min), then the 5 cold questions. He proposed dropping D. His own CSS answer (10-22)
showed two misconceptions: `div .selected` read as "divs with the class" (it's descendant), and
cascade conflated with inheritance. No specificity tuple. So D stays, shortened to those gaps.

Taught 10-21 after grading. Cold-check one at A2 grading and the rest in E:
- Big-O by counting loops, including hidden ones (spread, `includes`, `str = ch + str`).
- `while (i < j)`: the pointers cross on even lengths; move only the pointer that skips punctuation.
- Local mutation is fine (`acc.push` on an array you just made). Don't mutate state or props.
- `useDeferredValue` isn't a debounce (no delay; interruptible background render). It needs `memo`.
- Not Actions: `onChange`, `onSubmit`. Actions are the `action`/`formAction` prop or a
  `startTransition` callback. Never put controlled-input state in a transition (react.dev);
  defer the list, not the checkbox. (This closes the cheat-sheet `onSubmit` item.)
- Module-level compute works only for static data; otherwise `useMemo` keyed on the data.

### Global Relay round 2: **Fri 2026-10-23**

Round 1 done 10-16 ([LR-0018](learning-records/0018-gr-round-1-was-js-fundamentals.md)).
**Recruiter's list (10-20, from a past candidate in this round):** experience walkthrough; React
principles with code; JS Promises with code; CSS selector specificity; a palindrome problem in React
with performance and Big-O. Topics: React, JS, CSS, AWS, UI libraries, AI-assisted coding,
Java/Python, accessibility. The round-1 interviewer said: a screen-shared React code review, maybe
a small build, maybe LeetCode from an AI-team interviewer. Prepare for both.
Pay CAD 180-200k + 4%. Debrief: `career/private/2026-10-16-global-relay-debrief.md`.

**Sprint to Friday (re-planned 10-20).** Tell him each item's length up front. He takes slots as
they open.

| When | Item | Length | How |
| --- | --- | --- | --- |
| Tue | A. 0008 palindrome feed: **done 10-21, 1/6** | 50 | |
| Wed (done) | A2. 0008 from scratch again, timed | 50 | `grade-exercise` |
| Thu 3 | B. 0007 review rep 2 (built 10-18; matches the interviewer's own description). Make him state the A-then-B outcome before he edits. At grading, cold-check why `useOptimistic` needs a transition outside actions | 30 | `grade-exercise` |
| Thu 1 | C. Promises from zero: event loop, microtasks, states, chaining, error propagation, `all`/`allSettled`/`race`/`any`, async/await. Then code: write `Promise.all`, `sleep`, timeout via `race`, retry, and predict output order (closes LR-0011) | 40 + 30 | built: `lessons/0009-the-microtask-queue.html` |
| Thu 2 | D. CSS cascade from zero: origin and `!important`, `@layer`, specificity (id, class, type), `:is`/`:not`/`:has` vs `:where`, inline styles, order, inheritance. Predict-the-colour drill. Cut to his two misconceptions plus the specificity tuple | 20 | `/teach css specificity` |
| Thu 5 | E. Cold mixed drill, retention check (LR-0017): the Big-O of idiomatic JS snippets (`reduce`+spread, string `+=`, `includes` in a loop) (LR-0020); the 10-21 list above; React principles with code (render/commit, key, snapshot, batching, effect timing, memo), promise output order, specificity, `this`/`==` | 30 | build it Thu, not before |
| Thu 4 | F. Out loud, about 10 min each: a 2-min experience walkthrough mapped to their list (React, AWS, a11y, AI-assisted coding, the JS-to-React migration); the 6 s → 3 s story with a causal chain that holds (TTI was removed in Lighthouse 10); his AI-written-code review policy; honest Java/Python/AWS depth | 40 | `career-session` |
| Thu, if time | G. two LeetCode string problems at 25 min each (valid palindrome II, longest substring without repeats) | 50 | `build-exercise` |
| Fri | Warm-up only: 5 cold questions, no new material | 15 | |

Dropped for this round: see `HISTORY.md` (re-planned 10-20). Hooks sheet: `reference/react-hooks.html`.

Open recall items (LR-0016/17): INP phase 2 (processing); useEffect usually runs after paint
(before it when an interaction caused it); RUM behind login. Fold into reps; no more CSP drilling.


## S1 repair closed 2026-10-29 (moved from STATE)

Cold retest of lesson 11 §5 on 10-28: **1/5** (target 4/5), (6) unanswered. Same pattern as 10-26:
preflight + CORS applied to forms, links and `<img>`; "CORS blocks the read" counted as a blocked
CSRF even when his own trace had the delete run; a relative fetch inside app.example.com called
cross-origin. Rounds 1–3 drilled fetch() only, so they didn't transfer. Round 4, rapid verdicts, no
reading, two questions per case: (a) who starts it: navigation (form, link), subresource (img) or
script (fetch)? Only a cross-origin script request meets CORS. (b) What does the attacker need: a side
effect or a read? CSRF needs only the side effect. Mix in same-origin relative fetches.
Round 4 done 10-28: fetch cases clean, Lax top-level rule shaky (LR-0022). Retest §5 cold
on a later day (clear it from the **lesson tab's** console: `p=JSON.parse(localStorage["fsp:predictions"]);delete p["0011-check"];delete p["0011-check:revealed"];localStorage["fsp:predictions"]=JSON.stringify(p);location.reload()`).
Retest 10-29: 5/5, target met. Detail in LR-0022.
