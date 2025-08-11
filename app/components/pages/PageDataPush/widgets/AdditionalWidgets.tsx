'use client';

import React from 'react';

interface AdditionalWidgetsProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const AdditionalWidgets: React.FC<AdditionalWidgetsProps> = ({ 
  title, 
  value, 
  change, 
  isPositive 
}) => {
  return (
    <div className={`widget-card ${isPositive ? 'positive' : ''}`}>
      <div className="widget-label">{title}</div>
      <div className="widget-value">{value}</div>
      <div className={`widget-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
        {isPositive ? '↗' : '↘'} {change}
      </div>
    </div>
  );
};

export default AdditionalWidgets;


