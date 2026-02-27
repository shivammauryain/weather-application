"use client";

import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAnalytics } from '@/store/slices/analyticsSlice';

function Chart() {
  const dispatch = useAppDispatch();
  const trends = useAppSelector((s) => s.analytics.trends);

  useEffect(() => {
    // still fetch analytics for full dataset in background
    dispatch(fetchAnalytics({ range: '7d', region: 'IN' }));
  }, [dispatch]);

  // Prefer server analytics if available, otherwise build from live tracked weather data
  const weatherCities = useAppSelector((s) => s.weather.cities);
  const dataFromWeather = Object.keys(weatherCities).map((k) => ({ name: k, value: Math.round(weatherCities[k].temp) }));

  const data = trends?.barData ?? (dataFromWeather.length ? dataFromWeather : [
    { name: '1', value: 12 },
    { name: '2', value: 15 },
    { name: '3', value: 14 },
    { name: '4', value: 18 },
    { name: '5', value: 13 },
    { name: '6', value: 16 },
    { name: '7', value: 14 },
  ]);

  return (
    <div className="card p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-lg">Temperature Variation (Last 24h)</h4>
      </div>
      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3A" />
            <XAxis dataKey="name" tick={false} axisLine={false} />
            <YAxis hide />
            <Tooltip wrapperStyle={{ backgroundColor: '#161f2e', border: '1px solid #1E2A3A', borderRadius: 12 }} />
            <Bar dataKey="value" fill="#1E2A3A" radius={[6,6,0,0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default React.memo(Chart);
