// The keyboard layer is done. The request layer is not.
//
// search() is now asynchronous and behaves like a real endpoint: it is slow, it fails on
// some inputs, and it does not answer in the order you called it.

export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
};

const RAW = [
  { id: "b1", title: "The Fellowship of the Ring", author: "J. R. R. Tolkien", year: 1954 },
  { id: "b2", title: "The Two Towers", author: "J. R. R. Tolkien", year: 1954 },
  { id: "b3", title: "The Return of the King", author: "J. R. R. Tolkien", year: 1955 },
  { id: "b4", title: "The Hobbit", author: "J. R. R. Tolkien", year: 1937 },
  { id: "b5", title: "The Silmarillion", author: "J. R. R. Tolkien", year: 1977 },
  { id: "b6", title: "Unfinished Tales", author: "J. R. R. Tolkien", year: 1980 },
  { id: "b7", title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", year: 1968 },
  { id: "b8", title: "The Tombs of Atuan", author: "Ursula K. Le Guin", year: 1970 },
  { id: "b9", title: "The Farthest Shore", author: "Ursula K. Le Guin", year: 1972 },
  { id: "b10", title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", year: 1969 },
  { id: "b11", title: "The Dispossessed", author: "Ursula K. Le Guin", year: 1974 },
  { id: "b12", title: "Dune", author: "Frank Herbert", year: 1965 },
  { id: "b13", title: "Dune Messiah", author: "Frank Herbert", year: 1969 },
  { id: "b14", title: "Children of Dune", author: "Frank Herbert", year: 1976 },
  { id: "b15", title: "Neuromancer", author: "William Gibson", year: 1984 },
  { id: "b16", title: "Count Zero", author: "William Gibson", year: 1986 },
  { id: "b17", title: "Mona Lisa Overdrive", author: "William Gibson", year: 1988 },
  { id: "b18", title: "Snow Crash", author: "Neal Stephenson", year: 1992 },
  { id: "b19", title: "Cryptonomicon", author: "Neal Stephenson", year: 1999 },
  { id: "b20", title: "Anathem", author: "Neal Stephenson", year: 2008 },
];

// ---------------------------------------------------------------------------
// The request log. It is wired into the page already — you do not need to touch
// anything in this section. It exists so every done-condition in the brief is
// something you can look at rather than something you can believe.
// ---------------------------------------------------------------------------

export type LogEntry = {
  n: number;
  query: string;
  status: "in flight" | "resolved" | "failed" | "aborted";
};

let entries: LogEntry[] = [];
let n = 0;
const listeners = new Set<() => void>();

function emit() {
  entries = [...entries];
  listeners.forEach((l) => l());
}

export function subscribeToLog(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLog() {
  return entries;
}

export function clearLog() {
  entries = [];
  n = 0;
  emit();
}

// ---------------------------------------------------------------------------

/** Queries starting with "s" take 1500ms. Everything else takes 250ms. */
function latencyFor(q: string) {
  return q.startsWith("s") ? 1500 : 250;
}

/**
 * The "endpoint".
 *
 * - Rejects for any query containing "boom".
 * - Honours an AbortSignal: rejects with a DOMException named "AbortError".
 * - Answers out of order, because latency depends on the query.
 */
export function search(query: string, signal?: AbortSignal): Promise<any[]> {
  const q = query.trim().toLowerCase();
  const entry: LogEntry = { n: ++n, query: q, status: "in flight" };
  entries.push(entry);
  emit();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (q.includes("boom")) {
        entry.status = "failed";
        emit();
        reject(new Error("500 — the search service fell over"));
        return;
      }
      entry.status = "resolved";
      emit();
      resolve(
        RAW.filter(
          (b) =>
            b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
        ),
      );
    }, latencyFor(q));

    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      entry.status = "aborted";
      emit();
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}
