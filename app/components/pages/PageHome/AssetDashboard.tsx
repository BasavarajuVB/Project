'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Select, Button } from 'antd';
import KeyMetricsCards from './KeyMetricsCards';
import CommunicationTypeChart from './charts/CommunicationTypeChart';
import OEMsChart from './charts/OEMsChart';
import DeviceHealthChart from './charts/DeviceHealthChart';
import RecommendationsWidget from './widgets/RecommendationsWidget';
import styles from './PageHome.module.css';

const { Option } = Select;

interface AssetDashboardProps {
  copilotOpen?: boolean;
}

interface FilterState {
  manufacturer: string;
  model: string;
  type: string;
  connectivity: string;
}

interface FilteredData {
  totalMeters: number;
  singlePhase: number;
  threePhase: number;
  dcu: number;
  repeaters: number;
  communicationTypes: Array<{ name: string; value: number; color: string }>;
  oems: Array<{ name: string; total: number; segment1: number; segment2?: number }>;
}

const AssetDashboard: React.FC<AssetDashboardProps> = ({ copilotOpen = false }) => {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    manufacturer: 'all',
    model: 'all',
    type: 'all',
    connectivity: 'all'
  });

  // API State Variables (commented out for static data usage)
  // const [meterTypes, setMeterTypes] = useState<string[]>([]);
  // const [manufacturers, setManufacturers] = useState<Array<{manufacturerId: number, manufacturerName: string}>>([]);
  // const [meterModels, setMeterModels] = useState<string[]>([]);
  // const [nicTypes, setNicTypes] = useState<Array<{nicType: string}>>([]);
  // const [totalAssets, setTotalAssets] = useState<string>('—');
  // const [assetHealth, setAssetHealth] = useState<string>('—');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // Static Data for Display
  const meterTypes = ["Single Phase", "Three Phase"];
  const manufacturers = [
    { manufacturerId: 1, manufacturerName: "Adya Smart Metering" },
    { manufacturerId: 2, manufacturerName: "HPL Meters" },
    { manufacturerId: 3, manufacturerName: "Genus Meters" },
   // { manufacturerId: 4, manufacturerName: "Secure Meters" }
  ];
  const meterModels = ["ASM231", "ASM211", "HPL1P", "HPL3P", "GNS1P", "GNS3P", "SCR1P", "SCR3P"];
  const nicTypes = [{ nicType: "GSM" }, { nicType: "RF" }];
  const totalAssets = "15,847";
  const assetHealth = "94.2";
  const loading = false;
  const error = null;

  // Filter change handlers
  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Calculate filtered data for charts only using useMemo to prevent unnecessary recalculations
  const filteredData: FilteredData = useMemo(() => {
    // Base static data for charts only
    const baseData = {
      communicationTypes: [
        { name: 'RF', value: 27, color: '#FF6B35' },
        { name: 'Cellular', value: 73, color: '#1890ff' }
      ],
      oems: [
        { name: 'Adya', total: 610, segment1: 520, segment2: 90 },
        { name: 'Genus', total: 250, segment1: 180, segment2: 70 },
        { name: 'HPL', total: 140, segment1: 140 }
      ]
    };

    // Calculate filtered communication types
    const filteredCommunicationTypes = baseData.communicationTypes.map(type => {
      if (filters.connectivity === 'all') {
        return type;
      } else if (filters.connectivity === 'rf' && type.name === 'RF') {
        return { ...type, value: 100 };
      } else if (filters.connectivity === 'gsm' && type.name === 'Cellular') {
        return { ...type, value: 100 };
      } else {
        return { ...type, value: 0 };
      }
    });

    // Calculate filtered OEMs
    let filteredOEMs = baseData.oems;
    
    // Apply manufacturer filter - filter out non-matching manufacturers
    if (filters.manufacturer !== 'all') {
      filteredOEMs = baseData.oems.filter(oem => {
        if (filters.manufacturer === 'adya-smart-metering') return oem.name === 'Adya';
        if (filters.manufacturer === 'hpl-meters') return oem.name === 'HPL';
        if (filters.manufacturer === 'genus-meters') return oem.name === 'Genus';
        if (filters.manufacturer === 'secure-meters') return oem.name === 'Secure Meters';
        return false;
      });
    }
    
    // Apply type filter (segment1 = Single Phase, segment2 = Three Phase)
    filteredOEMs = filteredOEMs.map(oem => {
      let filteredOem = { ...oem };
      
      if (filters.type !== 'all') {
        if (filters.type === 'single-phase') {
          // Show only Single Phase (segment1)
          filteredOem.total = filteredOem.segment1;
          filteredOem.segment2 = 0;
        } else if (filters.type === 'three-phase') {
          // Show only Three Phase (segment2)
          filteredOem.total = filteredOem.segment2 || 0;
          filteredOem.segment1 = 0;
        }
      }
      
      return filteredOem;
    });

    return {
      totalMeters: 1000, // Keep original values for Key Metrics Cards
      singlePhase: 840,
      threePhase: 160,
      dcu: 5,
      repeaters: 12,
      communicationTypes: filteredCommunicationTypes,
      oems: filteredOEMs
    };
  }, [filters]); // Only recalculate when filters change

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchMeterTypes = async () => {
  //     try {
  //       const res = await fetch('/api/ad/metertypes', { cache: 'no-store' });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data: string[] = await res.json();
  //       if (!isMounted) return;
  //       setMeterTypes(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
  //     } catch (e) {
  //       if (!isMounted) return;
  //       console.error('Failed to fetch meter types', e);
  //       setError('Failed to fetch meter types');
  //     } finally {
  //       if (!isMounted) return;
  //       setLoading(false);
  //     }
  //   };

  //   fetchMeterTypes();
  //   const intervalId = setInterval(fetchMeterTypes, 10000);
  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchManufacturers = async () => {
  //     try {
  //       const res = await fetch('/api/ad/manufacturernames', { cache: 'no-store' });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data: Array<{manufacturerId: number, manufacturerName: string}> = await res.json();
  //       if (!isMounted) return;
  //       setMeterTypes(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
  //     } catch (e) {
  //       if (!isMounted) return;
  //       console.error('Failed to fetch manufacturers', e);
  //       setError('Failed to fetch manufacturers');
  //     }
  //   };

  //   fetchManufacturers();
  //   const intervalId = setInterval(fetchManufacturers, 10000);
  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchMeterModels = async () => {
  //     try {
  //       const res = await fetch('/api/ad/metermodels', { cache: 'no-store' });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data: string[] = await res.json();
  //       if (!isMounted) return;
  //       setMeterModels(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
  //     } catch (e) {
  //       if (!isMounted) return;
  //       console.error('Failed to fetch meter models', e);
  //       setError('Failed to fetch meter models');
  //     }
  //   };

  //   fetchMeterModels();
  //   const intervalId = setInterval(fetchMeterModels, 10000);
  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchNicTypes = async () => {
  //     try {
  //       const res = await fetch('/api/ad/nictypenames', { cache: 'no-store' });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data: Array<{nicType: string}> = await res.json();
  //       if (!isMounted) return;
  //       setError('Failed to fetch NIC types');
  //     } catch (e) {
  //       if (!isMounted) return;
  //       console.error('Failed to fetch NIC types', e);
  //       setError('Failed to fetch NIC types');
  //     }
  //   };

  //   fetchNicTypes();
  //   const intervalId = setInterval(fetchNicTypes, 10000);
  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchTotalAssets = async () => {
  //     try {
  //       const res = await fetch('/api/ad/totalassets', { cache: 'no-store' });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const text = await res.text();
  //       const num = Number(text);
  //       const formatted = Number.isFinite(num) ? num.toLocaleString() : '—';
  //       if (!isMounted) return;
  //       setTotalAssets(prev => (prev === formatted ? prev : formatted));
  //     } catch (e) {
  //       if (!isMounted) return;
  //       console.error('Failed to fetch total assets', e);
  //       setTotalAssets('—');
  //     }
  //   };

  //   fetchTotalAssets();
  //   const intervalId = setInterval(fetchTotalAssets, 10000);
  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchAssetHealth = async () => {
  //     try {
  //       const res = await fetch('/api/ad/assethealth', { cache: 'no-store' });
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data = await res.json();
  //       const health = typeof data?.healthPercentage === 'number' ? data.healthPercentage : null;
  //       const healthToShow = health === null || !Number.isFinite(health) ? '—' : health.toFixed(2);
  //       if (!isMounted) return;
  //       setAssetHealth(prev => (prev === healthToShow ? prev : healthToShow));
  //     } catch (e) {
  //       if (!isMounted) return;
  //       console.error('Failed to fetch asset health', e);
  //       setAssetHealth('—');
  //     }
  //   };

  //   fetchAssetHealth();
  //   const intervalId = setInterval(fetchAssetHealth, 10000);
  //   return () => {
  //     isMounted = false;
  //     clearInterval(intervalId);
  //   };
  // }, []);


  const handleExport = () => {
    // Export functionality
    console.log('Exporting data...');
  };

  const handleFilter = () => {
    // Filter functionality is now handled by state changes
    console.log('Filters applied:', filters);
  };

  const handleReset = () => {
    // Reset filters functionality
    setFilters({
      manufacturer: 'all',
      model: 'all',
      type: 'all',
      connectivity: 'all'
    });
    console.log('Filters reset');
  };

  return (
    <div className={styles.assetDashboard}>



      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.dropdownsGroup}>
          <Select 
            placeholder="Manufacturer" 
            style={{ width: 175 }}
            value={filters.manufacturer}
            onChange={(value) => handleFilterChange('manufacturer', value)}
          >
            <Option value="all">All Manufacturers</Option>
            {manufacturers.map((manufacturer) => (
              <Option key={manufacturer.manufacturerId} value={manufacturer.manufacturerName.toLowerCase().replace(/\s+/g, '-')}>
                {manufacturer.manufacturerName}
              </Option>
            ))}
          </Select>
          
          <Select 
            placeholder="Model" 
            style={{ width: 175 }}
            value={filters.model}
            onChange={(value) => handleFilterChange('model', value)}
          >
            <Option value="all">All Models</Option>
            {meterModels.map((model, index) => (
              <Option key={index} value={model.toLowerCase()}>
                {model}
              </Option>
            ))}
          </Select>
          
          <Select 
            placeholder="Type" 
            style={{ width: 175 }}
            value={filters.type}
            onChange={(value) => handleFilterChange('type', value)}
          >
            <Option value="all">All Types</Option>
            {meterTypes.map((type, index) => (
              <Option key={index} value={type.toLowerCase().replace(/\s+/g, '-')}>
                {type.replace(/_/g, ' ')}
              </Option>
            ))}
          </Select>
          
          <Select 
            placeholder="Connectivity" 
            style={{ width: 175}}
            value={filters.connectivity}
            onChange={(value) => handleFilterChange('connectivity', value)}
          >
            <Option value="all">All Connectivity</Option>
            {nicTypes.map((nic, index) => (
              <Option key={index} value={nic.nicType.toLowerCase()}>
                {nic.nicType}
              </Option>
            ))}
          </Select>
          <Button className={styles.filterBtn} type="primary" onClick={handleFilter}>Filter</Button>
          <Button className={styles.resetBtn} onClick={handleReset}>Reset</Button>
        </div>
        
        <div className={styles.buttonsGroup}>
          <Button className={styles.exportBtn} onClick={handleExport}>Export</Button>
        </div>
      </div>

      {/* API Data Display (for testing) - Commented out */}
      {/* <div className={styles.apiDataDisplay}>
        <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Total Assets:</span>
          <span className={styles.apiDataValue}>{totalAssets}</span>
        </div>
        <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Asset Health:</span>
          <span className={styles.apiDataValue}>{assetHealth}%</span>
        </div>
        <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Meter Types:</span>
          <span className={styles.apiDataValue}>{meterTypes.length} types</span>
        </div>
        <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Manufacturers:</span>
          <span className={styles.apiDataValue}>{manufacturers.length} companies</span>
        </div>
        <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Meter Models:</span>
          <span className={styles.apiDataValue}>{meterModels.length} models</span>
        </div>
        <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Connectivity Types:</span>
          <span className={styles.apiDataValue}>{nicTypes.length} types</span>
        </div>
      </div> */}


      {/* Key Metrics Cards */}
      <KeyMetricsCards />

      {/* Charts and Widgets Grid */}
      <div className={styles.dashboardGrid}>
        <div className={styles.chartRow}>
          <CommunicationTypeChart data={filteredData.communicationTypes} />
          <OEMsChart data={filteredData.oems} />
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