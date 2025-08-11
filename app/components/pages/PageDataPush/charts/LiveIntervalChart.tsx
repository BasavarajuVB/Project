'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

const data = [
  { time: '12:18:00', success: 90, failure: 10 },
  { time: '12:17:00', success: 80, failure: 20 },
  { time: '12:16:00', success: 85, failure: 15 },
  { time: '12:15:00', success: 75, failure: 25 },
  { time: '12:14:00', success: 80, failure: 20 },
  { time: '12:13:00', success: 87, failure: 13 },
  { time: '12:12:00', success: 90, failure: 10 },
];

const LiveIntervalChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">Live Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[90, 100]} />
          <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
          <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} />
          <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveIntervalChart;


