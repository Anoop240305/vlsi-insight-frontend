# Silicon Insight — frontend

React + Tailwind + Recharts frontend for the Vivado Report Analysis & AI Insight Platform.
Frontend only: data comes from `src/data/mockData.js` until the Django API is connected.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

Without `VITE_API_BASE_URL` the app runs in demo mode: any username and password signs in.

## Theme

- The page opens in the saved choice, or otherwise the device/browser theme (light or dark), with no flash.
- It follows live system changes until the user presses the toggle (sidebar, bottom).
- Logic: `src/theme/theme.js` (pure) and `src/theme/ThemeProvider.jsx` (`useTheme()`).
  `index.html` has a tiny inline script that applies the theme before first paint.
- Colours live in one place: `src/styles/tokens.css` (light and dark). Tailwind classes such as
  `bg-card`, `text-muted`, `border-line` read those tokens. Charts use `src/theme/chartTheme.js`.

## Structure

```
index.html                     pre-paint theme script, fonts
vercel.json                    SPA fallback so /dashboard/... works on refresh
src/
  main.jsx                     entry
  app/App.jsx                  providers + routes
  theme/                       theme.js, ThemeProvider.jsx, chartTheme.js
  lib/api.js                   fetch wrapper, JWT refresh, demo mode
  data/mockData.js             placeholder data for every page
  styles/                      tokens.css (colours), index.css (Tailwind)
  components/
    layout/                    Sidebar.jsx, Topbar.jsx, DashboardLayout.jsx, navItems.js
    ui/                        Card, PageHeader, StatusPill, HealthGauge, ThemeToggle
  features/                    one folder per feature, exported from features/index.js
    auth/  overview/  upload/  timing/  power/  utilization/  anomalies/  insights/  versions/
  pages/
    Login.jsx
    dashboard/                 thin pages: pick data, compose features
```

To add a page: create a folder in `features/`, export it from `features/index.js`, add a file in
`pages/dashboard/`, a route in `app/App.jsx` and a link in `components/layout/navItems.js`.

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
