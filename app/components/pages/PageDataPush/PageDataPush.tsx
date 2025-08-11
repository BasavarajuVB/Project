'use client';

import React from 'react';
import MetricsCards from './MetricsCards';
import LiveIntervalChart from './charts/LiveIntervalChart';
import MonthlySuccessChart from './charts/MonthlySuccessChart';
import PerformanceByOEM from './charts/PerformanceByOEM';
import QualityMetrics from '../../common/QualityMetrics';
import AdditionalWidgets from './widgets/AdditionalWidgets';
import FailedCapturesWidget from './widgets/FailedCapturesWidget';

interface PageDataPushProps {
  onExport: (format: 'csv' | 'xlsx') => void;
}

const PageDataPush: React.FC<PageDataPushProps> = ({ onExport }) => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button className="export-btn" onClick={() => onExport('csv')}>Export</button>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Charts Row */}
      <div className="charts-grid">
        <LiveIntervalChart />
        <MonthlySuccessChart />
      </div>

      {/* Two-column stacks to avoid large vertical gap under OEM */}
      <div className="two-col-stacks">
        <div className="col-stack">
          <PerformanceByOEM />
          <div className="cards-grid cards-left">
            <AdditionalWidgets title="Tampers" value="39" change="0%" isPositive={false} />
            <AdditionalWidgets title="Outages" value="12" change="6%" isPositive={false} />
            <AdditionalWidgets title="Power Quality Deviations" value="15" change="5%" isPositive={true} />
          </div>
        </div>
        <div className="col-stack">
          <div className="cards-grid cards-right">
            <QualityMetrics title="Consistency" value="99.5%" change="1.9%" subValue="9.96.006" isPositive={false} />
            <QualityMetrics title="Quality" value="98%" change="5%" subValue="8.75.634" isPositive={false} />
            <QualityMetrics title="Security" value="99.5%" change="3%" subValue="21" isPositive={true} />
          </div>
          <FailedCapturesWidget />
        </div>
      </div>
    </>
  );
};

export default PageDataPush;


