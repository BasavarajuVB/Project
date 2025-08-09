'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

const data = [
  {
    date: 'Mar 27',
    success: 90,
    failure: 10,
  },
  {
    date: 'Mar 28',
    success: 80,
    failure: 20,
  },
  {
    date: 'Mar 29',
    success: 85,
    failure: 15,
  },
  {
    date: 'Mar 30',
    success: 60,
    failure: 40,
  },
  {
    date: 'Mar 31',
    success: 75,
    failure: 25,
  },
  {
    date: 'Apr 1',
    success: 95,
    failure: 5,
  },
  {
    date: 'Apr 2',
    success: 93,
    failure: 7,
  },
];

const MonthlySuccessChart: React.FC = () => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">Monthly Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8fa8c2', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8fa8c2', fontSize: 12 }}
            domain={[85, 100]}
          />
          <Legend 
            wrapperStyle={{ 
              color: '#8fa8c2', 
              fontSize: '12px',
              paddingTop: '10px'
            }}
          />
          <Bar 
            dataKey="success" 
            stackId="a" 
            fill="#66BB6A" 
            name="Success"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="failure" 
            stackId="a" 
            fill="#D63B46" 
            name="Failure"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySuccessChart;