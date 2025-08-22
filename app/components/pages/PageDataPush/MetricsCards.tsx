'use client';

import React, { useState } from 'react';

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
  // Fully static values (no API calls)
  const [totalMeters] = useState<string>('1000');
  const [successRate] = useState<string>('92.00');
  const [failedRate] = useState<string>('8.00');
  const [timeDuration] = useState<string>('1.5');

  return (
    <div className="metrics-grid">
      <MetricCard label="Total meters" value={totalMeters} colorClass="total-meters" />
      <MetricCard label="Interval Read Success Rate" value={successRate} unit="%" colorClass="success-rate" />
      <MetricCard label="Failed Reads" value={failedRate} unit="%" colorClass="failed-reads" />
      <MetricCard label="Time Duration" value={timeDuration} unit=" min" colorClass="time-duration" />
      <MetricCard label="Predicted Daily Meters" value="16" change="2.02%" isPositive={false} colorClass="predicted-meters" />
    </div>
  );
};

export default MetricsCards;


// import React, { useEffect, useState } from 'react';

// interface MetricCardProps {
//   label: string;
//   value: string;
//   change?: string;
//   isPositive?: boolean;
//   unit?: string;
//   colorClass: string;
// }

// const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, isPositive, unit, colorClass }) => {
//   return (
//     <div className={`metric-card ${colorClass}`}>
//       <div className="metric-label">{label}</div>
//       <div className="metric-value">
//         {value}
//         {unit && <span style={{ fontSize: '16px', fontWeight: 'normal', color: 'rgba(255,255,255,0.7)' }}>{unit}</span>}
//       </div>
//       {change && (
//         <div className={`metric-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
//           {isPositive ? '↗' : '↘'} {change}
//         </div>
//       )}
//     </div>
//   );
// };

// const MetricsCards: React.FC = () => {
//   const [metrics, setMetrics] = useState<MetricCardProps[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('https://68a32f42c5a31eb7bb1f50b9.mockapi.io/api/label')
//       .then(res => res.json())
//       .then(data => {
//         setMetrics(data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="metrics-grid">
//       {metrics.map((metric, idx) => (
//         <MetricCard key={idx} {...metric} />
//       ))}
//     </div>
//   );
// };

// export default MetricsCards;