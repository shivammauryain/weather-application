import React from 'react';

interface Props { title: string; value: React.ReactNode; subtitle?: string }

export default function StatCard({ title, value, subtitle }: Props) {
  return (
    <div className="card p-4 rounded-2xl">
      <div className="text-[--text-secondary] text-xs uppercase tracking-widest">{title}</div>
      <div className="text-2xl font-semibold mt-2">{value}</div>
      {subtitle ? <div className="text-[--text-muted] text-sm mt-1">{subtitle}</div> : null}
    </div>
  );
}
