"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import WeatherIcon from '@/components/ui/WeatherIcon';
import Button from '@/components/ui/Button';

interface Props { city: string; country?: string; temp: number; condition: string; showBack?: boolean }

export default function CityHeroCard({ city, country, temp, condition, showBack }: Props) {
  const router = useRouter();
  return (
    <div className="card p-6 rounded-2xl flex gap-6">
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{city}, {country}</h2>
            <div className="text-[--text-muted] text-sm">Monday, 12 Oct • 10:23 AM</div>
          </div>
          <div className="flex items-center gap-2">
            {showBack ? (
              <Button className='' onClick={() => router.back()}>Back to Home</Button>
            ) : (
              <>
                <Button variant="outline">Share</Button>
                <Button>Update</Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-4">
            <WeatherIcon name={condition} size={96} />
            <div>
              <div className="text-6xl font-bold">{Math.round(temp)}°</div>
              <div className="text-sm text-[--text-muted]">Mostly Cloudy</div>
            </div>
          </div>

          <div className="ml-auto card p-4 rounded-2xl" style={{ minWidth: 180 }}>
            <div className="text-sm text-[--text-muted]">Feels Like</div>
            <div className="text-xl font-semibold mt-1">12°</div>
            <div className="text-[--text-muted] text-sm mt-2">Low / High 9° / 17°</div>
            <div className="text-[--text-muted] text-sm mt-2">Air Quality · <span className="text-[--accent-green]">Good</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
