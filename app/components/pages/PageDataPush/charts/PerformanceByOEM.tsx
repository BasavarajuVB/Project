'use client';

import React, { useEffect, useState } from 'react';

interface OEMPerformanceProps {
  name: string;
  percentage: number;
  color: string;
}

const OEMPerformanceItem: React.FC<OEMPerformanceProps> = ({ name, percentage, color }) => {
  return (
    <div className="oem-perf-item">
      <span className="oem-perf-name">{name}</span>
      <div className="oem-perf-bar-wrapper">
        <div className="oem-perf-bar-bg" />
        <div className="oem-perf-bar-fill" style={{ width: `${percentage}%`, backgroundColor: color }} />
      </div>
      <span className="oem-perf-percentage">{percentage}%</span>
    </div>
  );
};

const PerformanceByOEM: React.FC = () => {
  const [oemData, setOemData] = useState<OEMPerformanceProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/charts/oem-performance', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const apiData: Array<{ name: string; percentage: number }> = await res.json();
        const limited = Array.isArray(apiData) ? apiData.slice(0, 3) : [];
        const palette = ['#cf66e4', '#55c0b5', '#fdd835', '#ff8a65', '#64b5f6'];
        const processed: OEMPerformanceProps[] = limited.map((item, idx) => ({
          name: item.name,
          percentage: Math.round(item.percentage * 100) / 100,
          color: palette[idx % palette.length],
        }));
        setOemData(processed);
      } catch (e) {
        console.error('Failed to fetch OEM performance', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="oem-perf-card" style={{ height: '100px' }}>Loading...</div>;
  }

  return (
    <div className="oem-perf-card">
      <div className="oem-perf-header">
        <span className="oem-perf-title">Performance by OEM</span>
      </div>
      <div className="oem-perf-list">
        {oemData.map((item, idx) => (
          <OEMPerformanceItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PerformanceByOEM;
