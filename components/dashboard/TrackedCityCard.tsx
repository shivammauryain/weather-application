"use client";

import React from 'react';
import WeatherIcon from '@/components/ui/WeatherIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeFavorite, addFavorite } from '@/store/slices/favoritesSlice';
import { fetchWeather } from '@/store/slices/weatherSlice';
import { FiXCircle, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import slugify from '@/lib/utils/slug';

interface Props { city: string; temp: number; condition: string; showUnpin?: boolean }

export default function TrackedCityCard({ city, temp, condition, showUnpin = true }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.cities);
  const pinned = favorites.includes(city);

  function handlePin() {
    dispatch(addFavorite(city));
    dispatch(fetchWeather(city));
  }

  function handleUnpin() {
    dispatch(removeFavorite(city));
  }

  const slug = slugify(city);

  return (
    <Link href={`/${slug}`} className="block">
      <div className="card p-4 rounded-2xl min-h-30 card-hover flex flex-col justify-between relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">{city}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <WeatherIcon name={condition} size={28} />
            {!pinned ? (
              <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePin(); }} className="text-sm text-blue-400 hover:text-blue-500 p-1">
                <FiMapPin size={16} />
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-4xl font-bold">{Math.round(temp)}°</div>
          <div className="text-sm text-[--text-muted]">{condition}</div>
        </div>

        {pinned && showUnpin ? (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleUnpin(); }}
            aria-label={`Unpin ${city}`}
            title={`Unpin ${city}`}
            className="absolute bottom-3 right-3 text-red-400 hover:text-red-500 p-1"
          >
            <FiXCircle size={20} />
          </button>
        ) : null}
      </div>
    </Link>
  );
}

