import { StrictMode, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import { Planner } from "./Planner.tsx";
import { log } from "./log.ts";
import "./index.css";

// Not yours: the page shell and the log panel.

function LogPanel() {
  const entries = useSyncExternalStore(log.subscribe, log.get);
  return (
    <section className="log">
      <header>
        <h2>Log</h2>
        <button type="button" onClick={log.clear}>
          clear log
        </button>
      </header>
      <ol>
        {entries.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ol>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <h1>Room planner</h1>
      <Planner />
      <LogPanel />
    </main>
  </StrictMode>,
);
