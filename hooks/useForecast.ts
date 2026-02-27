"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchForecast } from '@/store/slices/forecastSlice';

export default function useForecast(city?: string) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((s) => (city ? s.forecast.forecasts[city] : undefined));

  useEffect(() => {
    if (!city) return;
    dispatch(fetchForecast(city));
  }, [city, dispatch]);

  return data;
}
