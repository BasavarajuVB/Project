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

// Static OEM data for now; dynamic fetching is commented below
const staticOemData: OEMPerformanceProps[] = [
  { name: 'Adya', percentage: 96.2, color: '#cf66e4' },
  { name: 'HPL', percentage: 94.8, color: '#55c0b5' },
  { name: 'Genus', percentage: 92.1, color: '#fdd835' },
];

const PerformanceByOEM: React.FC = () => {
  return (
    <div className="oem-perf-card">
      <div className="oem-perf-header">
        <span className="oem-perf-title">Performance by OEM</span>
      </div>
      <div className="oem-perf-list">
        {staticOemData.map((item, idx) => (
          <OEMPerformanceItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PerformanceByOEM;

/*
// Previous dynamic implementation (commented out for static mode)
import React, { useEffect, useState } from 'react';
// useEffect(() => { fetch('/api/charts/oem-performance') ... })
*/
