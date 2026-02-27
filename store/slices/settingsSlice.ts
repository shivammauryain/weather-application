import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  unit: 'metric' | 'imperial';
  theme: 'dark' | 'light';
}

const initialState: SettingsState = {
  unit: 'metric',
  theme: 'dark',
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    },
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
  },
});

export const { toggleUnit, setTheme } = slice.actions;
export default slice.reducer;
