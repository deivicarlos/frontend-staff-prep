import type { Device, DeviceStatus } from "./server";

export type { Device, DeviceStatus };
export type StatusFilter = "all" | DeviceStatus;

export async function fetchDevices(status: StatusFilter): Promise<Device[]> {
  const qs = status === "all" ? "" : `?status=${status}`;
  const url = `/api/devices${qs}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.items;
}

export async function fetchDevice(
  id: string,
  signal?: AbortSignal,
): Promise<Device> {
  const res = await fetch(`/api/devices/${id}`, { signal });
  if (!res.ok) throw new Error(`GET /api/devices/${id} failed: ${res.status}`);
  return res.json();
}

export async function setDeviceStatus(
  id: string,
  status: DeviceStatus,
): Promise<Device> {
  const res = await fetch(`/api/devices/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok)
    throw new Error(`PATCH /api/devices/${id} failed: ${res.status}`);
  return res.json();
}
