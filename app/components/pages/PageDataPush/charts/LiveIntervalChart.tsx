// 'use client';
// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
// import { ExpandOutlined } from '@ant-design/icons';

// interface IntervalPoint {
//   time: string;
//   success: number;
//   failure: number;
// }

// const LiveIntervalChart: React.FC = () => {
//   const [data, setData] = useState<IntervalPoint[]>([]);
//   const [isFetching, setIsFetching] = useState(true);

//   const arraysClose = (a: IntervalPoint[], b: IntervalPoint[], delta = 0.5) => {
//     if (a.length !== b.length) return false;
//     for (let i = 0; i < a.length; i++) {
//       const x = a[i];
//       const y = b[i];
//       if (x.time !== y.time) return false;
//       if (Math.abs(x.success - y.success) > delta) return false;
//       if (Math.abs(x.failure - y.failure) > delta) return false;
//     }
//     return true;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsFetching(true);
//       try {
//         const res = await fetch('/api/charts/live-interval', { cache: 'no-store' });
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const apiData = await res.json();
//         const latestSeven = Array.isArray(apiData) ? apiData.slice(0, 7) : [];
//         const processed = latestSeven.map((item: any) => {
//           const successRaw = Number(item.success);
//           const failureRaw = Number(item.failure);
//           const successClamped = Math.min(100, Math.max(0, successRaw));
//           const failureClamped = Math.min(100, Math.max(0, failureRaw));
//           const sum = successClamped + failureClamped;
//           const failureAdjusted = sum > 100 ? Math.max(0, 100 - successClamped) : failureClamped;
//           return {
//             time: item.time,
//             success: Math.round(successClamped),
//             failure: Math.round(failureAdjusted),
//           } as IntervalPoint;
//         });
//         setData(prev => (arraysClose(prev, processed) ? prev : processed));
//       } catch (err) {
//         console.error('Failed to fetch live interval data', err);
//       } finally {
//         setIsFetching(false);
//       }
//     };
//     fetchData();
//   }, []);



//   if (isFetching && data.length === 0) {
//     return (
//       <div className="chart-card" style={{height: '400px'}}>
//         <div className="chart-header">
//           <div className="chart-title">Live Interval Read Success Rate</div>
//           <ExpandOutlined className="expand-icon" />
//         </div>
//         Loading...
//       </div>
//     );
//   }


//   return (
//     <div className="chart-card">
//       <div className="chart-header">
//         <div className="chart-title">Live Interval Read Success Rate</div>
//         <ExpandOutlined className="expand-icon" />
//       </div>
      
//       <div style={{ position: 'relative' }}>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//             <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
//             <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[0, 100]} />
//             <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
//             <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} isAnimationActive={false} />
//             <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} isAnimationActive={false} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default React.memo(LiveIntervalChart);
'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

interface IntervalPoint {
  label: string;
  success: number;
  failure: number;
}

// Static data for now; dynamic fetching code is commented below
const staticData: IntervalPoint[] = [
  { label: '08:00', success: 85, failure: 15 },
  { label: '09:00', success: 91, failure: 9 },
  { label: '10:00', success: 75, failure: 25 },
  { label: '11:00', success: 80, failure: 20 },
  { label: '12:00', success: 85, failure: 15 },
  { label: '13:00', success: 68, failure: 32 },
  { label: '14:00', success: 95, failure: 5 },
];

const LiveIntervalChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">Live Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>

      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={staticData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[0, 100]} />
            <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} isAnimationActive={true} animationDuration={350} animationEasing="ease-out" />
            <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={350} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(LiveIntervalChart);

/*
// Previous dynamic implementation (commented out for static mode)
import React, { useEffect, useState } from 'react';
interface IntervalApiItem {
  successPercentage: number;
  intervalStart: string;
  meterCount?: number;
  expectedMetersCount?: number;
}
// ... dynamic fetching and state update logic
*/