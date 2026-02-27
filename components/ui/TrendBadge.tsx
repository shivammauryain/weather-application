import React from 'react';

interface Props { value: string; positive?: boolean }

export default function TrendBadge({ value, positive = true }: Props) {
  const bg = positive ? 'bg-[--accent-green]/[.12] text-[--accent-green]' : 'bg-[--accent-red]/[.12] text-[--accent-red]';
  return (
    <span className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded ${bg}`}>{value}</span>
  );
}
