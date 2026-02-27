import React from 'react';

interface Props { title: string; value: string; trend: string; positive?: boolean }

export default function GlobalStatCard({ title, value, trend, positive = true }: Props) {
  return (
    <div className="card p-4 rounded-2xl">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[--text-secondary] text-xs uppercase">{title}</div>
          <div className="text-2xl font-bold mt-2">{value} <span className="ml-2 text-sm">{trend}</span></div>
        </div>
        <div className="w-12 h-12 bg-[rgba(67,97,238,0.08)] rounded-md flex items-center justify-center">📈</div>
      </div>
    </div>
  );
}
