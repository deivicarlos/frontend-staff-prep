# Frontend Senior/Staff Resources

Curated and annotated. Lessons cite from here; parametric guesses are not allowed to
substitute. Prune anything that turns out shallow or off-mission.

## Knowledge — React (primary)

- [react.dev](https://react.dev) — the official docs, fully rewritten for the hooks era.
  Use for: anything foundational. The "Learn" section's [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
  is the single highest-value page for someone returning after a gap — most 2022-era
  `useEffect` habits are now considered wrong.
- [react.dev/versions](https://react.dev/versions) — canonical release history.
  Confirms: React **19.2** is current (19.2.7, June 2026); 19.0 shipped December 2024.
  Use for: knowing exactly what landed while you were away.
- [React Compiler docs](https://react.dev/learn/react-compiler) — the compiler hit
  **v1.0 on 7 October 2025** and automates memoisation at build time.
  Use for: understanding why `useMemo`/`useCallback`/`React.memo` are no longer the
  performance answer they were in 2024. This is the biggest single shift in the gap.
- [React Blog](https://react.dev/blog) — release posts for 19.0, 19.1, 19.2.
  Use for: Actions, `use()`, `useOptimistic`, form status, ref-as-prop.

## Knowledge — Depth and mental models

- [overreacted.io](https://overreacted.io) — Dan Abramov (ex-React core).
  Use for: *why* React works as it does. "A Complete Guide to useEffect" and
  "React as a UI Runtime" are the two that most change how you talk in interviews.
- [TkDodo's Blog](https://tkdodo.eu/blog) — Dominik Dorfmeister, TanStack Query maintainer.
  Use for: server state vs client state, the argument that killed `useEffect`-based
  data fetching, and React Query patterns. His "Practical React Query" series is the
  reference on the topic.
- [Developer Way](https://www.developerway.com) — Nadia Makarevich, author of *Advanced React*.
  Use for: re-renders, reconciliation, composition patterns. Her re-render articles are
  the clearest treatment of the thing interviewers probe most.
- [Patterns.dev](https://www.patterns.dev) — Lydia Hallie & Addy Osmani.
  Use for: rendering patterns (CSR/SSR/SSG/ISR/streaming) and performance patterns,
  vocabulary you need in system design rounds.
- [Josh Comeau's blog](https://www.joshwcomeau.com/) — Use for: CSS mental models,
  layout, animation. Notably ["Understanding useEffect"](https://www.joshwcomeau.com/react/) and his CSS series.

## Knowledge — TypeScript

- [Total TypeScript](https://www.totaltypescript.com) — Matt Pocock.
  Use for: generics, conditional types, and the "type-level programming" questions that
  separate senior from staff. The free [TypeScript Tips](https://www.totaltypescript.com/tips) are the fastest ROI.
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — official.
  Use for: settling arguments about variance, narrowing, and `satisfies`.

## Knowledge — Interview-specific

- [Front End Interview Handbook](https://www.frontendinterviewhandbook.com) — GreatFrontEnd's
  free companion. Use for: the **RADIO** framework for frontend system design
  (Requirements → Architecture → Data model → Interface → Optimisations), question banks,
  and the coding-round taxonomy.
- [GreatFrontEnd](https://www.greatfrontend.com) — paid, the strongest frontend-specific
  system design and coding practice set. Use for: timed reps once fundamentals are back.
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals) — Google, canonical.
  Use for: LCP/INP/CLS. Note **INP replaced FID in March 2024** — a real trap if your
  knowledge froze before then.
- [Frontend at Scale](https://frontendatscale.com) — Maxi Ferreira.
  Use for: architecture and staff-altitude thinking — the "why" behind large frontend
  systems, which is exactly the Staff differentiator.

## Knowledge — Staff altitude (non-technical)

- [StaffEng](https://staffeng.com) — Will Larson. Stories and the archetypes
  (Tech Lead, Architect, Solver, Right Hand).
  Use for: converting your management years into staff-track narrative rather than a gap.
  This is leverage most returning-IC candidates leave on the table.

## Wisdom (Communities)

- [Reactiflux Discord](https://www.reactiflux.com) — the largest React community; React
  core and library maintainers are present. Use for: code review, "is this idiomatic in
  2026?" sanity checks, and job channels.
- [r/reactjs](https://reddit.com/r/reactjs) — moderated reasonably well.
  Use for: ecosystem temperature-taking, "what do teams actually use now."
- [interviewing.io](https://interviewing.io) — anonymous mock interviews with engineers
  from target companies, frontend track included. Use for: the wisdom half of this
  workspace — real feedback loops with humans. Paid, but the highest-signal option.
- [Blind](https://www.teamblind.com) — Use for: compensation bands and interview loop
  intel. Treat sentiment there as noise; treat data points as weak evidence.

## Gaps

- **No human feedback loop yet.** Everything above is asynchronous. The single biggest
  missing resource is a recurring mock-interview partner. Resolve before serious
  interviewing — self-assessment cannot measure how you sound under pressure.
- **No verified source on Staff-level frontend loops specifically.** Most system design
  material is backend-flavoured. GreatFrontEnd is the best found so far; keep looking.
- **Community preference unknown.** Carlos has not said whether he wants to participate
  publicly. Ask before pushing Discord/Reddit participation.
