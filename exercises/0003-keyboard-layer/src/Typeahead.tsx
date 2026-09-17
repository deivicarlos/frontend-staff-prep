import { useCallback, useEffect, useMemo, useState } from "react";
import { search } from "./data";

/**
 * The fetch layer is done. The keyboard layer is not.
 *
 * Everything below works with a mouse and is broken with a keyboard.
 * Read START-HERE.md, transcribe the requirements into this file, then start the clock.
 */

/**
 1. **ArrowDown and ArrowUp move the highlighted result.** From the bottom, ArrowDown goes to the
   top; from the top, ArrowUp goes to the bottom. Decide wrap-vs-clamp deliberately and be able
   to say why you chose it.
2. **Enter selects the highlighted result.** With nothing highlighted, Enter does nothing — it
   must not select a row the user never looked at. Escape closes the list and clears the
   highlight.
3. **The user must be able to keep typing at all times.** Arrowing to a result and then typing
   another character must continue editing the query, not go somewhere else.
4. **A screen reader must be told which result is active** — as state on the elements, not as a
   visual highlight alone. The visual highlight is also yours to produce.
5. **The highlight must not survive a result set it no longer refers to.** Type until several
   results show, arrow down a few rows, then type another character that narrows the list.
   Whatever happens next must be defensible.
6. **The active row must be visible.** The list is deliberately shorter than the results. Holding
   ArrowDown must not leave the highlight somewhere off-screen below the fold.
 */

const KEY_VALUES = {
  ENTER: "Enter",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  ESC: "Escape",
};

export function Typeahead() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(-1);

  const results = useMemo(() => search(query), [query]);

  function choose(book: { id: string; title: string }) {
    setSelected(book.title);
    setQuery(book.title);
    setOpen(false);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open && results.length <= 0) return;

      switch (e.key) {
        case KEY_VALUES.ENTER:
          e.preventDefault();
          choose(results[active]);
          break;
        case KEY_VALUES.UP:
          e.preventDefault();
          setActive((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
          break;
        case KEY_VALUES.DOWN:
          e.preventDefault();
          setActive((prev) => (prev + 1) % results.length);
          break;
      }
    },
    [open, results, active],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (active < 0) return;

    document
      .getElementById(`opt-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

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
        <ul
          className="listbox"
          role="listbox"
          aria-activedescendant={`opt-${active}`}
        >
          {results.map((book, i) => (
            <li
              id={`opt-${i}`}
              key={book.id}
              className={`option ${active === i ? "active" : ""}`}
              onClick={() => choose(book)}
              aria-selected={active === i}
            >
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
