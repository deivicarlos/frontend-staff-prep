import { searchCatalog, type Product } from "./catalog.ts";
import { log } from "./log.ts";

/*
  Requirements (copy them here before the clock):

*/

export function Planner() {
  return (
    <div className="layout">
      <section className="panel">
        <h2>Catalogue</h2>
      </section>
      <section className="panel">
        <h2>Room</h2>
      </section>
    </div>
  );
}

// Remove these once you use them.
void searchCatalog;
void log;
export type { Product };
