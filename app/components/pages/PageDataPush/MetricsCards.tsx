// 'use client';

// import React, { useEffect, useState, useRef } from 'react';

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
//   const [totalMeters, setTotalMeters] = useState<string>('—');
//   const [isFetching, setIsFetching] = useState<boolean>(true);

//   useEffect(() => {
//     let isMounted = true;
//     const fetchCount = async () => {
//       try {
//         const res = await fetch('/api/dp/meterscount', { cache: 'no-store' });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const text = await res.text();
//         const num = Number(text);
//         const formatted = Number.isFinite(num) ? num.toLocaleString() : '—';
//         if (!isMounted) return;
//         setTotalMeters(prev => (prev === formatted ? prev : formatted));
//       } catch (e) {
//         if (!isMounted) return;
//         setTotalMeters('—');
//         console.error('Failed to fetch meters count', e);
//       } finally {
//         if (!isMounted) return;
//         setIsFetching(false);
//       }
//     };
//     // initial load
//     setIsFetching(true);
//     fetchCount();
//     // poll every 10s
//     const intervalId = setInterval(fetchCount, 86400);
//     return () => {
//       isMounted = false;
//       clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <div className="metrics-grid">
//       <MetricCard label="Total meters" value={totalMeters} colorClass="total-meters" />
//       <MetricCard label="Interval Read Success Rate" value="96.06" unit="%" change="1.9%" isPositive={false} colorClass="success-rate" />
//       <MetricCard label="Failed Reads" value="3.94" unit="%" change="1.9%" isPositive={false} colorClass="failed-reads" />
//       <MetricCard label="Time Duration" value="1.5" unit=" min" change="2.1%" isPositive={false} colorClass="time-duration" />
//       <MetricCard label="Predicted Daily Meters" value="754" change="2.02%" isPositive={false} colorClass="predicted-meters" />
//     </div>
//   );
// };

// export default MetricsCards;


import React, { useEffect, useState } from 'react';

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
  const [metrics, setMetrics] = useState<MetricCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://68a32f42c5a31eb7bb1f50b9.mockapi.io/api/label')
      .then(res => res.json())
      .then(data => {
        setMetrics(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="metrics-grid">
      {metrics.map((metric, idx) => (
        <MetricCard key={idx} {...metric} />
      ))}
    </div>
  );
};

export default MetricsCards;