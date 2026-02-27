import React from 'react';

interface Props { className?: string }

export default function Skeleton({ className = '' }: Props) {
  return <div className={`animate-pulse bg-[rgba(255,255,255,0.03)] ${className}`} />;
}
