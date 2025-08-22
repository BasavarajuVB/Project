'use client';

import React from 'react';
import AssetDashboard from './AssetDashboard';

interface PageHomeProps {
  copilotOpen?: boolean;
}

const PageHome: React.FC<PageHomeProps> = ({ copilotOpen = false }) => {
  return <AssetDashboard copilotOpen={copilotOpen} />;
};

export default PageHome; 