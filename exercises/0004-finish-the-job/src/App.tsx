import { useSyncExternalStore } from "react";
import { Typeahead } from "./Typeahead";
import { clearLog, getLog, subscribeToLog } from "./data";

export default function App() {
  const log = useSyncExternalStore(subscribeToLog, getLog);

  return (
    <main>
      <h1>Book search</h1>
      <Typeahead />

      <section className="log">
        <header>
          <h2>Requests</h2>
          <button type="button" onClick={clearLog}>
            clear
          </button>
        </header>
        {log.length === 0 && <p className="empty">none yet</p>}
        <ol>
          {log.map((e) => (
            <li key={e.n} className={`status-${e.status.replace(" ", "-")}`}>
              <code>#{e.n}</code> <span className="q">{e.query || "∅"}</span>
              <span className="status">{e.status}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
