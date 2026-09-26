/**
 * BEFORE THE CLOCK: copy the six requirements here.
 *
 *
 * ---------------------------------------------------------------------------
 * AT THE BUZZER: fill this in before you open AFTER-THE-TIMER.md.
 *
 * | req | passes? | fix in one line, or what is unmet |
 * | 1   |         |                                   |
 * | 2   |         |                                   |
 * | 3   |         |                                   |
 * | 4   |         |                                   |
 * | 5   |         |                                   |
 * | 6   |         |                                   |
 */

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDevices, setDeviceStatus, type Device, type StatusFilter } from "./api";

const FILTERS: StatusFilter[] = ["all", "online", "offline"];

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function DeviceList({ selectedId, onSelect }: Props) {
  const [status, setStatus] = useState<StatusFilter>("all");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["devices"],
    queryFn: () => fetchDevices(status),
  });

  const toggle = useMutation({
    mutationFn: (device: Device) =>
      setDeviceStatus(device.id, device.status === "online" ? "offline" : "online"),
  });

  return (
    <section className="devices">
      <header className="toolbar">
        <div className="filters" role="group" aria-label="Status">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={status === f}
              onClick={() => setStatus(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => refetch()}>
          Refresh
        </button>
      </header>

      {isLoading && <p className="muted">Loading devices…</p>}

      {!isLoading && !data?.length && <p className="muted">No devices.</p>}

      <ul className="rows">
        {data?.map((device, i) => (
          <DeviceRow
            key={i}
            device={device}
            selected={device.id === selectedId}
            onSelect={() => onSelect(device.id)}
            onToggle={() => toggle.mutate(device)}
          />
        ))}
      </ul>
    </section>
  );
}

type RowProps = {
  device: Device;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
};

function DeviceRow({ device, selected, onSelect, onToggle }: RowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className={`row ${selected ? "selected" : ""}`}>
      <div className="line">
        <button
          type="button"
          className="chevron"
          aria-expanded={expanded}
          aria-label={`Expand ${device.name}`}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "▾" : "▸"}
        </button>
        <button type="button" className="name" onClick={onSelect}>
          {device.name}
        </button>
        <span className={`badge ${device.status}`}>{device.status}</span>
        <button type="button" className="toggle" onClick={onToggle}>
          {device.status === "online" ? "Take offline" : "Bring online"}
        </button>
      </div>
      {expanded && (
        <dl className="meta">
          <dt>kind</dt>
          <dd>{device.kind}</dd>
          <dt>ip</dt>
          <dd>{device.ip}</dd>
        </dl>
      )}
    </li>
  );
}
