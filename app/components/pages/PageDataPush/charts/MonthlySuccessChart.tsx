'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

interface MonthlyPoint {
  date: string;
  success: number; // percentage
  failure: number; // percentage
}

const MonthlySuccessChart: React.FC = () => {
  const [data, setData] = useState<MonthlyPoint[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  
  const arraysClose = (a: MonthlyPoint[], b: MonthlyPoint[], delta = 0.5) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      const x = a[i];
      const y = b[i];
      if (x.date !== y.date) return false;
      if (Math.abs(x.success - y.success) > delta) return false;
      if (Math.abs(x.failure - y.failure) > delta) return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await fetch('/api/charts/monthly-success', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const apiData: Array<{ date: string; success: string | number; failure: number | string }> = await res.json();
        const processed: MonthlyPoint[] = apiData.map((item) => {
          const successRaw = typeof item.success === 'string' ? Number(item.success) : item.success;
          const failureRaw = typeof item.failure === 'string' ? Number(item.failure) : item.failure;
          const successClamped = Math.min(100, Math.max(0, successRaw));
          const failureClamped = Math.min(100, Math.max(0, failureRaw));
          const sum = successClamped + failureClamped;
          const failureAdjusted = sum > 100 ? Math.max(0, 100 - successClamped) : failureClamped;
          return {
            date: item.date,
            success: Math.round(successClamped),
            failure: Math.round(failureAdjusted),
          };
        });
        setData(prev => (arraysClose(prev, processed) ? prev : processed));
      } catch (e) {
        console.error('Failed to fetch monthly success data', e);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);
  

  if (isFetching && data.length === 0) {
    return (
      <div className="chart-card" style={{height: '400px'}}>
        <div className="chart-header">
          <div className="chart-title">Monthly Interval Read Success Rate</div>
          <ExpandOutlined className="expand-icon" />
        </div>
        Loading...
      </div>
    );
  }

  return (
    <div className="chart-card" style={{height: '400px'}}>
      <div className="chart-header">
        <div className="chart-title">Monthly Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>
      
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[0, 100]} />
            <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
            <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(MonthlySuccessChart);
