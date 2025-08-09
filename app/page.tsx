'use client';

import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
  BarChartOutlined,
  FileTextOutlined,
  TeamOutlined,
  ApiOutlined,
  ExpandOutlined,
  ExportOutlined,
  MenuOutlined
} from '@ant-design/icons';
import MetricsCards from './components/MetricsCards';
import LiveIntervalChart from './components/LiveIntervalChart';
import MonthlySuccessChart from './components/MonthlySuccessChart';
import PerformanceByOEM from './components/PerformanceByOEM';
import QualityMetrics from './components/QualityMetrics';
import AdditionalWidgets from './components/AdditionalWidgets';
import FailedCapturesWidget from './components/FailedCapturesWidget';
import Header from './components/Header';
import CopilotWidget from './components/CopilotWidget';
import DataPullDashboard from './components/DataPullDashboard';
import './globals.css';

const { Sider, Content } = Layout;

const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Home</span>
      </div>
    ),
  },
  {
    key: 'meter-list',
    icon: <AppstoreOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Meter List</span>
      </div>
    ),
  },
  {
    key: 'data-push',
    icon: <CloudDownloadOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Data Push</span>
      </div>
    ),
  },
  {
    key: 'data-pull',
    icon: <CloudUploadOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Data Pull</span>
      </div>
    ),
  },
  {
    key: 'commands',
    icon: <BarChartOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Commands</span>
        <div className="notification-badge">1</div>
      </div>
    ),
  },
  {
    key: 'reports',
    icon: <FileTextOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Reports</span>
      </div>
    ),
  },
  {
    key: 'admin',
    icon: <TeamOutlined />,
    label: (
      <div className="menu-item-content">
        <span>Admin</span>
      </div>
    ),
  },
  {
    key: 'api',
    icon: <ApiOutlined />,
    label: (
      <div className="menu-item-content">
        <span>API</span>
      </div>
    ),
  },
];

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [copilotOpen, setCopilotOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('data-push');

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ensure the sidebar auto-collapses on mobile widths
  React.useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMobileOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleOpenCopilot = () => {
    setCopilotOpen(true);
  };

  const handleCloseCopilot = () => {
    setCopilotOpen(false);
  };

  // Export helpers for CSV/Excel using static data on screen
  const exportDataPush = (format: 'csv' | 'xlsx') => {
    const rows = [
      ['Metric', 'Value'],
      ['Total meters', '25,35,567'],
      ['Interval Read Success Rate', '96.06%'],
      ['Failed Reads', '3.94%'],
      ['Time Duration', '1.5 min'],
      ['Predicted Daily Meters', '754'],
    ];
    downloadTable(rows, `data-push.${format}`);
  };

  const exportDataPull = (format: 'csv' | 'xlsx') => {
    const rows = [
      ['Date', 'Command', 'RequestType', 'Meters', 'Progress', 'Issued', 'Executed', 'Performance', 'Status'],
      ['23 July 2025', 'Billing Data', 'B', '5,698,321', '100%', '11:15am', '12:30 pm', '1:15 hours', ''],
      ['23 July 2025', 'Billing Data', 'M', '100', '75%', '11:15am', '-', '1:15 hours', 'VV'],
    ];
    downloadTable(rows, `data-pull.${format}`);
  };

  const downloadTable = (rows: (string | number)[][], fileName: string) => {
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName.split('.')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleMenuClick = (e: any) => {
    setCurrentPage(e.key);
  };

  return (
    <Layout className="dashboard-layout">
      {/* Mobile overlay removed per requirement */}
      
      <Sider 
        width={200} 
        className={`sidebar ${sidebarCollapsed ? 'custom-collapsed' : 'custom-expanded'}`}
        collapsed={isMobile ? true : sidebarCollapsed}
        collapsedWidth={60}
        trigger={null}
        collapsible={false}
      >
        <div className="logo-section">
          {!sidebarCollapsed && <div className="logo">HES</div>}
          <MenuOutlined className="hamburger-menu" onClick={toggleSidebar} />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['data-push']}
          selectedKeys={[currentPage]}
          items={menuItems}
          inlineCollapsed={sidebarCollapsed}
          onClick={handleMenuClick}
        />
      </Sider>
      
      <Header 
        sidebarCollapsed={!isMobile && sidebarCollapsed} 
        onOpenCopilot={handleOpenCopilot} 
      />
      
      <Layout>
        <Content className={`main-content ${!isMobile && sidebarCollapsed ? 'collapsed-sidebar' : ''}`}>
          {currentPage === 'data-push' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
                <button className="export-btn" onClick={() => exportDataPush('csv')}>Export</button>
              </div>
              {/* Metrics Cards */}
              <MetricsCards />

              {/* Charts Row */}
              <div className="charts-grid">
                <LiveIntervalChart />
                <MonthlySuccessChart />
              </div>

              {/* Two-column stacks to avoid large vertical gap under OEM */}
              <div className="two-col-stacks">
                <div className="col-stack">
                  <PerformanceByOEM />
                  <div className="cards-grid cards-left">
                    <AdditionalWidgets title="Tampers" value="39" change="0%" isPositive={false} />
                    <AdditionalWidgets title="Outages" value="12" change="6%" isPositive={false} />
                    <AdditionalWidgets title="Power Quality Deviations" value="15" change="5%" isPositive={true} />
                  </div>
                </div>
                <div className="col-stack">
                  <div className="cards-grid cards-right">
                    <QualityMetrics title="Consistency" value="99.5%" change="1.9%" subValue="9.96.006" isPositive={false} />
                    <QualityMetrics title="Quality" value="98%" change="5%" subValue="8.75.634" isPositive={false} />
                    <QualityMetrics title="Security" value="99.5%" change="3%" subValue="21" isPositive={true} />
                  </div>
                  <FailedCapturesWidget />
                </div>
              </div>
              
            </>
          )}

          {currentPage === 'data-pull' && (
            <DataPullDashboard />
          )}
        </Content>
      </Layout>
      
      <CopilotWidget 
        isOpen={copilotOpen} 
        onClose={handleCloseCopilot} 
      />
    </Layout>
  );
}