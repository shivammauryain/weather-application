"use client";

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWeather } from '@/store/slices/weatherSlice';

export default function useRealtime() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.cities);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // initial fetch
    favorites.forEach((city) => dispatch(fetchWeather(city)));

    intervalRef.current = window.setInterval(() => {
      favorites.forEach((city) => dispatch(fetchWeather(city)));
    }, 60_000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [dispatch, favorites]);
}
