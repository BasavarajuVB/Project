# Data Push API Reference

## Base API URLs

- DP base (prod/public): `http://103.114.154.128:30808/dp`
- Charts base (dev/LAN): `http://192.168.0.235:8080/api/charts`

Frontend calls use proxy routes and are forwarded via rewrites:
- `/api/dp/:path*` → DP base
- `/api/charts/:path*` → Charts base (see `next.config.js`)

---

- Total meters
  - Route: `/api/dp/meterscount`
  - Component: `app/components/pages/PageDataPush/MetricsCards.tsx`
  - Response: plain text number (e.g., `2535567`). Displayed with thousand separators.

- Interval success rate (overall)
  - Route: `/api/dp/meterscount/success`
  - Component: `app/components/pages/PageDataPush/MetricsCards.tsx`
  - Response: JSON: `{ "successPercentage": number | 0, "percentChange": number | null }`
  - Behavior: if `successPercentage` is 0, UI shows fallback 96.06; failure shown as `100 - success`.

- Duration
  - Route: `/api/dp/duration`
  - Component: `app/components/pages/PageDataPush/MetricsCards.tsx`
  - Response: JSON: `{ "durationSeconds": number | null, "percentChange": number | null }`
  - Behavior: if null, UI shows `1.5` minutes; else `(durationSeconds/60).toFixed(1)`.

- Live interval chart (by intervals)
  - Route: `/api/dp/meterscount/success/byintervals`
  - Component: `app/components/pages/PageDataPush/charts/LiveIntervalChart.tsx`
  - Response: JSON array of `{ successPercentage: number, intervalStart: string, meterCount?: number, expectedMetersCount?: number }`
  - Behavior: x-axis shows formatted date/time; failure computed as `100 - success`.

- Monthly success chart
  - Route: `/api/charts/monthly-success`
  - Component: `app/components/pages/PageDataPush/charts/MonthlySuccessChart.tsx`
  - Response: JSON array of `{ date: string, success: number|string, failure: number|string }`

- Performance by OEM
  - Route: `/api/charts/oem-performance`
  - Component: `app/components/pages/PageDataPush/charts/PerformanceByOEM.tsx`
  - Response: JSON array of `{ name: string, percentage: number }`

- Widgets
  - Tampers
    - Route: `/api/dp/tampers`
    - Component: `app/components/pages/PageDataPush/PageDataPush.tsx`
    - Response: plain text number (e.g., `0`)
  - Outages
    - Route: `/api/dp/outages`
    - Component: `app/components/pages/PageDataPush/PageDataPush.tsx`
    - Response: plain text number
  - Power Quality Deviations
    - Route: `/api/dp/powerdeviations`
    - Component: `app/components/pages/PageDataPush/PageDataPush.tsx`
    - Response: plain text number

Notes
- Local dev uses `next.config.js` rewrites; Vercel uses `vercel.json` rewrites. Ensure the destination hosts are reachable.
- All fetches use `{ cache: 'no-store' }` to avoid stale data. Polling is 10s where applicable.
