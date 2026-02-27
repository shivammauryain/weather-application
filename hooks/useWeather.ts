"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWeather } from '@/store/slices/weatherSlice';

export default function useWeather(city?: string) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((s) => (city ? s.weather.cities[city] : undefined));

  useEffect(() => {
    if (!city) return;
    dispatch(fetchWeather(city));
  }, [city, dispatch]);

  return data;
}
