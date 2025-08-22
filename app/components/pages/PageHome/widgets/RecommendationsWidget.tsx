'use client';

import React from 'react';
import { Button } from 'antd';
import { ExpandOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../PageHome.module.css';

interface RecommendationProps {
  message: string;
  actionText: string;
  actionType: 'service' | 'info';
  onAction: () => void;
}

const Recommendation: React.FC<RecommendationProps> = ({ message, actionText, actionType, onAction }) => {
  return (
    <div className={styles.recommendationItem}>
      <p className={styles.recommendationMessage}>{message}</p>
      <Button 
        type={actionType === 'service' ? 'primary' : 'default'}
        size="small"
        onClick={onAction}
        className={`${styles.recommendationBtn} ${actionType === 'service' ? styles.serviceBtn : styles.infoBtn}`}
      >
        {actionText}
      </Button>
    </div>
  );
};

const RecommendationsWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const handleRequestService = () => {
    console.log('Requesting service...');
  };

  const handleMoreInfo = () => {
    console.log('Showing more information...');
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (isExpanded && widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
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
      ref={widgetRef}
      className={`${styles.chartWidget} ${styles.recommendationsWidget} ${isExpanded ? styles.expanded : ''}`}
    >
      <div className={styles.chartHeader}>
        <h3>Recommendations</h3>
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
      
      <div className={styles.recommendationsContent}>
        <Recommendation
          message="20 meters from OEM: HPL in Zone 3 have shown signal strength below threshold and >30% push failure over the last 7 days. Field inspection is advised to prevent outage"
          actionText="Request Service"
          actionType="service"
          onAction={handleRequestService}
        />
        
        <Recommendation
          message="Repeater RPT-023 is consistently serving >90% of its capacity. Suggest rebalancing load or deploying an additional repeater nearby"
          actionText="More info"
          actionType="info"
          onAction={handleMoreInfo}
        />
        
        <Recommendation
          message="315 meters are still running firmware v1.8.2, which has known data push issues. Upgrade to v2.1.0 recommended. Most of these are in Subsection 28"
          actionText="More info"
          actionType="info"
          onAction={handleMoreInfo}
        />
      </div>
    </div>
  );
};

export default RecommendationsWidget; 