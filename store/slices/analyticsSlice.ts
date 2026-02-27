import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type TimeRange = '24h' | '7d' | '30d' | '1y';

export interface AnalyticsState {
  globalData?: { avgTemp?: number; precipitation?: number };
  trends?: any;
  timeRange: TimeRange;
  loading: boolean;
  error?: string | null;
}

const initialState: AnalyticsState = { timeRange: '7d', loading: false };

export const fetchAnalytics = createAsyncThunk<any, { range: TimeRange; region?: string }>('analytics/fetchAnalytics', async ({ range, region }) => {
  const url = `/api/analytics?range=${encodeURIComponent(range)}${region ? `&region=${encodeURIComponent(region)}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
});

const slice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setTimeRange(state, action: PayloadAction<TimeRange>) {
      state.timeRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnalytics.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAnalytics.fulfilled, (state, action) => {
      state.loading = false;
      state.trends = action.payload;
    });
    builder.addCase(fetchAnalytics.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Unknown error';
    });
  },
});

export const { setTimeRange } = slice.actions;
export default slice.reducer;
