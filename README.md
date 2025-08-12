# HES Data Operations Dashboard

A comprehensive dashboard built with Next.js, TypeScript, and Ant Design that replicates the HES (Head End System) SLA Dashboard for monitoring both Data Push and Data Pull metrics.

## Features

- **Data Push Dashboard**
  - Real-time metrics: total meters, read success rate, failed reads, time duration, predicted daily meters
  - Live interval success rate chart
  - Monthly success rate chart
  - Performance by OEM with progress bars
  - Quality metrics (Consistency, Quality, Security) with trend indicators
  - Additional widgets (Tampers, Outages, Power Quality Deviations)
  - Failed captures breakdown by reason bucket
  - One-click export of on-screen data (CSV)

- **Data Pull Dashboard**
  - Top filters for time span and sections
  - Metrics cards and two read-success charts
  - Command Status table with progress visuals and pagination
  - Data Collection pie chart with legend
  - Quality metrics cards and failed captures widget
  - Export of table data (CSV)

- **AI Assistant Panel**
  - Docked panel with suggestions and simple chat simulation

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Ant Design** for UI components
- **Recharts** for interactive charts
- **Custom CSS** for exact visual matching (global + CSS Modules)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx              # Top header (breadcrumb, actions)
│   │   │   └── QualityMetrics.tsx      # Reusable quality metric widget
│   │   └── pages/
│   │       ├── PageDataPush/
│   │       │   ├── charts/
│   │       │   │   ├── LiveIntervalChart.tsx
│   │       │   │   ├── MonthlySuccessChart.tsx
│   │       │   │   └── PerformanceByOEM.tsx
│   │       │   ├── widgets/
│   │       │   │   ├── AdditionalWidgets.tsx
│   │       │   │   ├── CopilotWidget.tsx
│   │       │   │   └── FailedCapturesWidget.tsx
│   │       │   ├── MetricsCards.tsx
│   │       │   └── PageDataPush.tsx
│   │       └── PageDataPull/
│   │           ├── DataPullDashboard.module.css
│   │           ├── DataPullDashboard.tsx
│   │           ├── FailedCapturesWidget.tsx
│   │           └── PageDataPull.tsx
│   ├── styles/
│   │   └── globals.css                 # Global styles and theme
│   ├── layout.tsx                      # Root layout + Ant Design config
│   └── page.tsx                        # Main dashboard shell (navigation)
├── package.json
├── tsconfig.json
└── next.config.js
```

## Dashboard Layout

The main shell renders a fixed sidebar, a top `Header`, and switches between Data Push and Data Pull dashboards via the in-app menu.

## Styling

- Global theme and shared styles live in `app/styles/globals.css`
- Data Pull dashboard uses a CSS Module: `DataPullDashboard.module.css`
- Dark blue theme (`#1e3a5f`) with gradient cards, orange accent (`#ff6b35`), and responsive grids

## Customization

- Update theme and shared styles in `app/styles/globals.css`
- Add or modify cards in `MetricsCards.tsx`
- Adjust chart data inside components in `charts/`
- Add new widgets following the patterns in `widgets/`

## Production Build

```bash
npm run build
npm start
```

The dashboard is optimized for production with Next.js automatic optimizations.