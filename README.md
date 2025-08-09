# SLA Dashboard - Data Push

A comprehensive dashboard built with Next.js, TypeScript, and Ant Design that replicates the HES (Head End System) SLA Dashboard for monitoring Data Push metrics.

## Features

- **Real-time Metrics Display**: Shows total meters, success rates, failed reads, time duration, and predicted daily meters
- **Live Interval Charts**: Interactive bar charts showing real-time interval read success rates
- **Monthly Success Tracking**: Historical monthly interval read success rate visualization
- **Performance by OEM**: Progress bars showing performance metrics by Original Equipment Manufacturer
- **Quality Metrics**: Consistency, Quality, and Security indicators with trend arrows
- **Additional Widgets**: Tampers, Outages, and Power Quality Deviations monitoring
- **Failed Captures Analysis**: Breakdown of failed captures by reason buckets (Meters, Communication, Software)

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Ant Design** for UI components
- **Recharts** for interactive charts
- **Custom CSS** for exact visual matching

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
│   │   ├── MetricsCards.tsx         # Top metric cards
│   │   ├── LiveIntervalChart.tsx    # Live interval success rate chart
│   │   ├── MonthlySuccessChart.tsx  # Monthly success rate chart
│   │   ├── PerformanceByOEM.tsx     # OEM performance bars
│   │   ├── QualityMetrics.tsx       # Quality metric widgets
│   │   ├── AdditionalWidgets.tsx    # Tampers, Outages, etc.
│   │   └── FailedCapturesWidget.tsx # Failed captures breakdown
│   ├── globals.css                  # Global styles and theme
│   ├── layout.tsx                   # Root layout with Ant Design config
│   └── page.tsx                     # Main dashboard page
├── package.json
├── tsconfig.json
└── next.config.js
```

## Dashboard Layout

The dashboard includes:

1. **Sidebar Navigation**: HES branding with menu items for different sections
2. **Header Section**: Breadcrumb navigation, live status indicator, and export button
3. **Metrics Row**: 5 key performance indicators with trend arrows
4. **Charts Row**: Live and monthly interval success rate charts
5. **Performance Row**: OEM performance and quality metrics
6. **Widgets Row**: Additional monitoring widgets and failed captures analysis

## Styling

The dashboard uses a dark blue theme (`#1e3a5f`) with:
- Gradient card backgrounds
- Orange accent color (`#ff6b35`) for the selected menu item and export button
- Green/red indicators for positive/negative trends
- Responsive grid layouts
- Smooth hover effects and transitions

## Customization

You can customize the dashboard by:
- Modifying colors in `globals.css`
- Adding new metric cards in `MetricsCards.tsx`
- Updating chart data in the respective chart components
- Adding new widgets following the existing component patterns

## Production Build

To create a production build:

```bash
npm run build
npm start
```

The dashboard is optimized for production with Next.js automatic optimization features.