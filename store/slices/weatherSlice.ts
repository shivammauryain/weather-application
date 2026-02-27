import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WindInfo { speed: number; deg: number; dir?: string }

export interface WeatherData {
  name: string;
  sys?: { country?: string };
  temp: number;
  condition: string;
  humidity?: number;
  wind?: WindInfo;
  lastUpdated?: number;
}

interface WeatherState {
  cities: Record<string, WeatherData>;
  loading: boolean;
  error?: string | null;
}

const initialState: WeatherState = {
  // Provide some seeded tracked locations so new users see data immediately
  cities: {
    'New Delhi': {
      name: 'New Delhi',
      sys: { country: 'IN' },
      temp: 30,
      condition: 'Clear',
      humidity: 40,
      wind: { speed: 3.5, deg: 90 },
      lastUpdated: Date.now(),
    },
    'Mumbai': {
      name: 'Mumbai',
      sys: { country: 'IN' },
      temp: 28,
      condition: 'Clouds',
      humidity: 70,
      wind: { speed: 4.2, deg: 180 },
      lastUpdated: Date.now(),
    },
    'Bengaluru': {
      name: 'Bengaluru',
      sys: { country: 'IN' },
      temp: 26,
      condition: 'Rain',
      humidity: 80,
      wind: { speed: 2.1, deg: 200 },
      lastUpdated: Date.now(),
    },
    'Kolkata': {
      name: 'Kolkata',
      sys: { country: 'IN' },
      temp: 27,
      condition: 'Haze',
      humidity: 65,
      wind: { speed: 3.0, deg: 150 },
      lastUpdated: Date.now(),
    },
  },
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk<WeatherData, string>('weather/fetchWeather', async (city) => {
  const res = await fetch(`/api/weather/current?city=${encodeURIComponent(city)}`);
  if (!res.ok) throw new Error('Failed to fetch weather');
  const data = await res.json();
  // expecting normalized server response
  return data as WeatherData;
});

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearCity(state, action: PayloadAction<string>) {
      delete state.cities[action.payload];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setWeather(state, action: PayloadAction<WeatherData>) {
      state.cities[action.payload.name] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.loading = false;
      const payload = action.payload;
      payload.lastUpdated = Date.now();
      state.cities[payload.name] = payload;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Unknown error';
    });
  },
});

export const { clearCity, setLoading, setWeather } = slice.actions;
export default slice.reducer;
