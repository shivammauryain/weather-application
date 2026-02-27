"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const MapLeaflet = dynamic(() => import('./MapLeaflet'), { ssr: false, loading: () => <div className="h-40 bg-[rgba(255,255,255,0.02)] rounded-md flex items-center justify-center text-[--text-muted]">Loading map…</div> });

export default function LiveMapCard() {
  return (
    <div className="card p-4 rounded-2xl">
      <div className="text-sm text-[--text-muted] mb-2">Live Radar</div>
      <MapLeaflet />
    </div>
  );
}
