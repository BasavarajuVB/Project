'use client';

import React, { useEffect, useState } from 'react';
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
  // Static values for now
  const [tampers, setTampers] = useState<string>('12');
  const [powerDeviations, setPowerDeviations] = useState<string>('31');
  const [outages, setOutages] = useState<string>('7');

  // Dynamic tampers polling
  useEffect(() => {
    let isMounted = true;
    const fetchTampers = async () => {
      try {
        const res = await fetch('/api/dp/tampers', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = (await res.text()).trim();
        if (!isMounted) return;
        setTampers(prev => (prev === text ? prev : text));
      } catch (e) {
        if (!isMounted) return;
        // silent fail, keep last
      }
    };
    fetchTampers();
    const intervalId = setInterval(fetchTampers, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchPowerDeviations = async () => {
      try {
        const res = await fetch('/api/dp/powerdeviations', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = (await res.text()).trim();
        if (!isMounted) return;
        setPowerDeviations(prev => (prev === text ? prev : text));
      } catch (e) {
        if (!isMounted) return;
        // silent fail, keep last
      }
    };
    fetchPowerDeviations();
    const intervalId = setInterval(fetchPowerDeviations, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchOutages = async () => {
      try {
        const res = await fetch('/api/dp/outages', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = (await res.text()).trim();
        if (!isMounted) return;
        setOutages(prev => (prev === text ? prev : text));
      } catch (e) {
        if (!isMounted) return;
        // silent fail, keep last
      }
    };
    fetchOutages();
    const intervalId = setInterval(fetchOutages, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);
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
            <AdditionalWidgets title="Tampers" value={tampers} change="0%" isPositive={false} />
            <AdditionalWidgets title="Outages" value={outages} change="6%" isPositive={false} />
            <AdditionalWidgets title="Power Quality Deviations" value={powerDeviations} change="5%" isPositive={true} />
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


