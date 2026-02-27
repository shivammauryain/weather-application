import React from 'react';

const regions = [
  { name: 'North America', temp: 18.4, color: '#4361EE' },
  { name: 'Europe', temp: 14.2, color: '#10B981' },
  { name: 'Asia Pacific', temp: 22.1, color: '#F97316' },
  { name: 'South America', temp: 24.5, color: '#F43F5E' },
  { name: 'Australia', temp: 19.8, color: '#A78BFA' },
];

export default function RegionalDistribution() {
  return (
    <div className="card p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Regional Temp. Distribution</h4>
        <a className="text-[--accent-cyan] text-sm">View Report</a>
      </div>
      <div className="space-y-3">
        {regions.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <div className="w-36 text-sm text-[--text-muted]">{r.name}</div>
            <div className="flex-1 bg-[rgba(255,255,255,0.03)] rounded h-2 relative overflow-hidden">
              <div style={{ width: `${(r.temp / 30) * 100}%`, background: r.color, height: '100%' }} />
            </div>
            <div className="w-12 text-right">{r.temp}°C</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-[--text-muted] text-sm">
        <div>Avg deviation: ±2.3°C</div>
        <div>Updated 5 mins ago</div>
      </div>
    </div>
  );
}
