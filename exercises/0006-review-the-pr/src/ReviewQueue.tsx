import { useEffect, useState } from "react";
import { fetchBody, fetchMessages, pollNew, setFlag, type Message } from "./api";

export function ReviewQueue() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filtered, setFiltered] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  // Load the review queue on mount
  useEffect(() => {
    fetchMessages().then(setMessages);
  }, []);

  // Keep the filtered list in sync with the search box
  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(messages.filter((m) => m.subject.toLowerCase().includes(q)));
  }, [messages, query]);

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
  function toggleFlag(id: string) {
    const message = messages.find((m) => m.id === id);
    if (!message) return;
    message.flagged = !message.flagged;
    setFlag(id, message.flagged);
    setMessages(messages);
  }

  // Keyboard shortcut: "f" flags the selected message
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "f" && selectedId) toggleFlag(selectedId);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} /> Live
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
        {selectedId ? <MessageBody id={selectedId} /> : <p className="muted">Select a message</p>}
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
