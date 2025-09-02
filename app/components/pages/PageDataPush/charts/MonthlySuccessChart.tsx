'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { ExpandOutlined } from '@ant-design/icons';

interface ApiItem {
  percentageByManufacturer: number;
  manufacturerName: string;
  month: string; // e.g., "Sep 2025"
}

interface MonthlyPoint {
  date: string; // month label
  success: number; // 0-100
  failure: number; // 0-100
}

const MonthlySuccessChart: React.FC = () => {
  const [data, setData] = useState<MonthlyPoint[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const res = await fetch('/api/dp2/meterscount/success/bymanufacturer', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body: ApiItem[] = await res.json();

        // Group by month; for each month, average percentage across manufacturers (or sum?)
        // We'll compute average success per month to a percentage [0..100]
        const monthToValues: Record<string, number[]> = {};
        for (const item of Array.isArray(body) ? body : []) {
          const successPercent = Math.max(0, Math.min(100, (Number(item.percentageByManufacturer) || 0) * 100));
          if (!monthToValues[item.month]) monthToValues[item.month] = [];
          monthToValues[item.month].push(successPercent);
        }

        const monthOrder = Object.keys(monthToValues);
        const points: MonthlyPoint[] = monthOrder.map((m) => {
          const arr = monthToValues[m];
          const avgSuccess = arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
          const success = Math.round(avgSuccess);
          const failure = Math.max(0, 100 - success);
          return { date: m, success, failure };
        });

        if (isMounted) setData(points);
      } catch (err) {
        console.error('Failed to fetch monthly success by manufacturer', err);
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

  return (
    <div className="chart-card" style={{height: '400px'}}>
      <div className="chart-header">
        <div className="chart-title">Monthly Interval Read Success Rate</div>
        <ExpandOutlined className="expand-icon" />
      </div>
      {(() => {
        const barSize = 50; // fixed width per bar
        const minBars = 5; // if fewer than this, keep visual width for 5 bars
        const gap = 20; // px gap per category
        const barsCount = data.length;
        const widthPerBar = barSize + gap;
        const computedWidth = Math.max(minBars, barsCount || 0) * widthPerBar + 80; // include margins
        return (
          <div style={{ position: 'relative', overflowX: 'auto' }}>
            <div style={{ width: computedWidth }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barSize={barSize} barCategoryGap={gap}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[0, 100]} />
                  <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} isAnimationActive={true} animationDuration={350} animationEasing="ease-out" />
                  <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={350} animationEasing="ease-out" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default React.memo(MonthlySuccessChart);
