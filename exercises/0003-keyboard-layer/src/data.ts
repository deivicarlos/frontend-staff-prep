// Pre-fetched. There is no network in this exercise — the debounce, the request and the
// cancellation are deliberately already done. Do not rebuild them.

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

// The "server" response. Synchronous on purpose.
export function search(query: string): any[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return RAW.filter(
    (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
  );
}
