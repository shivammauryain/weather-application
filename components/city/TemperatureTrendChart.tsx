"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import ChartTabSelector from './ChartTabSelector';

const Area = dynamic(() => import('@/components/charts/AreaChart'), { ssr: false });

export default function TemperatureTrendChart() {
  return (
    <div className="card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">24h Temperature Trend</h4>
        <ChartTabSelector />
      </div>
      <Area />
    </div>
  );
}
