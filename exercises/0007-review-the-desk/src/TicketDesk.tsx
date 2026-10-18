import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  fetchTicket,
  saveDraft,
  searchTickets,
  sendReply,
  type Ticket,
  type TicketSummary,
} from "./api";
import { debounce } from "./debounce";

export function TicketDesk() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TicketSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Load every open ticket once
  useEffect(() => {
    let ignore = false;
    searchTickets("").then((found) => {
      if (!ignore) setResults(found);
    });
    return () => {
      ignore = true;
    };
  }, []);

  // Search on the server as the agent types
  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    const found = await searchTickets(q);
    setResults(found);
  }

  return (
    <div className="layout">
      <section>
        <input
          type="search"
          placeholder="Search subject or customer"
          value={query}
          onChange={handleSearch}
        />
        <ul className="rows">
          {results.map((t) => (
            <li
              key={t.id}
              className={t.id === selectedId ? "row selected" : "row"}
            >
              <button
                type="button"
                className="subject"
                onClick={() => setSelectedId(t.id)}
              >
                {t.subject}
              </button>
              <span className="from">
                {t.customer} · {t.id}
              </span>
            </li>
          ))}
          {results.length === 0 && (
            <li className="row muted">No tickets match</li>
          )}
        </ul>
      </section>
      <section className="detail">
        {selectedId ? (
          <TicketPanel ticketId={selectedId} />
        ) : (
          <p className="muted">Select a ticket</p>
        )}
      </section>
    </div>
  );
}

function TicketPanel({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [failed, setFailed] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Autosave the draft 800 ms after the agent stops typing
  const saveLater = useRef(
    debounce((text: string) => saveDraft(ticketId, text), 800),
  ).current;

  useEffect(() => {
    let ignore = false;
    setTicket(null);
    setFailed(false);
    setSent(false);
    fetchTicket(ticketId).then(
      (t) => {
        if (ignore) return;
        setTicket(t);
        setDraft(t.draft);
      },
      () => {
        if (!ignore) setFailed(true);
      },
    );
    return () => {
      ignore = true;
    };
  }, [ticketId]);

  function handleDraftChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setDraft(e.target.value);
    setSent(false);
    saveLater(e.target.value);
  }

  async function handleSend() {
    const text = draft;
    setSending(true);
    try {
      await sendReply(ticketId, text);
      setTicket((t) => t && { ...t, thread: [...t.thread, `Agent: ${text}`] });
    } catch (err) {
      console.error("sendReply failed", err);
    } finally {
      setSending(false);
    }
    setDraft("");
    saveLater("");
    setSent(true);
  }

  if (failed) return <p className="error">Couldn't load {ticketId}.</p>;
  if (!ticket) return <p className="muted">Loading…</p>;

  return (
    <>
      <h2>{ticket.subject}</h2>
      <p className="from">
        {ticket.customer} · {ticket.id}
      </p>
      <ol className="thread">
        {ticket.thread.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
      <textarea
        rows={4}
        placeholder="Write a reply"
        value={draft}
        disabled={sending}
        onChange={handleDraftChange}
      />
      <div className="actions">
        <button
          type="button"
          onClick={handleSend}
          disabled={sending || draft.trim() === ""}
        >
          {sending ? "Sending…" : "Send reply"}
        </button>
        {sent && <span className="ok">Reply sent ✓</span>}
      </div>
    </>
  );
}
