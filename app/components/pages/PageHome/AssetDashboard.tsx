'use client';

import React,{useEffect,useState} from 'react';
import { Select, Button } from 'antd';
import KeyMetricsCards from './KeyMetricsCards';
import CommunicationTypeChart from './charts/CommunicationTypeChart';
import OEMsChart from './charts/OEMsChart';
import DeviceHealthChart from './charts/DeviceHealthChart';
import RecommendationsWidget from './widgets/RecommendationsWidget';
import styles from './PageHome.module.css';

const { Option } = Select;

const AssetDashboard: React.FC = () => {

const [meterTypes, setMeterTypes] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<Array<{manufacturerId: number, manufacturerName: string}>>([]);
  const [meterModels, setMeterModels] = useState<string[]>([]);
  const [nicTypes, setNicTypes] = useState<Array<{nicType: string}>>([]);
  const [totalAssets, setTotalAssets] = useState<string>('—');
  const [assetHealth, setAssetHealth] = useState<string>('—');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMeterTypes = async () => {
      try {
        const res = await fetch('/api/ad/metertypes', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: string[] = await res.json();
        if (!isMounted) return;
        setMeterTypes(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch meter types', e);
        setError('Failed to fetch meter types');
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    fetchMeterTypes();
    const intervalId = setInterval(fetchMeterTypes, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchManufacturers = async () => {
      try {
        const res = await fetch('/api/ad/manufacturernames', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Array<{manufacturerId: number, manufacturerName: string}> = await res.json();
        if (!isMounted) return;
        setManufacturers(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch manufacturers', e);
        setError('Failed to fetch manufacturers');
      }
    };

    fetchManufacturers();
    const intervalId = setInterval(fetchManufacturers, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchMeterModels = async () => {
      try {
        const res = await fetch('/api/ad/metermodels', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: string[] = await res.json();
        if (!isMounted) return;
        setMeterModels(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch meter models', e);
        setError('Failed to fetch meter models');
      }
    };

    fetchMeterModels();
    const intervalId = setInterval(fetchMeterModels, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchNicTypes = async () => {
      try {
        const res = await fetch('/api/ad/nictypenames', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Array<{nicType: string}> = await res.json();
        if (!isMounted) return;
        setNicTypes(prev => (JSON.stringify(prev) === JSON.stringify(data) ? prev : data));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch NIC types', e);
        setError('Failed to fetch NIC types');
      }
    };

    fetchNicTypes();
    const intervalId = setInterval(fetchNicTypes, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchTotalAssets = async () => {
      try {
        const res = await fetch('/api/ad/totalassets', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const num = Number(text);
        const formatted = Number.isFinite(num) ? num.toLocaleString() : '—';
        if (!isMounted) return;
        setTotalAssets(prev => (prev === formatted ? prev : formatted));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch total assets', e);
        setTotalAssets('—');
      }
    };

    fetchTotalAssets();
    const intervalId = setInterval(fetchTotalAssets, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchAssetHealth = async () => {
      try {
        const res = await fetch('/api/ad/assethealth', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const health = typeof data?.healthPercentage === 'number' ? data.healthPercentage : null;
        const healthToShow = health === null || !Number.isFinite(health) ? '—' : health.toFixed(2);
        if (!isMounted) return;
        setAssetHealth(prev => (prev === healthToShow ? prev : healthToShow));
      } catch (e) {
        if (!isMounted) return;
        console.error('Failed to fetch asset health', e);
        setAssetHealth('—');
      }
    };

    fetchAssetHealth();
    const intervalId = setInterval(fetchAssetHealth, 10000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);


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
            {loading ? (
              <Option value="loading" disabled>Loading...</Option>
            ) : error ? (
              <Option value="error" disabled>{`Error: ${error}`}</Option>
            ) : (
              manufacturers.map((manufacturer) => (
                <Option key={manufacturer.manufacturerId} value={manufacturer.manufacturerName.toLowerCase().replace(/\s+/g, '-')}>
                  {manufacturer.manufacturerName}
                </Option>
              ))
            )}
          </Select>
          
          <Select placeholder="Model" style={{ width: 175 }}>
            <Option value="all">All Models</Option>
            {loading ? (
              <Option value="loading" disabled>Loading...</Option>
            ) : error ? (
              <Option value="error" disabled>{`Error: ${error}`}</Option>
            ) : (
              meterModels.map((model, index) => (
                <Option key={index} value={model.toLowerCase()}>
                  {model}
                </Option>
              ))
            )}
          </Select>
          
          <Select placeholder="Type" style={{ width: 175 }}>
            <Option value="all">All Types</Option>
            {loading ? (
              <Option value="loading" disabled>Loading...</Option>
            ) : error ? (
              <Option value="error" disabled>{`Error: ${error}`}</Option>
            ) : (
              meterTypes.map((type, index) => (
                <Option key={index} value={type.toLowerCase().replace(/_/g, '-')}>
                  {type.replace(/_/g, ' ')}
                </Option>
              ))
            )}
          </Select>
          
          <Select placeholder="Connectivity" style={{ width: 175}}>
            <Option value="all">All Connectivity</Option>
            {loading ? (
              <Option value="loading" disabled>Loading...</Option>
            ) : error ? (
              <Option value="error" disabled>{`Error: ${error}`}</Option>
            ) : (
              nicTypes.map((nic, index) => (
                <Option key={index} value={nic.nicType.toLowerCase()}>
                  {nic.nicType}
                </Option>
              ))
            )}
          </Select>
          <Button className={styles.filterBtn} type="primary" onClick={handleFilter}>Filter</Button>
          <Button className={styles.resetBtn} onClick={handleReset}>Reset</Button>
        </div>
        
        <div className={styles.buttonsGroup}>
          <Button className={styles.exportBtn} onClick={handleExport}>Export</Button>
        </div>
      </div>

      {/* API Data Display (for testing) */}
      <div className={styles.apiDataDisplay}>
        {/* <div className={styles.apiDataItem}>
          <span className={styles.apiDataLabel}>Total Assets:</span>
          <span className={styles.apiDataValue}>{totalAssets}</span>
        </div> */}
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