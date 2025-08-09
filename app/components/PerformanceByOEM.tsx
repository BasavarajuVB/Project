// 'use client';

// import React from 'react';

// interface OEMPerformanceProps {
//   name: string;
//   percentage: number;
//   color: string;
// }

// const OEMPerformanceItem: React.FC<OEMPerformanceProps> = ({ name, percentage, color }) => {
//   return (
//     <div style={{ marginBottom: '16px' }}>
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         marginBottom: '8px'
//       }}>
//         <span style={{ color: '#8fa8c2', fontSize: '14px' }}>{name}</span>
//         <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>{percentage}%</span>
//       </div>
//       <div className="progress-bar">
//         <div 
//           className="progress-fill" 
//           style={{ 
//             width: `${percentage}%`,
//             background: color
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// const PerformanceByOEM: React.FC = () => {
//   return (
//     <div className="chart-card">
//       <div className="chart-header">
//         <div className="chart-title">Performance by OEM</div>
//       </div>
      
//       <div style={{ marginTop: '20px' }}>
//         <OEMPerformanceItem name="Adya" percentage={97} color="#e91e63" />
//         <OEMPerformanceItem name="HPL" percentage={94} color="#2196f3" />
//         <OEMPerformanceItem name="Genus" percentage={86} color="#ff9800" />
//       </div>
//     </div>
//   );
// };

// export default PerformanceByOEM;
'use client';

import React from 'react';

interface OEMPerformanceProps {
  name: string;
  percentage: number;
  color: string;
}

const OEMPerformanceItem: React.FC<OEMPerformanceProps> = ({ name, percentage, color }) => {
  return (
    <div className="oem-perf-item">
      <span className="oem-perf-name">{name}</span>
      <div className="oem-perf-bar-wrapper">
        <div className="oem-perf-bar-bg" />
        <div
          className="oem-perf-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="oem-perf-percentage">{percentage}%</span>
    </div>
  );
};

const PerformanceByOEM: React.FC = () => {
  return (
    <div className="oem-perf-card">
      <div className="oem-perf-header">
        <span className="oem-perf-title">Performance by OEM</span>
      </div>
      <div className="oem-perf-list">
        <OEMPerformanceItem name="Adya" percentage={97} color="#cf66e4" />
        <OEMPerformanceItem name="HPL" percentage={94} color="#55c0b5" />
        <OEMPerformanceItem name="Genus" percentage={86} color="#fdd835" />
      </div>
    </div>
  );
};

export default PerformanceByOEM;

