'use client';

import React from 'react';
import styles from './PageHome.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  onlinePercentage?: string;
  isOnline?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, onlinePercentage, isOnline, className }) => {
  return (
    <div className={`${styles.metricCard} ${className || ''}`}>
      <div className={styles.metricHeader}>
        <div className={styles.metricTitle}>{title}</div>
        {onlinePercentage && (
          <div className={`${styles.onlineStatus} ${isOnline ? styles.online : styles.offline}`}>
            {onlinePercentage}
          </div>
        )}
      </div>
      <div className={styles.metricValue}>{value}</div>
    </div>
  );
};

const KeyMetricsCards: React.FC = () => {
  return (
    <div className={styles.metricsCardsGrid}>
      <MetricCard 
        title="Total meters" 
        value="1000" 
        className={styles.totalMeters}
      />
      
      <MetricCard 
        title="Single-phase" 
        value="840" 
        onlinePercentage="98%" 
        isOnline={true}
        className={styles.singlePhase}
      />
      
      <MetricCard 
        title="Three-phase" 
        value="160" 
        onlinePercentage="76%" 
        isOnline={true}
        className={styles.threePhase}
      />
      
      <MetricCard 
        title="DCU" 
        value="5" 
        onlinePercentage="93%" 
        isOnline={true}
        className={styles.dcu}
      />
      
      <MetricCard 
        title="Repeaters" 
        value="12" 
        onlinePercentage="98%" 
        isOnline={true}
        className={styles.repeaters}
      />
    </div>
  );
};

export default KeyMetricsCards; 