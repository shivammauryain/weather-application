"use client";

import React from 'react';

const ranges = ['24H', '7D', '30D', '1Y'];

export default function TimeRangeSelector() {
  return (
    <div className="inline-flex gap-2 bg-[rgba(255,255,255,0.02)] p-1 rounded-full">
      {ranges.map((r) => (
        <button key={r} className={`px-3 py-1 rounded-full ${r === '7D' ? 'bg-white text-black' : 'text-[--text-secondary]'}`}>{r}</button>
      ))}
    </div>
  );
}
