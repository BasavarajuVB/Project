'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

interface MonthlyPoint {
  date: string;
  success: number;
  failure: number;
}

// Static data for now; dynamic fetching code is commented below
const staticData: MonthlyPoint[] = [
  { date: 'Jan', success: 80, failure: 20 },
  { date: 'Feb', success: 75, failure: 25 },
  { date: 'Mar', success: 90, failure: 10 },
  { date: 'Apr', success: 85, failure: 15 },
  { date: 'May', success: 75, failure: 25 },
  { date: 'Jun', success: 65, failure: 35 },
  { date: 'Jul', success: 80, failure: 20 },
  { date: 'Aug', success: 75, failure: 25 },
  { date: 'Sep', success: 85, failure: 15 },
  { date: 'Oct', success: 75, failure: 25 },
  { date: 'Nov', success: 65, failure: 35 },
  { date: 'Dec', success: 80, failure: 20 },
];

const MonthlySuccessChart: React.FC = () => {
  return (
    <div className="chart-card" style={{height: '400px'}}>
      <div className="chart-header">
        <div className="chart-title">Monthly Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>
      
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={staticData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

/*
// Previous dynamic implementation (commented out for static mode)
// import React, { useEffect, useState } from 'react';
// useEffect(() => { fetch('/api/charts/monthly-success') ... })
*/
