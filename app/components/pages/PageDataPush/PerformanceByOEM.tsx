'use client';

import React from 'react';

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
  return (
    <div className="oem-perf-card">
      <div className="oem-perf-header">
        <span className="oem-perf-title">Performance by OEM</span>
      </div>
      <div className="oem-perf-list">
        <OEMPerformanceItem name="Adya" percentage={97} color="#cf66e4" />
        <OEMPerformanceItem name="HPL" percentage={94} color="#55c0b5" />
        <OEMPerformanceItem name="Genus" percentage={86} color="#fdd835" />
      </div>
    </div>
  );
};

export default PerformanceByOEM;


