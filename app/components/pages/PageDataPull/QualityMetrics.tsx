'use client';

import React from 'react';

interface QualityMetricsProps {
  title: string;
  value: string;
  change: string;
  subValue: string;
  isPositive: boolean;
}

const QualityMetrics: React.FC<QualityMetricsProps> = ({ 
  title, 
  value, 
  change, 
  subValue, 
  isPositive 
}) => {
  return (
    <div className={`widget-card ${isPositive ? 'positive' : ''}`}>
      <div className="widget-label">{title}</div>
      <div className="widget-value">{value}</div>
      <div className={`widget-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
        {isPositive ? '↗' : '↘'} {change}
      </div>
      <div style={{ 
        fontSize: '12px', 
        color: '#8fa8c2', 
        marginTop: '8px' 
      }}>
        {subValue}
      </div>
    </div>
  );
};

export default QualityMetrics;


