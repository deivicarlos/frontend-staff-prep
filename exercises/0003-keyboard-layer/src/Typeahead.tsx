import { useMemo, useState } from "react";
import { search } from "./data";

/**
 * The fetch layer is done. The keyboard layer is not.
 *
 * Everything below works with a mouse and is broken with a keyboard.
 * Read START-HERE.md, transcribe the requirements into this file, then start the clock.
 */
export function Typeahead() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => search(query), [query]);

  function choose(book: { id: string; title: string }) {
    setSelected(book.title);
    setQuery(book.title);
    setOpen(false);
  }

  return (
    <div className="typeahead">
      <input
        className="input"
        type="text"
        placeholder="Search books…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && results.length > 0 && (
        <ul className="listbox">
          {results.map((book) => (
            <li key={book.id} className="option" onClick={() => choose(book)}>
              <span className="title">{book.title}</span>
              <span className="meta">
                {book.author} · {book.year}
              </span>
            </li>
          ))}
        </ul>
      )}

      {selected && <p className="selected">Selected: {selected}</p>}
    </div>
  );
}
