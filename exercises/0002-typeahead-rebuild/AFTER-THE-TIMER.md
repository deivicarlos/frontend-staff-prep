# After the timer

Stop reading if the clock is still running.

---

## Self-mark before you send it to me

Answer these honestly first — your read on your own work is itself a measurement, and
comparing it to mine tells us whether your self-assessment is calibrated.

| | Working? |
| --- | --- |
| 1 · Debounce | |
| 2 · Fetch | |
| 3 · Loading | |
| 4 · Error | |
| 5 · Arrow keys + Enter | |
| 6 · Cancellation | |

## The three things this exercise is actually testing

You've seen the evaluation of attempt one, so the scorecard is no longer the interesting
part. These are:

### 1. Identity — did it show up right this time?

Four times across the calibration and exercise 0001, the same gap: constant `queryKey`,
missing `key` on `<li>`, calibration Q9, calibration Q5. Hand-rolled, that mechanism becomes
your **dependency array**.

- Does your fetch effect depend on the debounced value?
- Do your `<li>`s have a stable `key` that isn't the array index?
- Does your debounce effect depend on the raw input?

Get all three right and identity is closed. Miss one and it isn't, and I'd rather know.

*Full disclosure: lesson 2's retrieval quiz taught identity in derivation 2 and then never
re-tested it — a flaw in how I built it. So this exercise is the first real test of whether
that lesson landed.*

### 2. State shape — is it a union yet?

You got calibration Q15 right and then didn't reach for it under pressure. Which did you
write this time?

```ts
// A
const [results, setResults] = useState<Book[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// B
type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; results: Book[] };
```

Either is defensible in 45 minutes. But if you wrote A, notice whether you *considered* B
and rejected it on time, or never thought of it. Those are different findings.

### 3. Cancellation — where did you put it?

The race: two searches in flight, the slower one is older, it resolves last and overwrites
newer results. Valid answers:

- `AbortController`, `.abort()` in the effect cleanup
- an `ignore` boolean flipped in cleanup
- a sequence/request-id check before committing

All three are the same idea — *the cleanup makes the old request stop mattering* — which is
lesson 2's derivation 4. If you wrote symmetric cleanup for your debounce timer but not for
your fetch, say so; that's a specific and interesting half-landing.

## Keyboard, since it's the new ground

Minimum for requirement 5: ArrowDown/ArrowUp move a highlighted index, Enter selects it,
Escape closes. If you also did any of these, note it — each is a senior signal:

- Index wraps at the ends, or clamps deliberately
- The highlight resets when results change
- Escape returns focus to the input
- `aria-activedescendant` and `role="listbox"`/`role="option"` wired up
- The list scrolls to keep the highlighted item visible

## Send me

Your `src/`, your self-marked table above, and:

1. What you looked up, and whether it was **syntax or approach**
2. Where you stalled and for how long
3. Did you narrate, or go quiet when it got hard?
4. **How much faster did the parts you'd done before feel?**

Question 4 is the real measurement. Attempt one told us where you were. This one tells us
whether anything moved.
