import React from 'react';

interface Props { children: React.ReactNode; className?: string }

export default function Badge({ children, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
      {children}
    </span>
  );
}
