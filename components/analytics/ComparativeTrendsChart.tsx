"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', London: 16, NewYork: 22, Tokyo: 18 },
  { day: 'Tue', London: 17, NewYork: 21, Tokyo: 19 },
  { day: 'Wed', London: 15, NewYork: 20, Tokyo: 21 },
  { day: 'Thu', London: 16, NewYork: 19, Tokyo: 20 },
  { day: 'Fri', London: 18, NewYork: 22, Tokyo: 18 },
  { day: 'Sat', London: 17, NewYork: 23, Tokyo: 22 },
  { day: 'Sun', London: 19, NewYork: 24, Tokyo: 23 },
];

export default function ComparativeTrendsChart() {
  return (
    <div className="card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Comparative Temperature Trends</h4>
        <div className="text-sm text-[--text-secondary]">London • New York • Tokyo</div>
      </div>
      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
            <XAxis dataKey="day" tick={{ fill: '#8B9CBD', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8B9CBD', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip wrapperStyle={{ backgroundColor: '#161f2e', border: '1px solid #1E2A3A', borderRadius: 12 }} />
            <Legend wrapperStyle={{ color: '#8B9CBD' }} />
            <Line type="monotone" dataKey="London" stroke="#4361EE" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="NewYork" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="Tokyo" stroke="#F97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
