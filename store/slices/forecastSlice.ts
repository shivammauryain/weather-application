import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HourlyPoint { dt: number; temp: number }

export interface ForecastData {
  city: string;
  hourly: HourlyPoint[];
  daily?: Array<{ dt: number; temp: { min: number; max: number } }>;
}

interface ForecastState {
  forecasts: Record<string, ForecastData>;
  loading: boolean;
  error?: string | null;
}

const initialState: ForecastState = { forecasts: {}, loading: false, error: null };

export const fetchForecast = createAsyncThunk<ForecastData, string>('forecast/fetchForecast', async (city) => {
  const res = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('Failed to fetch forecast');
  const data = await res.json();
  return data as ForecastData;
});

const slice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    clearForecast(state, action: PayloadAction<string>) {
      delete state.forecasts[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecast.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchForecast.fulfilled, (state, action) => {
      state.loading = false;
      state.forecasts[action.payload.city] = action.payload;
    });
    builder.addCase(fetchForecast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Unknown error';
    });
  },
});

export const { clearForecast } = slice.actions;
export default slice.reducer;
