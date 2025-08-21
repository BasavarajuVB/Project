'use client';

import React from 'react';
import { Badge, Button } from 'antd';
import { BellOutlined, RobotOutlined } from '@ant-design/icons';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onOpenCopilot: () => void;
  copilotOpen?: boolean;
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onOpenCopilot, copilotOpen, pageTitle }) => {
  const currentTime = new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className={`header ${sidebarCollapsed ? 'collapsed-sidebar' : ''} ${copilotOpen ? 'copilot-open' : ''}`}>
      <div className="header-left">
        <div className="breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item">SLA Dashboards</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{pageTitle || 'Dashboard'}</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="status-section">
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span className="live-text">Live</span>
          </div>
          <div className="time-section">
            <span className="latest-interval">Latest Interval:</span>
            <span className="timestamp">{currentTime}</span>
          </div>
        </div>
      </div>
      
      <div className="header-right">
        <div className="header-actions">
          <Badge count={1} size="small">
            <Button type="text" icon={<BellOutlined />} className="notification-btn" />
          </Badge>
          
          <Button type="primary" icon={<RobotOutlined />} className="ai-assistant-btn" onClick={onOpenCopilot}>
            AI Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;


