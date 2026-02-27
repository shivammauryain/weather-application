import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult { name: string; country?: string; lat?: number; lon?: number }

interface SearchState {
  query: string;
  results: SearchResult[];
  history: string[];
}

const initialState: SearchState = { query: '', results: [], history: [] };

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setResults(state, action: PayloadAction<SearchResult[]>) {
      state.results = action.payload;
    },
    addHistory(state, action: PayloadAction<string>) {
      state.history = [action.payload, ...state.history.filter((h) => h !== action.payload)].slice(0, 10);
    },
    clearResults(state) {
      state.results = [];
    },
  },
});

export const { setQuery, setResults, addHistory, clearResults } = slice.actions;
export default slice.reducer;
