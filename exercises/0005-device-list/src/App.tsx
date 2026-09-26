import { useState, useSyncExternalStore } from "react";
import { DeviceList } from "./DeviceList";
import { DeviceDetail } from "./DeviceDetail";
import { log, outageSwitch } from "./server";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main>
      <h1>Devices</h1>
      <div className="layout">
        <DeviceList selectedId={selectedId} onSelect={setSelectedId} />
        <DeviceDetail id={selectedId} />
      </div>
      <RequestLog />
    </main>
  );
}

// ---- not yours ------------------------------------------------------------

function RequestLog() {
  const entries = useSyncExternalStore(log.subscribe, log.get);
  const outage = useSyncExternalStore(log.subscribe, outageSwitch.get);

  return (
    <section className="log">
      <header>
        <h2>Requests</h2>
        <label>
          <input
            type="checkbox"
            checked={outage}
            onChange={(e) => outageSwitch.set(e.target.checked)}
          />{" "}
          Simulate outage
        </label>
        <button type="button" onClick={log.clear}>
          clear
        </button>
      </header>
      {entries.length === 0 && <p className="muted">none yet</p>}
      <ol>
        {entries.map((e) => (
          <li key={e.n} className={`result-${String(e.result).replace(" ", "-")}`}>
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
