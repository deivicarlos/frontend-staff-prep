import { useEffect, useId, useRef, useState } from "react";
import { search } from "./data";

/**
 * The keyboard layer is done, and it is the version the exercise 0003 rubric asked for.
 * Leave it alone. The request layer below it does not exist.
 *
 * ---------------------------------------------------------------------------
 * BEFORE THE CLOCK — transcribe each requirement here as an action you will take.
 * Not the requirement's words: the thing you are going to do.
 *
 * 1.
 * 2.
 * 3.
 * 4.
 *
 * ---------------------------------------------------------------------------
 * AT THE BUZZER — fill this in before you open AFTER-THE-TIMER.md.
 *
 * | requirement | done-condition passes? | if no, what is left |
 * | 1 |  |  |
 * | 2 |  |  |
 * | 3 |  |  |
 * | 4 |  |  |
 * ---------------------------------------------------------------------------
 */

export function Typeahead() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // The request layer. This is your half of the exercise.
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    search(query).then(setResults);
  }, [query]);

  // ---- keyboard layer: done, correct, not yours ----------------------------

  const listId = useId();
  const optionId = (i: number) => `${listId}-opt-${i}`;
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setActive(-1);
  }, [results]);

  useEffect(() => {
    if (active < 0) return;
    listRef.current
      ?.querySelector(`#${CSS.escape(optionId(active))}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function choose(book: { title: string }) {
    setSelected(book.title);
    setQuery(book.title);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
        break;
      case "Enter":
        if (active < 0) return;
        e.preventDefault();
        choose(results[active]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setActive(-1);
        break;
    }
  }

  const listVisible = open && results.length > 0;

  return (
    <div className="typeahead">
      <input
        className="input"
        type="text"
        placeholder="Search books…"
        role="combobox"
        aria-expanded={listVisible}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? optionId(active) : undefined}
        value={query}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {listVisible && (
        <ul className="listbox" id={listId} ref={listRef} role="listbox">
          {results.map((book, i) => (
            <li
              key={book.id}
              id={optionId(i)}
              role="option"
              aria-selected={active === i}
              className={`option ${active === i ? "active" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(book)}
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
