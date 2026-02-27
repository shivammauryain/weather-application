"use client";

import React, { useEffect, useState } from 'react';
import FavoriteCityCard from './FavoriteCityCard';
import AddLocationCard from './AddLocationCard';
import Modal from '@/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWeather } from '@/store/slices/weatherSlice';
import Skeleton from '@/components/ui/Skeleton';
import { addFavorite } from '@/store/slices/favoritesSlice';

export default function PinnedFavoritesSection() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.cities);
  const cities = useAppSelector((s) => s.weather.cities);

  const [hydrated, setHydrated] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Mark client hydration after a short delay to avoid SSR/client markup mismatch
  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Fetch weather only after client hydration
  useEffect(() => {
    if (!hydrated) return;
    favorites.forEach((c: string) => {
      if (!cities[c] || Date.now() - (cities[c].lastUpdated ?? 0) > 55_000) {
        dispatch(fetchWeather(c));
      }
    });
  }, [favorites, dispatch, hydrated]);
  return (
    <section className='pt-6'>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex gap-2">
          <button onClick={() => setModalOpen(true)} className="px-4 py-2 rounded-xl bg-[--accent-blue] text-white">Add Location</button>
        </div>
      </div>

      <div className="text-[--text-muted] mb-6">Real-time monitoring of your selected locations. Weather patterns are updating live.</div>

      <div>
        <div className="mb-3 font-semibold">Pinned Favorites</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.length === 0 && !hydrated && (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-6 rounded-2xl relative flex flex-col justify-between min-h-55">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-32 h-6 rounded-lg" />
                    </div>
                    <div className="text-[--text-muted] text-sm mt-2"><Skeleton className="w-20 h-4 rounded-md" /></div>
                  </div>
                  <div className="text-right"><Skeleton className="w-12 h-12 rounded-full" /></div>
                </div>

                <div>
                  <div className="mt-6 flex items-baseline gap-4">
                    <div className="text-5xl font-bold"><Skeleton className="w-24 h-12 rounded-md" /></div>
                    <div className="text-sm text-[--text-muted]"><Skeleton className="w-20 h-4 rounded-md" /></div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <div className="stat-chip flex items-center gap-2"><Skeleton className="w-16 h-6 rounded-md" /></div>
                    <div className="stat-chip flex items-center gap-2"><Skeleton className="w-16 h-6 rounded-md" /></div>
                  </div>
                </div>
              </div>
            ))
          )}
          {favorites.length === 0 && hydrated && (
            <div className="space-y-3">
              <div className="text-[--text-muted]">No favorites yet. Add cities to pin them here.</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {['New Delhi', 'Mumbai', 'Bengaluru'].map((c: string) => (
                  <div key={c} className="card p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{c}</div>
                      <div className="text-[--text-muted] text-sm">Suggested</div>
                    </div>
                    <div>
                      <button
                        onClick={() => dispatch(addFavorite(c))}
                        className="px-3 py-1 rounded-lg bg-[--accent-blue] text-white"
                      >
                        Pin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {hydrated && favorites.map((name: string) => {
            const w = cities[name];
            return (
              <FavoriteCityCard
                key={name}
                city={name}
                region={w?.sys?.country}
                temp={w?.temp ?? 0}
                condition={w?.condition ?? 'Clouds'}
                humidity={w?.humidity}
                wind={w?.wind ? `${w.wind.speed} m/s` : undefined}
                night={false}
              />
            );
          })}
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Location">
        <AddLocationCard initialOpen={true} onDone={() => setModalOpen(false)} />
      </Modal>
    </section>
  );
}
