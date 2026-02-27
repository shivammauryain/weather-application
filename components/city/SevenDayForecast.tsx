import React from 'react';

const days = ['Today', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function SevenDayForecast() {
  return (
    <div className="card p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">7-Day Forecast</h4>
        <a className="text-[--accent-cyan] text-sm">See Full Calendar →</a>
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {days.map((d, idx) => (
          <div key={d} className={`min-w-[96px] p-3 rounded-xl ${idx === 0 ? 'border border-[--accent-blue]' : ''}`}>
            <div className="text-sm">{d}</div>
            <div className="mt-2">☀️</div>
            <div className="text-lg font-semibold">{15 + idx}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
