// ---------------------------------------------------------------------------
// The backend. Not yours: nothing in this file is a bug.
//
// It replaces window.fetch for /api/* and logs every request to the panel on the page, so
// every done-condition in the brief is something you can look at.
//
//   GET   /api/devices               -> 200 { items: Device[], total: number }   300ms
//   GET   /api/devices?status=...    -> same shape, filtered. "offline" takes 1500ms.
//   GET   /api/devices/:id           -> 200 Device                               1200ms
//   PATCH /api/devices/:id  {status} -> 200 Device                                400ms
//   anything else                    -> 404 { error }
//
// While "Simulate outage" is on, every GET answers 500 { error }.
// All endpoints honour an AbortSignal.
// ---------------------------------------------------------------------------

export type DeviceStatus = "online" | "offline";

export type Device = {
  id: string;
  name: string;
  kind: "camera" | "sensor" | "gateway";
  status: DeviceStatus;
  ip: string;
  firmware: string;
};

const devices: Device[] = [
  ["cam-01", "camera", "online"],
  ["cam-02", "camera", "offline"],
  ["gw-01", "gateway", "online"],
  ["sensor-03", "sensor", "offline"],
  ["sensor-04", "sensor", "online"],
  ["cam-05", "camera", "online"],
  ["sensor-06", "sensor", "offline"],
  ["sensor-07", "sensor", "online"],
  ["gw-08", "gateway", "online"],
  ["cam-09", "camera", "offline"],
  ["sensor-10", "sensor", "online"],
  ["sensor-11", "sensor", "offline"],
].map(([name, kind, status], i) => ({
  id: `d${i + 1}`,
  name,
  kind: kind as Device["kind"],
  status: status as DeviceStatus,
  ip: `10.0.4.${20 + i}`,
  firmware: `3.${i % 4}.${(i * 7) % 10}`,
}));

// ---- the log --------------------------------------------------------------

export type LogEntry = {
  n: number;
  method: string;
  path: string;
  startedAt: number;
  endedAt?: number;
  result: "in flight" | "aborted" | number;
};

let entries: LogEntry[] = [];
let n = 0;
let t0 = performance.now();
let outage = false;
const listeners = new Set<() => void>();

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
    n = 0;
    t0 = performance.now();
    emit();
  },
};

export const outageSwitch = {
  get: () => outage,
  set(on: boolean) {
    outage = on;
    emit();
  },
};

const now = () => Math.round(performance.now() - t0) / 1000;

// ---- the routes -----------------------------------------------------------

type Answer = { status: number; body: unknown; delay: number };

function route(method: string, url: URL, body: unknown): Answer {
  const list = url.pathname === "/api/devices";
  const one = url.pathname.match(/^\/api\/devices\/([^/]+)$/);

  if (method === "GET" && outage && (list || one)) {
    return { status: 500, body: { error: "upstream timeout" }, delay: 300 };
  }
  if (method === "GET" && list) {
    const status = url.searchParams.get("status");
    const items = status ? devices.filter((d) => d.status === status) : devices;
    return {
      status: 200,
      body: { items: structuredClone(items), total: items.length },
      delay: status === "offline" ? 1500 : 300,
    };
  }
  if (one) {
    const device = devices.find((d) => d.id === one[1]);
    if (!device) return { status: 404, body: { error: "no such device" }, delay: 200 };
    if (method === "GET") return { status: 200, body: structuredClone(device), delay: 1200 };
    if (method === "PATCH") {
      // Applied when the response is sent, not when the request arrives.
      return { status: 200, body: { patch: body, id: device.id }, delay: 400 };
    }
  }
  return { status: 404, body: { error: "Not found" }, delay: 150 };
}

function apply(answer: Answer): unknown {
  const b = answer.body as { patch?: Partial<Device>; id?: string };
  if (!b.patch) return answer.body;
  const device = devices.find((d) => d.id === b.id)!;
  Object.assign(device, b.patch);
  return structuredClone(device);
}

const realFetch = window.fetch.bind(window);

window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const url = new URL(typeof input === "string" ? input : input.toString(), location.origin);
  if (!url.pathname.startsWith("/api/")) return realFetch(input, init);

  const method = (init?.method ?? "GET").toUpperCase();
  const body = init?.body ? JSON.parse(String(init.body)) : undefined;
  const entry: LogEntry = {
    n: ++n,
    method,
    path: url.pathname + url.search,
    startedAt: now(),
    result: "in flight",
  };
  entries.push(entry);
  emit();

  const answer = route(method, url, body);
  const signal = init?.signal;

  return new Promise<Response>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      entry.result = "aborted";
      entry.endedAt = now();
      emit();
      reject(new DOMException("The operation was aborted.", "AbortError"));
    };
    if (signal?.aborted) return abort();

    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", abort);
      const payload = answer.status === 200 ? apply(answer) : answer.body;
      entry.result = answer.status;
      entry.endedAt = now();
      emit();
      resolve(
        new Response(JSON.stringify(payload), {
          status: answer.status,
          headers: { "Content-Type": "application/json" },
        }),
      );
    }, answer.delay);

    signal?.addEventListener("abort", abort, { once: true });
  });
};
