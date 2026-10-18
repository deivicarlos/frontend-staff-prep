import {
  startTransition,
  useEffect,
  useEffectEvent,
  useOptimistic,
  useState,
} from "react";
import {
  fetchBody,
  fetchMessages,
  pollNew,
  setFlag,
  type Message,
} from "./api";

export function ReviewQueue() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filtered, setFiltered] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (current, id: Message["id"]) => {
      return current.map((_message) => {
        if (_message.id !== id) return _message;

        return {
          ..._message,
          flagged: !_message.flagged,
        };
      });
    },
  );

  const onKeyDown = useEffectEvent((e: globalThis.KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return;
    if (e.key === "f" && selectedId) toggleFlag(selectedId);
  });

  // Load the review queue on mount
  useEffect(() => {
    fetchMessages().then(setMessages);
  }, []);

  // Keyboard shortcut: "f" flags the selected message
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Keep the filtered list in sync with the search box
  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(
      optimisticMessages.filter((m) => m.subject.toLowerCase().includes(q)),
    );
  }, [optimisticMessages, query]);

  // Live mode: check for newly archived messages every 3 seconds
  useEffect(() => {
    if (!live) return;
    setInterval(() => {
      pollNew().then((fresh) => {
        if (fresh.length > 0) setMessages((prev) => [...fresh, ...prev]);
      });
    }, 3000);
  }, [live]);

  // Flag or unflag a message, then persist it
  async function toggleFlag(id: string) {
    const message = messages.find((m) => m.id === id);

    if (!message) return;

    const flag = !message.flagged;

    startTransition(async () => {
      setOptimisticMessages(message.id);
      await setFlag(id, flag);

      startTransition(() =>
        setMessages((prev) => {
          return prev.map((_message) => {
            if (_message.id !== id) return _message;

            return {
              ..._message,
              flagged: flag,
            };
          });
        }),
      );
    });
  }

  return (
    <div className="layout">
      <section>
        <div className="toolbar">
          <input
            type="search"
            placeholder="Search subjects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={live}
              onChange={(e) => setLive(e.target.checked)}
            />{" "}
            Live
          </label>
        </div>
        <ul className="rows">
          {filtered.map((message, index) => (
            <Row
              key={index}
              message={message}
              selected={message.id === selectedId}
              onSelect={() => setSelectedId(message.id)}
              onToggleFlag={() => toggleFlag(message.id)}
            />
          ))}
        </ul>
      </section>
      <section className="detail">
        {selectedId ? (
          <MessageBody id={selectedId} />
        ) : (
          <p className="muted">Select a message</p>
        )}
      </section>
    </div>
  );
}

type RowProps = {
  message: Message;
  selected: boolean;
  onSelect: () => void;
  onToggleFlag: () => void;
};

function Row({ message, selected, onSelect, onToggleFlag }: RowProps) {
  // Reviewer ticks a message once they have read it
  const [reviewed, setReviewed] = useState(false);

  return (
    <li className={selected ? "row selected" : "row"}>
      <div className="line">
        <input
          type="checkbox"
          aria-label={`Mark ${message.id} reviewed`}
          checked={reviewed}
          onChange={(e) => setReviewed(e.target.checked)}
        />
        <button type="button" className="subject" onClick={onSelect}>
          {message.subject}
          <br />
          <span className="from">{message.from}</span>
        </button>
        {message.flagged && <span className="flag-badge">FLAGGED</span>}
        <button type="button" className="toggle" onClick={onToggleFlag}>
          {message.flagged ? "Unflag" : "Flag"}
        </button>
      </div>
    </li>
  );
}

function MessageBody({ id }: { id: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    setHtml(null);
    fetchBody(id).then((body) => setHtml(body.html));
  }, [id]);

  if (html === null) return <p className="muted">Loading…</p>;

  // Archived emails are HTML, so render them with their formatting
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
