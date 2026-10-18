// Fake backend and request log. Not part of the PR, and correct: don't review it.
//
// GET   /api/messages       the queue, newest first, no bodies          400 ms
// GET   /api/messages/:id   { id, html } the archived body              m1: 1500 ms, others 300 ms
//                           m5's body is corrupt in storage: 500
// PATCH /api/messages/:id   { flagged }                                 200 ms
// GET   /api/messages/new   messages archived since the last poll        200 ms
//                           (one new message appears on the 2nd poll)

export type Message = {
  id: string;
  subject: string;
  from: string;
  flagged: boolean;
};

export type MessageBody = { id: string; html: string };

const QUEUE: Message[] = [
  {
    id: "m1",
    subject: "Q3 allocation call notes",
    from: "d.chen@bank-a.com",
    flagged: false,
  },
  {
    id: "m2",
    subject: "Re: client pricing sheet",
    from: "m.ortiz@bank-a.com",
    flagged: false,
  },
  {
    id: "m3",
    subject: "Lunch Thursday?",
    from: "j.kim@bank-a.com",
    flagged: false,
  },
  {
    id: "m4",
    subject: "Invoice attached",
    from: "billing@vendor-mail.net",
    flagged: false,
  },
  {
    id: "m5",
    subject: "Trade confirmation 88231",
    from: "ops@bank-a.com",
    flagged: false,
  },
  {
    id: "m6",
    subject: "Quarterly attestation reminder",
    from: "compliance@bank-a.com",
    flagged: false,
  },
];

const BODIES: Record<string, string> = {
  m1: "<p>Notes from the <b>Q3 allocation</b> call. Keep these internal.</p>",
  m2: "<p>Updated pricing attached. Please don't forward outside the desk.</p>",
  m3: "<p>Lunch Thursday at noon?</p>",
  m4: '<p>Please see the attached invoice.</p><img src="x" alt="" onerror="window.__xss && window.__xss()">',
  m6: "<p>Your quarterly attestation is due Friday.</p>",
  m7: "<p>Moving the desk meeting to 3pm.</p>",
};

const NEW_MESSAGE: Message = {
  id: "m7",
  subject: "Desk meeting moved",
  from: "a.patel@bank-a.com",
  flagged: false,
};

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
  note(text: string) {
    entries.push({
      n: ++counter,
      method: "EVENT",
      path: text,
      result: "note",
      startedAt: now(),
      endedAt: now(),
    });
    emit();
  },
};

(window as unknown as { __xss: () => void }).__xss = () =>
  log.note("injected script ran inside the app's origin");

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

export function fetchMessages() {
  return request("GET", "/api/messages", 400, () => QUEUE);
}

export function fetchBody(id: string) {
  return request<MessageBody>(
    "GET",
    `/api/messages/${id}`,
    id === "m1" ? 1500 : 300,
    () =>
      id === "m5"
        ? new Error("500 Internal Server Error")
        : { id, html: BODIES[id] },
  );
}

export function setFlag(id: string, flagged: boolean) {
  return request(
    "PATCH",
    `/api/messages/${id} {flagged:${flagged}}`,
    200,
    () => {
      const m = QUEUE.find((q) => q.id === id);
      if (m) m.flagged = flagged;
      return { ok: true };
    },
  );
}

let polls = 0;
export function pollNew() {
  return request("GET", "/api/messages/new", 200, () => {
    polls += 1;
    if (polls !== 2) return [] as Message[];
    QUEUE.unshift(NEW_MESSAGE);
    return [NEW_MESSAGE];
  });
}
