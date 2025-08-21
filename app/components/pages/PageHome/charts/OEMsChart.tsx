'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList, CartesianGrid } from 'recharts';
import { ExpandOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../PageHome.module.css';

const OEMsChart: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    { 
      name: 'Adya Smart Metering', 
      total: 12345,
      segment1: 8000,
      segment2: 4345
    },
    { 
      name: 'Adani', 
      total: 6511,
      segment1: 4000,
      segment2: 2000,
      segment3: 511
    },
    { 
      name: 'Polaris', 
      total: 8214,
      segment1: 5000,
      segment2: 2500,
      segment3: 714
    },
    { 
      name: 'Schneider', 
      total: 10411,
      segment1: 6000,
      segment2: 3000,
      segment3: 1411
    },
    { 
      name: 'Eastron', 
      total: 10217,
      segment1: 6000,
      segment2: 3000,
      segment3: 1217
    },
  ];

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    const chartElement = document.querySelector(`.${styles.oemsChart}.${styles.expanded}`);
    
    if (isExpanded && chartElement && !chartElement.contains(target)) {
      setIsExpanded(false);
    }
  }, [isExpanded]);

  React.useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isExpanded, handleClickOutside]);

  return (
    <div 
      className={`${styles.chartWidget} ${styles.oemsChart} ${isExpanded ? styles.expanded : ''}`}
    >
      <div className={styles.chartHeader}>
        <h3>OEMs</h3>
        {isExpanded ? (
          <CloseOutlined 
            className={styles.closeIcon} 
            onClick={(e) => {
              e.stopPropagation();
              handleExpand();
            }}
          />
        ) : (
          <ExpandOutlined 
            className={styles.expandIcon} 
            onClick={(e) => {
              e.stopPropagation();
              handleExpand();
            }}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      
      <div className={styles.chartContainer}>
        {isClient && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 15, right: 15, left: 25, bottom: 30 }}>
              <YAxis 
                stroke="#ffffff"
                fontSize={12}
                tick={{ fill: '#ffffff', fontWeight: 600, fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                domain={[0, 20000]}
                ticks={[0, 7000, 13000, 20000]}
                axisLine={{ stroke: '#ffffff', strokeWidth: 1 }}
                tickLine={{ stroke: '#ffffff', strokeWidth: 1 }}
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255, 255, 255, 0.2)" 
                vertical={false}
              />
              <XAxis 
                dataKey="name" 
                stroke="#ffffff"
                fontSize={13}
                tick={{ fill: '#ffffff', fontWeight: 700, fontSize: 13, color: '#ffffff' }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'segment1') return [value.toLocaleString(), 'Segment 1'];
                  if (name === 'segment2') return [value.toLocaleString(), 'Segment 2'];
                  if (name === 'segment3') return [value.toLocaleString(), 'Segment 3'];
                  return [value.toLocaleString(), 'Total'];
                }}
                labelStyle={{ color: '#fff', fontWeight: 700 }}
                contentStyle={{ 
                  backgroundColor: '#1e3a5f', 
                  border: '2px solid #0E80DD',
                  borderRadius: '8px',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                itemStyle={{ 
                  color: '#fff',
                  fontWeight: 600
                }}
              />
              {/* Stacked bars with exact colors from image */}
              <Bar 
                dataKey="segment1" 
                stackId="a"
                fill="#0F4378" 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="segment2" 
                stackId="a"
                fill="#0E80DD" 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="segment3" 
                stackId="a"
                fill="#02D9FF" 
                radius={[0, 0, 0, 0]}
              />
              {/* Total values above bars */}
              <Bar 
                dataKey="total" 
                stackId="a"
                fill="transparent"
                radius={[0, 0, 0, 0]}
              >
                <LabelList 
                  dataKey="total" 
                  position="center" 
                  offset={2}
                  formatter={(value: number) => value.toLocaleString()}
                  style={{ 
                    fill: '#ffffff', 
                    fontSize: 14, 
                    fontWeight: 700, 
                    color: '#ffffff',
                    textShadow: '0 0 2px rgba(255, 255, 255, 0.8)'
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default OEMsChart; 