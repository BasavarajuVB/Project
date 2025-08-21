'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LabelList } from 'recharts';
import { ExpandOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../PageHome.module.css';

const CommunicationTypeChart: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const data = [
    { name: 'RF', value: 25, color: '#FF6B35' },
    { name: 'Cellular', value: 30, color: '#1890ff' },
    { name: 'NBIoT', value: 45, color: '#52c41a' },
  ];

  const COLORS = data.map(item => item.color);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    const chartElement = document.querySelector(`.${styles.communicationTypeChart}.${styles.expanded}`);
    
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
      className={`${styles.chartWidget} ${styles.communicationTypeChart} ${isExpanded ? styles.expanded : ''}`}
    >
      <div className={styles.chartHeader}>
        <h3>Communication Type</h3>
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
        <div className={styles.pieChartSection}>
          <ResponsiveContainer width={isExpanded ? 300 : 180} height={isExpanded ? 300 : 180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={isExpanded ? 60 : 50}
                outerRadius={isExpanded ? 120 : 80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
                {isExpanded && (
                  <LabelList
                    dataKey="value"
                    position="inside"
                    formatter={(value: number) => `${value}%`}
                    style={{
                      fill: '#fff',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                    }}
                  />
                )}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name]}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.legendSection}>
          {data.map((entry, index) => (
            <div key={index} className={styles.legendItem}>
              <div 
                className={styles.legendColor} 
                style={{ backgroundColor: entry.color }}
              />
              <span className={styles.legendText}>{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
      

    </div>
  );
};

export default CommunicationTypeChart; 