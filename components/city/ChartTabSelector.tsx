"use client";

import React from 'react';

export default function ChartTabSelector() {
  return (
    <div className="inline-flex bg-[rgba(255,255,255,0.03)] p-1 rounded-full">
      <button className="px-3 py-1 rounded-full bg-[--accent-blue] text-white">Temp</button>
      <button className="px-3 py-1 rounded-full ml-2 text-[--text-secondary]">Rain</button>
      <button className="px-3 py-1 rounded-full ml-2 text-[--text-secondary]">Wind</button>
    </div>
  );
}
