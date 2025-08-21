'use client';

import React from 'react';
import { Select, Button } from 'antd';
import KeyMetricsCards from './KeyMetricsCards';
import CommunicationTypeChart from './charts/CommunicationTypeChart';
import OEMsChart from './charts/OEMsChart';
import DeviceHealthChart from './charts/DeviceHealthChart';
import RecommendationsWidget from './widgets/RecommendationsWidget';
import styles from './PageHome.module.css';

const { Option } = Select;

const AssetDashboard: React.FC = () => {
  const handleExport = () => {
    // Export functionality
    console.log('Exporting data...');
  };

  const handleFilter = () => {
    // Filter functionality
    console.log('Applying filters...');
  };

  const handleReset = () => {
    // Reset filters functionality
    console.log('Resetting filters...');
  };

  return (
    <div className={styles.assetDashboard}>



      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.dropdownsGroup}>
          <Select placeholder="Manufacturer" style={{ width: 175 }}>
            <Option value="all">All Manufacturers</Option>
            <Option value="adya">Adya Smart Metering</Option>
            <Option value="adani">Adani</Option>
            <Option value="schneider">Schneider</Option>
            <Option value="eastron">Eastron</Option>
          </Select>
          
          <Select placeholder="Model" style={{ width: 175 }}>
            <Option value="all">All Models</Option>
            <Option value="model1">Model 1</Option>
            <Option value="model2">Model 2</Option>
          </Select>
          
          <Select placeholder="Type" style={{ width: 175 }}>
            <Option value="all">All Types</Option>
            <Option value="single">Single-phase</Option>
            <Option value="three">Three-phase</Option>
            <Option value="dcu">DCU</Option>
            <Option value="repeater">Repeater</Option>
          </Select>
          
          <Select placeholder="Connectivity" style={{ width: 175}}>
            <Option value="all">All Connectivity</Option>
            <Option value="rf">RF</Option>
            <Option value="cellular">Cellular</Option>
            <Option value="nbiot">NBIoT</Option>
          </Select>
          <Button className={styles.filterBtn} type="primary" onClick={handleFilter}>Filter</Button>
          <Button className={styles.resetBtn} onClick={handleReset}>Reset</Button>
        </div>
        
        <div className={styles.buttonsGroup}>
          <Button className={styles.exportBtn} onClick={handleExport}>Export</Button>
        </div>
      </div>


      {/* Key Metrics Cards */}
      <KeyMetricsCards />

      {/* Charts and Widgets Grid */}
      <div className={styles.dashboardGrid}>
        <div className={styles.chartRow}>
          <CommunicationTypeChart />
          <OEMsChart />
        </div>
        
        <div className={styles.chartRow}>
          <DeviceHealthChart />
          <RecommendationsWidget />
        </div>
      </div>
    </div>
  );
};

export default AssetDashboard; 