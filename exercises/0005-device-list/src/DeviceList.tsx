/**
 * BEFORE THE CLOCK: copy the six requirements here.
 *
 *
 * **1 · The list is empty.** Support says the dashboard shows no devices at all, and there are 12.
**Done when:** all 12 devices are on screen under *all*, and the log shows
`GET /api/devices` answered `200`.

**2 · The filters do nothing.** Clicking *online* or *offline* changes the button and nothing
else. Offline devices sit behind a slow tunnel, so that filter takes 1.5s.
**Done when:** *offline* shows exactly the 5 offline devices and the log shows the
`status=offline` request. Then reload, click *offline*, and click *online* straight away. The
list ends on the 7 online devices and never shows an offline row along the way.

**3 · The details open on the wrong device.** An operator looks at *online*, goes back to
*all*, expands sensor-04 (▸), and switches to *online* again. The details are now open on a
device they never touched.
**Done when:** after that sequence, the list shows only online devices, sensor-04 is still
expanded, and it is the only expanded row.

**4 · "Take offline" doesn't stick.** The operator clicks it and the dashboard carries on
showing the device as online until someone reloads.
**Done when:** under *online*, clicking *Take offline* on cam-05 removes it from the list with
no reload. Switching to *all* shows cam-05 as offline. In the log, the list request that
follows starts **after** the `PATCH` ends. Compare the times.

**5 · The service falls over.** When the backend is down, the operator needs to know. When it
comes back, they need to carry on.
**Done when:** with *Simulate outage* ticked, *Refresh* puts a message on screen that an
operator would understand: no blank list, no raw error text, and nothing in the console. Untick
it and *Refresh* again: 12 devices, and no trace of the message.

**6 · The detail panel shows the wrong device.** Clicking a device name loads the panel on the
right, which takes 1.2s. Operators click one device, change their mind and click another.
**Done when:** you click cam-01 and then gw-08 before cam-01's details arrive. The panel never
shows cam-01, *Loading…* stays visible the whole time until gw-08 appears, and the log shows
`GET /api/devices/d1` as `aborted`.
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

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchDevices,
  setDeviceStatus,
  type Device,
  type StatusFilter,
} from "./api";

const FILTERS: StatusFilter[] = ["all", "online", "offline"];

type Props = {
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function DeviceList({ selectedId, onSelect }: Props) {
  const qc = useQueryClient();
  const [status, setStatus] = useState<StatusFilter>("all");

  const { data, isLoading, refetch, isError, error } = useQuery({
    queryKey: ["devices", { status }],
    queryFn: () => fetchDevices(status),
  });

  const toggle = useMutation({
    mutationFn: (device: Device) =>
      setDeviceStatus(
        device.id,
        device.status === "online" ? "offline" : "online",
      ),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ["devices", { status }],
      });
    },
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
      {isError && <p className="error">{error.message}</p>}

      {!isLoading && !data?.length && <p className="muted">No devices.</p>}

      <ul className="rows">
        {data?.map((device, i) => (
          <DeviceRow
            key={device.id}
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
