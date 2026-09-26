# Exercise 0005: device list

**25 minutes. Six requirements. They do not all fit, and that is deliberate.** This is the
"here's our app, it's broken" round. What gets graded is what you finish, what you choose not
to finish, and whether you say so.

```sh
npm install
npm run dev
```

An ops dashboard for devices, built on TanStack Query, plus one older panel written before the
team adopted it. The backend is faked in `src/server.ts`. Its routes, shapes and latencies are
documented at the top of that file, and it is correct. The request log at the bottom of the page
shows every call with start → end times in seconds, and the **Simulate outage** switch lives
there too. Reloading the page resets the backend, so reload between checks.

Not yours, and none of it contains a bug: `server.ts`, the `RequestLog` in `App.tsx`, and the
`QueryClient` config in `main.tsx`.

## Protocol

1. Before the clock, copy the six requirements into the comment block at the top of
   `src/DeviceList.tsx`.
2. Finish each requirement against its done-condition before moving on to the next one.
3. Budget the clock. Take one cheap pass first: reproduce every symptom and write a one-line
   guess next to it, then go deep in the order you choose.
4. At the buzzer, fill in the table in that comment block: which requirements pass, a one-line
   fix for each that does, and what is unmet for each that doesn't. A requirement you name as
   skipped scores better than one you leave untouched without a word.

## Requirements

A requirement scores **1 only if its done-condition passes** when re-run.

**1 · The list is empty.** Support says the dashboard shows no devices at all, and there are 12.
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

**Do not open `AFTER-THE-TIMER.md` until the 25 minutes are up.**
