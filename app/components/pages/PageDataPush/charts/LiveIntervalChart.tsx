'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

interface IntervalApiItem {
  successPercentage: number;
  intervalStart: string;
  meterCount?: number;
  expectedMetersCount?: number;
}

interface IntervalPoint {
  time: string;
  success: number;
  failure: number;
}

const LiveIntervalChart: React.FC = () => {
  const [data, setData] = useState<IntervalPoint[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await fetch('/api/dp/meterscount/success/byintervals', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body: IntervalApiItem[] = await res.json();
        const firstEight = (Array.isArray(body) ? body : []).slice(0, 8);
        const processed: IntervalPoint[] = firstEight.map((item) => {
          const success = Math.max(0, Math.min(100, Number(item.successPercentage) || 0));
          const failure = Math.max(0, Math.min(100, 100 - success));
          const d = new Date(item.intervalStart);
          const time = isNaN(d.getTime())
            ? item.intervalStart
            : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return { time, success, failure };
        });
        if (isMounted) setData(processed);
      } catch (err) {
        console.error('Failed to fetch live interval data', err);
      } finally {
        if (isMounted) setIsFetching(false);
      }
    };
    fetchData();
    const id = setInterval(fetchData, 10000);
    return () => {
      isMounted = false;
      clearInterval(id);
    };
  }, []);

  if (isFetching && data.length === 0) {
    return (
      <div className="chart-card" style={{height: '400px'}}>
        <div className="chart-header">
          <div className="chart-title">Live Interval Read Success Rate</div>
          <ExpandOutlined className="expand-icon" />
        </div>
        Loading...
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">Live Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>

      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
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
// Static demo preserved for reference
// const staticData = [
//   { label: '08:00', success: 85, failure: 15 },
// ];
*/