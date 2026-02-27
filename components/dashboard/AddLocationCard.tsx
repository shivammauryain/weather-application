"use client";

import React, { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addFavorite } from '@/store/slices/favoritesSlice';
import { fetchWeather } from '@/store/slices/weatherSlice';

interface Props {
  initialOpen?: boolean;
  onDone?: () => void;
}

export default function AddLocationCard({ initialOpen = false, onDone }: Props) {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function doSearch() {
    if (!q) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setResults(json || []);
    } catch (e) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handlePin(name: string, lat?: number, lon?: number) {
    dispatch(addFavorite(name));
    if (lat && lon) dispatch(fetchWeather(name));
    setOpen(false);
    setQ('');
    setResults([]);
    onDone?.();
  }

  return (
    <div className="dashed-add p-4 rounded-2xl bg-gray-950">
      {!open ? (
        <div className="flex items-center justify-center bg-gray-950 h-full">
          <button onClick={() => setOpen(true)} className="text-[--accent-blue] font-semibold">+ Add Location</button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2 mb-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search city (India-biased)"
              className="flex-1 px-3 py-2 rounded-lg bg-[--card-bg] border border-[--border]"
            />
            <button onClick={doSearch} className="px-3 py-2 rounded-lg bg-[--accent-blue] text-white">Search</button>
          </div>
          <div className="max-h-48 overflow-auto">
            {loading && <div className="text-[--text-muted]">Searching…</div>}
            {!loading && results.length === 0 && <div className="text-[--text-muted]">No results</div>}
            {results.map((r: any) => (
              <div key={`${r.lat}-${r.lon}-${r.name}`} className="flex items-center justify-between p-2 hover:bg-[rgba(255,255,255,0.02)] rounded">
                <div>
                  <div className="font-medium">{r.name}{r.state ? `, ${r.state}` : ''}</div>
                  <div className="text-[--text-muted] text-sm">{r.country}</div>
                </div>
                <div>
                  <button onClick={() => handlePin(r.name, r.lat, r.lon)} className="px-2 py-1 rounded bg-[--accent-blue] text-white">Pin</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-right">
            <button onClick={() => setOpen(false)} className="text-[--text-muted] text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
