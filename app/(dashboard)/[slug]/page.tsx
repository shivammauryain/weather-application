import React from 'react';
import CityHeroCard from '@/components/city/CityHeroCard';
import TemperatureTrendChart from '@/components/city/TemperatureTrendChart';
import SevenDayForecast from '@/components/city/SevenDayForecast';
import LiveMapCard from '@/components/city/LiveMapCard';
import StatCard from '@/components/city/StatCard';
import SunriseSunsetCard from '@/components/city/SunriseSunsetCard';

export default function CityPage({ params }: { params: { slug: string } }) {
  // params.slug can be used to fetch data via hooks
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 py-6 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <CityHeroCard city="London" country="UK" temp={14} condition="Clouds" showBack />
        <TemperatureTrendChart />
        <SevenDayForecast />
      </div>

      <div className="space-y-4">
        <LiveMapCard />
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="UV Index" value={4} subtitle="Moderate" />
          <StatCard title="Humidity" value={`42%`} subtitle="Dew point: 8°" />
        </div>
        <StatCard title="Wind Speed" value={`12 km/h`} subtitle="Direction: NW" />
        <SunriseSunsetCard />
      </div>
    </div>
  );
}
