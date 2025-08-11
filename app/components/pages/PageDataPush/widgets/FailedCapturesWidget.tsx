'use client';

import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

interface FailedCaptureItem {
  label: string;
  percentage: number;
  color: string;
}

const failedCapturesData: FailedCaptureItem[] = [
  { label: 'Meters', percentage: 67, color: '#cf66e4' },
  { label: 'Communication', percentage: 45, color: '#55c0b5' },
  { label: 'Software', percentage: 24, color: '#fdd835' },
];

const FailedCapturesWidget: React.FC = () => {
  return (
    <div className="fc-card">
      <div className="fc-header">
        <span className="fc-title">Failed Captures — Reason Buckets</span>
        <InfoCircleOutlined className="fc-icon" />
      </div>

      <div className="fc-list">
        {failedCapturesData.map((item, index) => (
          <div key={index} className="fc-item">
            <span className="fc-label">{item.label}</span>
            <div className="fc-progress-wrapper">
              <div className="fc-progress-bg" />
              <div className="fc-progress-fill" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
            </div>
            <span className="fc-percentage">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FailedCapturesWidget;


