"use client";

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import TrackedCityCard from './TrackedCityCard';
import Modal from '@/components/ui/Modal';
import AddLocationCard from './AddLocationCard';

export default function AllTrackedLocations() {
  const favorites = useAppSelector((s) => s.favorites.cities);
  const cities = useAppSelector((s) => s.weather.cities);

  // tracked history: city names we have weather for
  const tracked = Object.keys(cities || {});

  const [open, setOpen] = useState(false);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">All Tracked Locations</h3>
        <div className="text-[--text-muted]">{/* grid/list toggle */}</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {tracked.length === 0 && (
          <div className="col-span-full text-[--text-muted]">No tracked locations yet — add one.</div>
        )}
        {tracked.map((name) => {
          const w = cities[name];
          return (
            <TrackedCityCard key={name} city={name} temp={w?.temp ?? 0} condition={w?.condition ?? 'Clouds'} showUnpin={false} />
          );
        })}

        <div className="dashed-add p-4 rounded-2xl flex items-center justify-center">
          <button onClick={() => setOpen(true)} className="text-[--accent-blue] font-semibold">+ Add Location</button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Location">
        <AddLocationCard initialOpen={true} onDone={() => setOpen(false)} />
      </Modal>
    </section>
  );
}
