import { StrictMode, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import { TicketDesk } from "./TicketDesk.tsx";
import { log } from "./api.ts";
import "./index.css";

// Not part of the PR: the page shell and the request log.

function App() {
  return (
    <main>
      <h1>Support desk</h1>
      <TicketDesk />
      <RequestLog />
    </main>
  );
}

function RequestLog() {
  const entries = useSyncExternalStore(log.subscribe, log.get);
  return (
    <section className="log">
      <header>
        <h2>Requests and events</h2>
        <button type="button" onClick={log.clear}>
          clear
        </button>
      </header>
      {entries.length === 0 && <p className="muted">none yet</p>}
      <ol>
        {entries.map((e) => (
          <li key={e.n} className={`result-${e.result.replace(" ", "-")}`}>
            <code>#{e.n}</code>
            <code className="req">
              {e.method} {e.path}
            </code>
            <span className="result">{e.result}</span>
            <span className="time">
              {e.startedAt.toFixed(2)}s{e.endedAt !== undefined && ` → ${e.endedAt.toFixed(2)}s`}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
