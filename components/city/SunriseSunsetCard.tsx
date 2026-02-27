import React from 'react';

export default function SunriseSunsetCard({ sunrise = '06:42', sunset = '05:18' }: { sunrise?: string; sunset?: string }) {
  return (
    <div className="card p-4 rounded-2xl flex items-center justify-between">
      <div>
        <div className="text-[--text-secondary] text-xs">Sunrise</div>
        <div className="text-lg font-semibold">{sunrise} AM</div>
      </div>
      <div className="flex-1 mx-4">
        <div className="h-2 bg-[rgba(255,255,255,0.04)] rounded-full" />
      </div>
      <div className="text-right">
        <div className="text-[--text-secondary] text-xs">Sunset</div>
        <div className="text-lg font-semibold">{sunset} PM</div>
      </div>
    </div>
  );
}
