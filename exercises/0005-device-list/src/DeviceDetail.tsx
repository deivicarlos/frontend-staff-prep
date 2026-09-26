import { useEffect, useState } from "react";
import { fetchDevice, type Device } from "./api";

// Written before the team adopted TanStack Query. Nobody has migrated it.

export function DeviceDetail({ id }: { id: string | null }) {
  const [device, setDevice] = useState<Device | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const controller = new AbortController();
      setIsLoading(true);
      setError(null);
      try {
        const d = await fetchDevice(id, controller.signal);
        setDevice(d);
      } catch {
        if (!controller.signal.aborted) setError("Could not load this device.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
    return () => {};
  }, [id]);

  if (!id) return <aside className="detail muted">Select a device.</aside>;

  return (
    <aside className="detail">
      {isLoading && <p className="muted">Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && device && (
        <>
          <h2>{device.name}</h2>
          <dl className="meta">
            <dt>status</dt>
            <dd>{device.status}</dd>
            <dt>kind</dt>
            <dd>{device.kind}</dd>
            <dt>ip</dt>
            <dd>{device.ip}</dd>
            <dt>firmware</dt>
            <dd>{device.firmware}</dd>
          </dl>
        </>
      )}
    </aside>
  );
}
