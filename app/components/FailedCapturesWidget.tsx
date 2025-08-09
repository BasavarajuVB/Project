// 'use client';

// import React from 'react';

// interface FailedCaptureItem {
//   label: string;
//   percentage: number;
//   color: string;
// }

// const failedCapturesData: FailedCaptureItem[] = [
//   { label: 'Meters', percentage: 67, color: '#e91e63' },
//   { label: 'Communication', percentage: 45, color: '#2196f3' },
//   { label: 'Software', percentage: 24, color: '#ff9800' },
// ];

// const FailedCapturesWidget: React.FC = () => {
//   return (
//     <div className="failed-captures-card">
//       <div className="widget-label" style={{ marginBottom: '20px' }}>
//         Failed Captures — Reason Buckets
//       </div>
      
//       {failedCapturesData.map((item, index) => (
//         <div key={index} className="failed-captures-item">
//           <span className="failed-captures-label">{item.label}</span>
//           <div className="failed-captures-bar">
//             <div 
//               className="failed-captures-fill"
//               style={{ 
//                 width: `${item.percentage}%`,
//                 background: item.color
//               }}
//             />
//           </div>
//           <span className="failed-captures-percentage">{item.percentage}%</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FailedCapturesWidget;

'use client';

import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

interface FailedCaptureItem {
  label: string;
  percentage: number;
  color: string;
}

const failedCapturesData: FailedCaptureItem[] = [
  { label: 'Meters', percentage: 67, color: '#cf66e4' },
  { label: 'Communication', percentage: 45, color: '#55c0b5' },
  { label: 'Software', percentage: 24, color: '#fdd835' },
];

const FailedCapturesWidget: React.FC = () => {
  return (
    <div className="fc-card">
      <div className="fc-header">
        <span className="fc-title">Failed Captures — Reason Buckets</span>
        <InfoCircleOutlined className="fc-icon" />
      </div>

      <div className="fc-list">
        {failedCapturesData.map((item, index) => (
          <div key={index} className="fc-item">
            <span className="fc-label">{item.label}</span>
            <div className="fc-progress-wrapper">
              <div className="fc-progress-bg" />
              <div
                className="fc-progress-fill"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
            <span className="fc-percentage">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FailedCapturesWidget;
