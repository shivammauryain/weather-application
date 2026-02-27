"use client";

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'N', A: 30 },
  { subject: 'NE', A: 20 },
  { subject: 'E', A: 30 },
  { subject: 'SE', A: 24 },
  { subject: 'S', A: 18 },
  { subject: 'SW', A: 26 },
  { subject: 'W', A: 28 },
  { subject: 'NW', A: 22 },
];

export default function WindRadarChart() {
  return (
    <div className="card p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Wind Speed & Direction</h4>
        <div className="text-sm text-[--text-muted]">Current • Avg</div>
      </div>
      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#1E2A3A" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#8B9CBD' }} />
            <PolarRadiusAxis />
            <Radar name="Current" dataKey="A" stroke="#4361EE" fill="#4361EE" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-3">
        <div className="text-2xl font-bold">18 km/h</div>
        <div className="text-[--text-muted]">Dominant Direction: NW</div>
      </div>
    </div>
  );
}
