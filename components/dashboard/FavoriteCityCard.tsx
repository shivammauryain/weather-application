"use client";

import React from 'react';
import Link from 'next/link';
import slugify from '@/lib/utils/slug';
import WeatherIcon from '@/components/ui/WeatherIcon';
import Badge from '@/components/ui/Badge';
import { FiXCircle } from 'react-icons/fi';
import { useAppDispatch } from '@/store/hooks';
import { removeFavorite } from '@/store/slices/favoritesSlice';

interface Props {
  city: string;
  region?: string;
  temp: number;
  condition: string;
  humidity?: number;
  wind?: string;
  night?: boolean;
}

export default function FavoriteCityCard({ city, region, temp, condition, humidity, wind, night }: Props) {
  const dispatch = useAppDispatch();
  const slug = slugify(city);

  return (
    <Link href={`/${slug}`} className="block">
      <div className="card p-6 rounded-2xl relative flex flex-col justify-between min-h-55 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-2xl">{city}</h3>
            {night ? <Badge className="badge-night">NIGHT</Badge> : null}
          </div>
          <div className="text-[--text-muted] text-sm">{region}</div>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <WeatherIcon name={condition} size={48} />
        </div>
      </div>

      <div>
        <div className="mt-6 flex items-baseline gap-4">
          <div className="text-5xl font-bold">{Math.round(temp)}°</div>
          <div className="text-sm text-[--text-muted]">{condition}</div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="stat-chip flex items-center gap-2">
            <div className="text-[--text-secondary] text-xs uppercase">Humidity</div>
            <div className="text-sm font-semibold">{humidity ?? '--'}%</div>
          </div>
          <div className="stat-chip flex items-center gap-2">
            <div className="text-[--text-secondary] text-xs uppercase">Wind</div>
            <div className="text-sm font-semibold">{wind ?? '--'}</div>
          </div>
        </div>
      </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(removeFavorite(city)); }}
          aria-label={`Unpin ${city}`}
          title={`Unpin ${city}`}
          className="absolute bottom-3 right-3 text-red-400 hover:text-red-500 p-1"
        >
          <FiXCircle size={22} />
        </button>
      </div>
    </Link>
  );
}
