"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, defs } from 'recharts';

interface Point { name: string; temp: number }

const sample: Point[] = [
  { name: 'Now', temp: 8 },
  { name: '12 PM', temp: 10 },
  { name: '3 PM', temp: 14 },
  { name: '6 PM', temp: 13 },
  { name: '9 PM', temp: 12 },
  { name: '12 AM', temp: 9 },
];

export default function TempAreaChart({ data = sample }: { data?: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4361EE" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4361EE" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
        <XAxis dataKey="name" tick={{ fill: '#8B9CBD', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#8B9CBD', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip wrapperStyle={{ backgroundColor: '#161f2e', border: '1px solid #1E2A3A', borderRadius: 12 }} />
        <Area type="monotone" dataKey="temp" stroke="#4361EE" strokeWidth={2.5} fill="url(#tempGrad)" dot={false} activeDot={{ r: 6, fill: '#fff', stroke: '#4361EE', strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
