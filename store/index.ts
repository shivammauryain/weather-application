import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

let storage: any = undefined;
if (typeof window !== 'undefined') {
  storage = require('redux-persist/lib/storage').default;
}

import weatherReducer from '@/store/slices/weatherSlice';
import forecastReducer from '@/store/slices/forecastSlice';
import favoritesReducer from '@/store/slices/favoritesSlice';
import settingsReducer from '@/store/slices/settingsSlice';
import searchReducer from '@/store/slices/searchSlice';
import analyticsReducer from '@/store/slices/analyticsSlice';

const persistConfig: any = {
  key: 'root',
  ...(storage ? { storage } : {}),
  whitelist: ['favorites', 'settings'],
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  forecast: forecastReducer,
  favorites: favoritesReducer,
  settings: settingsReducer,
  search: searchReducer,
  analytics: analyticsReducer,
});


const reducer = storage  ? (persistReducer(persistConfig, rootReducer as any) as unknown as typeof rootReducer) : rootReducer;

export const store = configureStore({
  reducer: reducer as any,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = storage ? persistStore(store) : null;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
