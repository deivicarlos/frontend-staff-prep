# After the timer

Stop. If the 45 minutes aren't done, close this file.

---

## How an interviewer actually grades this

Finishing is not the bar — plenty of hires don't finish. These are, roughly in the order
interviewers weight them:

| | What they're watching for |
| --- | --- |
| **Narration** | Did you say what you were doing and why? Silence reads as stuck, even when you aren't. |
| **State shape** | One coherent model, or several booleans that can contradict each other? |
| **Cancellation** | Do you handle the stale-response race at all? Most candidates never mention it. |
| **Keyboard** | Arrow keys and Enter working, and focus/`aria-activedescendant` handled — this is where senior separates from mid. |
| **Trade-offs named** | "I'd debounce at 300ms; lower feels responsive but hammers the API." Saying the *why* unprompted. |
| **Recovery** | You will get stuck. Did you narrate a way out, or freeze? |
| Polish | Barely counts. Nobody is grading your CSS. |

## The state-shape question

If your state looked like this, note it — it's the most common senior-level miss and it
connects straight back to calibration Q15:

```ts
const [results, setResults] = useState<Book[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

Three booleans-ish values can represent states that cannot really exist: loading *and*
error, results *and* error. A discriminated union makes those unrepresentable:

```ts
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; results: Book[] };
```

You got Q15 right on the calibration, which is exactly why this is worth checking: knowing
the principle and reaching for it under time pressure are different skills, and the gap
between them is what this exercise measures.

## The race condition

Two searches in flight. The first one is slower. It resolves last and overwrites the
newer results with older ones. The user sees results for a query they've moved past.

Did you handle it? Three valid answers, and naming any of them scores:

- `AbortController`, aborted in the effect cleanup — the modern default
- An `ignore` boolean flipped in cleanup — what react.dev shows, and it works
- A request-id / sequence check before committing the result

If you didn't handle it, that's the highest-value single thing to fix, and it is
[lesson 2's](../../lessons/0002-render-is-a-snapshot.html) cleanup symmetry in the wild.

## Report back

Paste me your `App.tsx` (however unfinished) plus:

1. Which of the six requirements actually work
2. What you looked up — **and whether it was syntax or approach**
3. Where you stalled, and roughly how long
4. Whether you narrated or went quiet

Point 2 is the one that changes the curriculum. "I couldn't remember `AbortController`'s
signature" means nothing — you'd look that up on the job. "I couldn't decide how to
structure the state" or "I knew I needed cancellation but not where to put it" are real
findings and they set the next lesson.
