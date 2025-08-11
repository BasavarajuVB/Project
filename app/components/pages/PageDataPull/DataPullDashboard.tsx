'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { ExpandOutlined, MoreOutlined, SearchOutlined, RobotOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Dropdown, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
// Styles moved to global entry (app/layout.tsx) per Next.js guidance
import QualityMetrics from '../../common/QualityMetrics';
import FailedCapturesWidget from './FailedCapturesWidget';
import styles from './DataPullDashboard.module.css';

interface DataType {
  key: string;
  date: string;
  command: string;
  requestType: string;
  meters: string;
  progress: string;
  issued: string;
  executed: string;
  performance: string;
  status: string;
}

const DataPullDashboard: React.FC = () => {
  // Chart data
  const readSuccessData = [
    { time: '3:00', success: 90, failure: 10 },
    { time: '6:00', success: 80, failure: 20 },
    { time: '9:00', success: 75, failure: 25 },
    { time: '12:00', success: 86, failure: 14 },
    { time: '15:00', success: 84, failure: 16 },
    { time: '18:00', success: 92, failure: 8 },
    { time: '21:00', success: 82, failure: 18 },
  ];

  const monthlyData = [
    { date: 'Mar 27', success: 90, failure: 10 },
    { date: 'Mar 28', success: 80, failure: 20 },
    { date: 'Mar 29', success: 85, failure: 15 },
    { date: 'Mar 30', success: 60, failure: 40 },
    { date: 'Mar 31', success: 75, failure: 25 },
    { date: 'Apr 1', success: 95, failure: 5 },
    { date: 'Apr 2', success: 93, failure: 7 },
  ];

  const dataCollectionData = [
    { name: '1st Attempt', value: 67, color: '#1890ff' },
    { name: '2nd Attempt', value: 23, color: '#52c41a' },
    { name: '3rd Attempt', value: 10, color: '#faad14' },
  ];

  // Table data
  const tableData: DataType[] = [
    {
      key: '1',
      date: '23 July 2025',
      command: 'Billing Data',
      requestType: 'B',
      meters: '5,698,321',
      progress: '100%',
      issued: '11:15am',
      executed: '12:30 pm',
      performance: '1:15 hours',
      status: '',
    },
    {
      key: '2',
      date: '23 July 2025',
      command: 'Billing Data',
      requestType: 'M',
      meters: '100',
      progress: '75%',
      issued: '11:15am',
      executed: '-',
      performance: '1:15 hours',
      status: 'VV',
    },
    {
      key: '3',
      date: '23 July 2025',
      command: 'Billing Data',
      requestType: 'B',
      meters: '5,698,321',
      progress: '75%',
      issued: '11:15am',
      executed: '12:30 pm',
      performance: '1:15 hours',
      status: '',
    },
    {
      key: '4',
      date: '23 July 2025',
      command: 'Billing Data',
      requestType: 'U',
      meters: '1',
      progress: '100%',
      issued: '11:15am',
      executed: '12:30 pm',
      performance: '1:15 hours',
      status: '',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      width: 120,
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
      width: 100,
      render: (type: string) => (
        <Tag color={type === 'B' ? 'blue' : type === 'M' ? 'green' : 'orange'}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'Meters',
      dataIndex: 'meters',
      key: 'meters',
      width: 120,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 100,
      render: (progress: string) => (
        <div className={styles['progress-cell']}>
          <div className={styles['progress-bar']}>
            <div 
              className={styles['progress-fill']} 
              style={{ width: progress }}
            />
          </div>
          <span>{progress}</span>
        </div>
      ),
    },
    {
      title: 'Issued/Executed',
      key: 'issued',
      width: 150,
      render: (_, record) => (
        <div>
          <div>{record.issued}</div>
          <div style={{ color: '#8fa8c2', fontSize: '12px' }}>{record.executed}</div>
        </div>
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      width: 120,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => status ? <span className={styles['status-error']}>v v</span> : null,
    },
    {
      title: 'More',
      key: 'more',
      width: 50,
      render: () => (
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>⋮</span>
      ),
    },
  ];

  const handleExport = () => {
    const rows = [
      ['Date', 'Command', 'RequestType', 'Meters', 'Progress', 'Issued', 'Executed', 'Performance', 'Status'],
      ['23 July 2025', 'Billing Data', 'B', '5,698,321', '100%', '11:15am', '12:30 pm', '1:15 hours', ''],
      ['23 July 2025', 'Billing Data', 'M', '100', '75%', '11:15am', '-', '1:15 hours', 'VV'],
    ];
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data-pull.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles['data-pull-dashboard']}>
      {/* Top Navigation Bar */}
      <div className={styles['top-navbar']}>
        <div className={styles['nav-center']} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <select className={styles['dp-select']}>
            <option>Week</option>
            <option>Month</option>
            <option>Year</option>
          </select>
          <select className={styles['dp-select']}><option>All sections</option></select>
          <select className={styles['dp-select']}><option>All subsections</option></select>
          <select className={styles['dp-select']}><option>All feeders</option></select>
          <Button className={styles['filter-btn']}>Filter</Button>
          <Button type="text" style={{ color: '#8fa8c2' }}>Reset</Button>
          {/* <div className="live-status"><span className="live-dot"/> Live</div> */}
        </div>
        <div>
          <button className="export-btn" onClick={handleExport}>
            Export
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className={styles['metrics-grid']}>
        <div className={`${styles['metric-card']} ${styles['total-meters']}`}>
          <div className={styles['metric-label']}>Total meters</div>
          <div className={styles['metric-value']}>12,34,567</div>
        </div>
        
        <div className={`${styles['metric-card']} ${styles['commands-executed']}`}>
          <div className={styles['metric-label']}>Pulls Commands Executed vs Sent</div>
          <div className={styles['metric-value']}>500k / 700k</div>
        </div>
        
        <div className={`${styles['metric-card']} ${styles['request-types']}`}>
          <div className={styles['metric-label']}>Request Types: Uni-, Multi-, Broadcast</div>
          <div className={styles['metric-value']}>1k, 3.3k, 7</div>
        </div>
        
        <div className={`${styles['metric-card']} ${styles['success-rate']}`}>
          <div className={styles['metric-label']}>Read Success Rate</div>
          <div className={styles['metric-value']}>96.06%</div>
          <div className={`${styles['metric-change']} ${styles['change-negative']}`}>
            ↘ -0.01%
          </div>
        </div>
        
        <div className={`${styles['metric-card']} ${styles['avg-time']}`}>
          <div className={styles['metric-label']}>Average Executed Time</div>
          <div className={styles['metric-value']}>4.51 min</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles['charts-section']}>
        <div className={styles['chart-card']}>
          <div className={styles['chart-header']}>
            <div className={styles['chart-title']}>Read Success Rate</div>
            <ExpandOutlined className={styles['expand-icon']} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={readSuccessData}>
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[90, 100]} />
              <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} />
              <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles['chart-card']}>
          <div className={styles['chart-header']}>
            <div className={styles['chart-title']}>Monthly Read Success Rate</div>
            <ExpandOutlined className={styles['expand-icon']} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8fa8c2', fontSize: 12 }} domain={[85, 100]} />
              <Legend wrapperStyle={{ color: '#8fa8c2', fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="success" stackId="a" fill="#66BB6A" name="Success" radius={[0, 0, 0, 0]} />
              <Bar dataKey="failure" stackId="a" fill="#D63B46" name="Failure" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Command Status Section */}
      <div className={styles['command-status-section']}>
        <div className={styles['command-status-main']}>
          <div className={styles['command-header']}>
            <div className={styles['command-header-top']}>
              <div className={styles['command-title']}>Command Status</div>
              <ExpandOutlined className={styles['command-extra']} />
            </div>
            <div className={styles['command-tabs']}>
              <div className={`${styles['tab']} ${styles['active']}`}>All (10)</div>
              <div className={styles['tab']}>Pending (3)</div>
              <div className={styles['tab']}>In Progress (2)</div>
              <div className={styles['tab']}>Success (4)</div>
              <div className={styles['tab']}>Failed (1)</div>
            </div>
          </div>
          
          <div className={styles['table-container']}>
            <Table 
              columns={columns} 
              dataSource={tableData} 
              pagination={false}
              size="small"
              className={styles['command-table']}
            />
          </div>
          
          <div className={styles['pagination']}>
            <Button type="text">«</Button>
            <Button type="text">‹</Button>
            <Button type="primary">1</Button>
            <Button type="text">2</Button>
            <Button type="text">3</Button>
            <Button type="text">4</Button>
            <Button type="text">5</Button>
            <span>...</span>
            <Button type="text">11</Button>
            <Button type="text">12</Button>
            <Button type="text">›</Button>
            <Button type="text">»</Button>
          </div>
        </div>

        <div className={styles['data-collection-chart']}>
          <div className={styles['chart-header']}>
            <div className={styles['chart-title']}>Data Collection</div>
          </div>
          <div className={styles['legend']}>
            <div className={styles['legend-item']}>
              <div className={styles['legend-color']} style={{ backgroundColor: '#1890ff' }}></div>
              <span>1st Attempt</span>
            </div>
            <div className={styles['legend-item']}>
              <div className={styles['legend-color']} style={{ backgroundColor: '#52c41a' }}></div>
              <span>2nd Attempt</span>
            </div>
            <div className={styles['legend-item']}>
              <div className={styles['legend-color']} style={{ backgroundColor: '#faad14' }}></div>
              <span>3rd Attempt</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={dataCollectionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {dataCollectionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Quality Cards using shared components */}
      <div className={styles['quality-cards-grid']}>
        <QualityMetrics title="Consistency" value="98.5%" change="-0.01%" subValue="996000" isPositive={false} />
        <QualityMetrics title="Quality" value="73.1%" change="-0.01%" subValue="1243546" isPositive={false} />
        <QualityMetrics title="Security" value="147" change="-0.5%" subValue="" isPositive={true} />
        <FailedCapturesWidget />
      </div>
    </div>
  );
};

export default DataPullDashboard;


