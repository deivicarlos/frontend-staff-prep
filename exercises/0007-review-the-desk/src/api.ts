// Fake backend and request log. Not part of the PR, and correct: don't review it.
//
// GET   /api/tickets?q=          tickets whose subject or customer contains q        "" : 150 ms
//                                shorter queries match more and are slower:     else 900 - 150 × length ms
//                                                                                    (min 120 ms)
// GET   /api/tickets/:id         { ...ticket, thread, draft }                        300 ms
// PUT   /api/tickets/:id/draft   saves the agent's unsent reply                      200 ms
// POST  /api/tickets/:id/replies emails the reply to the customer                    400 ms
//                                T-103's customer mailbox rejects mail: 500

export type TicketSummary = {
  id: string;
  subject: string;
  customer: string;
};

export type Ticket = TicketSummary & {
  thread: string[];
  draft: string;
};

const TICKETS: Ticket[] = [
  {
    id: "T-101",
    subject: "Can't log in after password reset",
    customer: "Northwind Foods",
    thread: ["The reset link worked but the new password is rejected."],
    draft: "",
  },
  {
    id: "T-102",
    subject: "Refund not received",
    customer: "Halcyon Dental",
    thread: ["We cancelled on the 2nd and still see the charge."],
    draft: "",
  },
  {
    id: "T-103",
    subject: "Invoice shows wrong currency",
    customer: "Brightline Freight",
    thread: ["Our invoice is in USD, the contract says CAD."],
    draft: "",
  },
  {
    id: "T-104",
    subject: "Export to CSV times out",
    customer: "Osei & Partners",
    thread: ["Exports over 10k rows never finish."],
    draft: "",
  },
  {
    id: "T-105",
    subject: "Refund request for duplicate charge",
    customer: "Maple Grove Clinic",
    thread: ["We were billed twice for October."],
    draft: "",
  },
  {
    id: "T-106",
    subject: "Add SSO for our team",
    customer: "Kite Labs",
    thread: ["Do you support Okta?"],
    draft: "",
  },
];

// ---- request log ------------------------------------------------------------

export type LogEntry = {
  n: number;
  method: string;
  path: string;
  result: string;
  startedAt: number;
  endedAt?: number;
};

let entries: LogEntry[] = [];
let counter = 0;
const listeners = new Set<() => void>();
const t0 = performance.now();
const now = () => (performance.now() - t0) / 1000;

function emit() {
  entries = [...entries];
  listeners.forEach((l) => l());
}

export const log = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get: () => entries,
  clear() {
    entries = [];
    emit();
  },
};

function request<T>(
  method: string,
  path: string,
  ms: number,
  respond: () => T | Error,
): Promise<T> {
  const entry: LogEntry = {
    n: ++counter,
    method,
    path,
    result: "in flight",
    startedAt: now(),
  };
  entries.push(entry);
  emit();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const out = respond();
      entry.endedAt = now();
      entry.result = out instanceof Error ? "500" : "200";
      emit();
      if (out instanceof Error) reject(out);
      else resolve(structuredClone(out));
    }, ms);
  });
}

// ---- API --------------------------------------------------------------------

const summary = ({ id, subject, customer }: Ticket): TicketSummary => ({
  id,
  subject,
  customer,
});

export function searchTickets(q: string) {
  const needle = q.trim().toLowerCase();
  const ms = needle === "" ? 150 : Math.max(120, 900 - 150 * needle.length);
  return request<TicketSummary[]>("GET", `/api/tickets?q=${needle}`, ms, () =>
    TICKETS.filter((t) =>
      `${t.subject} ${t.customer}`.toLowerCase().includes(needle),
    ).map(summary),
  );
}

export function fetchTicket(id: string) {
  return request<Ticket>("GET", `/api/tickets/${id}`, 300, () => {
    const t = TICKETS.find((t) => t.id === id);
    return t ?? new Error("404");
  });
}

export function saveDraft(id: string, text: string) {
  return request("PUT", `/api/tickets/${id}/draft "${text}"`, 200, () => {
    const t = TICKETS.find((t) => t.id === id);
    if (t) t.draft = text;
    return { ok: true };
  });
}

export function sendReply(id: string, text: string) {
  return request("POST", `/api/tickets/${id}/replies "${text}"`, 400, () => {
    if (id === "T-103") return new Error("500 mailbox rejected the message");
    const t = TICKETS.find((t) => t.id === id);
    if (t) {
      t.thread.push(`Agent: ${text}`);
      t.draft = "";
    }
    return { ok: true };
  });
}
