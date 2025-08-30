'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Select, Button, Modal } from 'antd';
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

  // API State Variables - only manufacturer for now
  const [manufacturers, setManufacturers] = useState<Array<{manufacturerId: number, manufacturerName: string}>>([]);
  const [manufacturerLoading, setManufacturerLoading] = useState(true);
  const [manufacturerError, setManufacturerError] = useState<string | null>(null);
  const [showEmptyDataModal, setShowEmptyDataModal] = useState(false);

  // API State Variables for models
  const [meterModels, setMeterModels] = useState<string[]>([]);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);

  // API State Variables for types
  const [meterTypes, setMeterTypes] = useState<string[]>([]);
  const [typeLoading, setTypeLoading] = useState(true);
  const [typeError, setTypeError] = useState<string | null>(null);

  // API State Variables for connectivity
  const [nicTypes, setNicTypes] = useState<Array<{nicType: string}>>([]);
  const [connectivityLoading, setConnectivityLoading] = useState(true);
  const [connectivityError, setConnectivityError] = useState<string | null>(null);

  // All filters are now API-driven - no more static data

  // Fetch only manufacturer data from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchManufacturers = async () => {
      try {
        setManufacturerLoading(true);
        
        const response = await fetch('/api/ad/manufacturernames', { 
          cache: 'no-store' 
        });
        
        if (!response.ok) {
          throw new Error(`Manufacturer API failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        // Check if manufacturer data is empty
        if (!data?.length) {
          setShowEmptyDataModal(true);
          setManufacturerError('Manufacturer data is empty');
        } else {
          setManufacturers(data);
          setManufacturerError(null);
        }
        
      } catch (e) {
        if (!isMounted) return;
        setManufacturerError('Failed to fetch manufacturer data');
        setShowEmptyDataModal(true);
      } finally {
        if (!isMounted) return;
        setManufacturerLoading(false);
      }
    };

    fetchManufacturers();
    const intervalId = setInterval(fetchManufacturers, 10000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Fetch meter models data from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchMeterModels = async () => {
      try {
        setModelLoading(true);
        
        const response = await fetch('/api/ad/metermodels', { 
          cache: 'no-store' 
        });
        
        if (!response.ok) {
          throw new Error(`Model API failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        // Check if model data is empty
        if (!data?.length) {
          setShowEmptyDataModal(true);
          setModelError('Model data is empty');
        } else {
          setMeterModels(data);
          setModelError(null);
        }
        
      } catch (e) {
        if (!isMounted) return;
        setShowEmptyDataModal(true);
        setModelError('Failed to fetch model data');
      } finally {
        if (!isMounted) return;
        setModelLoading(false);
      }
    };

    fetchMeterModels();
    const intervalId = setInterval(fetchMeterModels, 10000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Fetch meter types data from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchMeterTypes = async () => {
      try {
        setTypeLoading(true);
        
        const response = await fetch('/api/ad/metertypes', { 
          cache: 'no-store' 
        });
        
        if (!response.ok) {
          throw new Error(`Type API failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        // Check if type data is empty
        if (!data?.length) {
          setShowEmptyDataModal(true);
          setTypeError('Type data is empty');
        } else {
          setMeterTypes(data);
          setTypeError(null);
        }
        
      } catch (e) {
        if (!isMounted) return;
        setShowEmptyDataModal(true);
        setTypeError('Failed to fetch type data');
      } finally {
        if (!isMounted) return;
        setTypeLoading(false);
      }
    };

    fetchMeterTypes();
    const intervalId = setInterval(fetchMeterTypes, 10000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Fetch connectivity data from API
  useEffect(() => {
    let isMounted = true;
    
    const fetchConnectivity = async () => {
      try {
        setConnectivityLoading(true);
        
        const response = await fetch('/api/ad/nictypenames', { 
          cache: 'no-store' 
        });
        
        if (!response.ok) {
          throw new Error(`Connectivity API failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isMounted) return;
        
        // Check if connectivity data is empty
        if (!data?.length) {
          setShowEmptyDataModal(true);
          setConnectivityError('Connectivity data is empty');
        } else {
          console.log('Processing connectivity data:', data);
          setNicTypes(data.map((nic: string) => ({ nicType: nic })));
          setConnectivityError(null);
        }
        
      } catch (e) {
        if (!isMounted) return;
        setShowEmptyDataModal(true);
        setConnectivityError('Failed to fetch connectivity data');
      } finally {
        if (!isMounted) return;
        setConnectivityLoading(false);
      }
    };

    fetchConnectivity();
    const intervalId = setInterval(fetchConnectivity, 10000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // Filter change handlers
  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    
    setFilters(newFilters);
    
    // Use intelligent filtering to update other dropdowns
    fetchFilteredDropdownValues(newFilters);
  };

  // Fetch filtered dropdown values based on current filter selections
  // This provides intelligent filtering where dropdown options are context-aware
  // When user selects a filter, other dropdowns show only valid combinations
  const fetchFilteredDropdownValues = async (currentFilters: FilterState) => {
    try {
      // Build query parameters for the filtered API
      const queryParams = new URLSearchParams();
      
      if (currentFilters.connectivity !== 'all') {
        queryParams.append('nictype', JSON.stringify([currentFilters.connectivity.toUpperCase()]));
      }
      if (currentFilters.model !== 'all') {
        queryParams.append('modelname', JSON.stringify([currentFilters.model.toUpperCase()]));
      }
      if (currentFilters.type !== 'all') {
        queryParams.append('metertype', JSON.stringify([currentFilters.type.toUpperCase()]));
      }
      if (currentFilters.manufacturer !== 'all') {
        // Convert back from kebab-case to proper name
        const manufacturerName = currentFilters.manufacturer
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        queryParams.append('manufacturername', JSON.stringify([manufacturerName]));
      }
      
      const response = await fetch(`/api/ad/dropdownvaluesfiltered?${queryParams.toString()}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Filtered API failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Filtered dropdown values:', data);
      
      // Update dropdowns with filtered values if they have data
      if (data.manufacturer?.length) {
        const manufacturerData = data.manufacturer.map((name: string, index: number) => ({
          manufacturerId: index + 1,
          manufacturerName: name
        }));
        setManufacturers(manufacturerData);
      }
      
      if (data.model?.length) {
        setMeterModels(data.model);
      }
      
      if (data.type?.length) {
        setMeterTypes(data.type);
      }
      
      if (data.connectivity?.length) {
        setNicTypes(data.connectivity.map((nic: string) => ({ nicType: nic })));
      }
      
    } catch (error) {
      console.error('Failed to fetch filtered dropdown values:', error);
      // Fall back to individual API calls if filtered API fails
    }
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
        if (filters.type === 'single_phase') {
          // Show only Single Phase (segment1)
          filteredOem.total = filteredOem.segment1;
          filteredOem.segment2 = 0;
        } else if (filters.type === 'three_phase') {
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

  const handleCloseModal = () => {
    setShowEmptyDataModal(false);
  };

  return (
    <div className={styles.assetDashboard}>
      {/* Empty Data Modal */}
      <Modal
        title="Filter Data Warning"
        open={showEmptyDataModal}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        okText="OK"
        cancelText="Close"
      >
        <p>Some filter options are empty or unavailable. This may affect the filtering functionality.</p>
        {manufacturerError && <p style={{ color: 'red' }}>Manufacturer Error: {manufacturerError}</p>}
        {modelError && <p style={{ color: 'red' }}>Model Error: {modelError}</p>}
        {typeError && <p style={{ color: 'red' }}>Type Error: {typeError}</p>}
        {connectivityError && <p style={{ color: 'red' }}>Connectivity Error: {connectivityError}</p>}
      </Modal>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.dropdownsGroup}>
          
          <Select 
            placeholder="Manufacturer" 
            style={{ width: 175 }}
            value={filters.manufacturer}
            onChange={(value) => handleFilterChange('manufacturer', value)}
            loading={manufacturerLoading}
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
            loading={modelLoading}
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
            loading={typeLoading}
          >
            <Option value="all">All Types</Option>
            {meterTypes.map((type, index) => (
              <Option key={index} value={type.toLowerCase()}>
                {type.replace(/_/g, ' ')}
              </Option>
            ))}
          </Select>
          
          <Select 
            placeholder="Connectivity" 
            style={{ width: 175}}
            value={filters.connectivity}
            onChange={(value) => handleFilterChange('connectivity', value)}
            loading={connectivityLoading}
          >
            <Option value="all">All Connectivity</Option>
            {nicTypes
              .filter(nic => nic && nic.nicType && typeof nic.nicType === 'string')
              .map((nic, index) => (
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