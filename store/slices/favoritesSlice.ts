import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  cities: string[]; // city names or slugs
}

const initialState: FavoritesState = {
  // Seed three pinned favorites for first-time users
  cities: ['New Delhi', 'Mumbai', 'Bengaluru'],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      if (!state.cities.includes(action.payload)) state.cities.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter((c) => c !== action.payload);
    },
    reorderFavorites(state, action: PayloadAction<string[]>) {
      state.cities = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, reorderFavorites } = slice.actions;
export default slice.reducer;
