# Silicon Insight — frontend

React + Tailwind frontend for the Vivado Report Analysis & AI Insight Platform
(Input Layer → Parsing → Analytics → AI → Django backend → this dashboard).

Frontend only, as requested — no backend logic included. UI/interaction logic
(uploads triggering real parses, charts pulling live data, etc.) is stubbed
with mock data and marked `TODO` so you can wire it up yourself.

## Design direction

Theme is built from the subject matter, not a generic dark-SaaS look:
- **Login page** — full-bleed schematic/trace background, login form framed
  as an IC package (`ChipFrame`) with pin ticks and a silkscreened designator.
- **Dashboard** — sidebar reads like a netlist tree; the health score renders
  as a scope-style radial gauge; status pills use MET / MARGINAL / VIOLATED
  language straight out of a real timing report.
- **Type** — IBM Plex Sans for UI text, IBM Plex Mono for all metrics/data,
  since that's how EDA tool output actually looks.
- **Color** — copper/signal-teal accents on a graphite substrate background
  (`tailwind.config.js` → `substrate`, `copper`, `signal`, `pass/warn/fail`).

## Run it

```bash
npm install
npm run dev
```

Any username/password logs in — `src/lib/api.js` mocks the JWT exchange in
dev mode so the UI is usable immediately.

## Structure

```
src/
  context/AuthContext.jsx     JWT-aware auth state (login/logout/user)
  lib/api.js                  fetch wrapper: attaches Bearer token, retries
                               once through /token/refresh/ on 401
  components/
    ProtectedRoute.jsx        redirects to /login when unauthenticated
    layout/                   Sidebar (slidable/collapsible), Topbar, shell
    ui/                       ChipFrame, CircuitBackground, HealthGauge,
                               StatusPill, PanelCard — reusable primitives
  pages/
    Login.jsx
    dashboard/
      Overview.jsx            health score + key metrics + timing trend
      Upload.jsx               Step 1: .rpt upload → parsing queue
      Timing.jsx               Step 2/3: critical path table
      Power.jsx                power breakdown chart
      Utilization.jsx          LUT/FF/BRAM/DSP/IO usage bars
      Anomalies.jsx            Isolation Forest / One-Class SVM flags
      AIInsights.jsx           Step 4: plain-English summaries + report refs
      VersionCompare.jsx       Step 7: health score across versions
  data/mockData.js            placeholder shapes for every page above
```

## Wiring up your Django backend

1. Set `VITE_API_BASE_URL` in a `.env` file to your API root.
2. In `src/lib/api.js`, point `loginRequest` and `refreshRequest` at your
   real `/token/` and `/token/refresh/` endpoints (SimpleJWT-shaped
   `{ access, refresh }` responses work with no other changes).
3. Replace the arrays in `src/data/mockData.js` with `apiFetch()` calls
   against your REST endpoints for summary, timing, power, utilization,
   anomalies, insights, and version history.
4. `Upload.jsx` currently simulates the parse pipeline client-side —
   replace `addFiles` with a real multipart POST and either poll a status
   endpoint or move to a websocket if you want live parser progress.
