'use client';

import React from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  unit?: string;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, isPositive, unit, colorClass }) => {
  return (
    <div className={`metric-card ${colorClass}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value}
        {unit && <span style={{ fontSize: '16px', fontWeight: 'normal', color: 'rgba(255,255,255,0.7)' }}>{unit}</span>}
      </div>
      {change && (
        <div className={`metric-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
          {isPositive ? '↗' : '↘'} {change}
        </div>
      )}
    </div>
  );
};

const MetricsCards: React.FC = () => {
  return (
    <div className="metrics-grid">
      <MetricCard 
        label="Total meters" 
        value="25,35,567" 
        colorClass="total-meters"
      />
      <MetricCard 
        label="Interval Read Success Rate" 
        value="96.06" 
        unit="%" 
        change="1.9%" 
        isPositive={false} 
        colorClass="success-rate"
      />
      <MetricCard 
        label="Failed Reads" 
        value="3.94" 
        unit="%" 
        change="1.9%" 
        isPositive={false} 
        colorClass="failed-reads"
      />
      <MetricCard 
        label="Time Duration" 
        value="1.5" 
        unit=" min" 
        change="2.1%" 
        isPositive={false} 
        colorClass="time-duration"
      />
      <MetricCard 
        label="Predicted Daily Meters" 
        value="754" 
        change="2.02%" 
        isPositive={false} 
        colorClass="predicted-meters"
      />
    </div>
  );
};

export default MetricsCards;