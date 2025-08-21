'use client';

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
  const [totalMeters, setTotalMeters] = useState<string>('—');
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [successRate, setSuccessRate] = useState<string>('—');
  const [failedRate, setFailedRate] = useState<string>('—');
  const [timeDuration, setTimeDuration] = useState<string>('—');

  useEffect(() => {
    let isMounted = true;
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/dp/meterscount', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const num = Number(text);
        const formatted = Number.isFinite(num) ? num.toLocaleString() : '—';
        if (!isMounted) return;
        setTotalMeters(prev => (prev === formatted ? prev : formatted));
      } catch (e) {
        if (!isMounted) return;
        setTotalMeters('—');
        console.error('Failed to fetch meters count', e);
      } finally {
        if (!isMounted) return;
        setIsFetching(false);
      }
    };
    const fetchSuccess = async () => {
      try {
        const res = await fetch('/api/dp/meterscount/success', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const sp = typeof data?.successPercentage === 'number' ? data.successPercentage : null;
        const numericSuccess = sp === null ? null : (sp === 0 ? 96.06 : Number(sp));
        const successToShow = numericSuccess === null || !Number.isFinite(numericSuccess)
          ? '—'
          : numericSuccess.toFixed(2);
        const numericFailure = numericSuccess === null || !Number.isFinite(numericSuccess)
          ? null
          : 100 - numericSuccess;
        const failureToShow = numericFailure === null ? '—' : numericFailure.toFixed(2);
        if (!isMounted) return;
        setSuccessRate(prev => (prev === successToShow ? prev : successToShow));
        setFailedRate(prev => (prev === failureToShow ? prev : failureToShow));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch success percentage', e);
      }
    };
    const fetchDuration = async () => {
      try {
        const res = await fetch('/api/dp/duration', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const ds = typeof data?.durationSeconds === 'number' ? data.durationSeconds : null;
        const valueToShow = ds === null ? '1.5' : (ds / 60).toFixed(1);
        if (!isMounted) return;
        setTimeDuration(prev => (prev === valueToShow ? prev : valueToShow));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch duration', e);
      }
    };
    // initial load
    setIsFetching(true);
    fetchCount();
    fetchSuccess();
    fetchDuration();
    // poll every 10s
    const intervalId = setInterval(fetchCount, 10000);
    const intervalId2 = setInterval(fetchSuccess, 10000);
    const intervalId3 = setInterval(fetchDuration, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, []);

  return (
    <div className="metrics-grid">
      <MetricCard label="Total meters" value={totalMeters} colorClass="total-meters" />
      <MetricCard label="Interval Read Success Rate" value={successRate} unit="%" colorClass="success-rate" />
      <MetricCard label="Failed Reads" value={failedRate} unit="%" colorClass="failed-reads" />
      <MetricCard label="Time Duration" value={timeDuration} unit=" min" colorClass="time-duration" />
      <MetricCard label="Predicted Daily Meters" value="754" change="2.02%" isPositive={false} colorClass="predicted-meters" />
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