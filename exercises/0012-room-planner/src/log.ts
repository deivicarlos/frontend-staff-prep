// Not yours: an append-only log the panel at the bottom of the page shows.
// You may call log.add("...") yourself.

type Listener = () => void;

let entries: string[] = [];
const listeners = new Set<Listener>();
const started = performance.now();

function emit() {
  for (const l of listeners) l();
}

export const log = {
  add(text: string) {
    const t = ((performance.now() - started) / 1000).toFixed(2).padStart(6, " ");
    entries = [...entries, `${t}s  ${text}`];
    emit();
  },
  clear() {
    entries = [];
    emit();
  },
  get: () => entries,
  subscribe(l: Listener) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};
