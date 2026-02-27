import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export default function Button({ variant = 'solid', className = '', children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium';
  const styles = variant === 'solid' ? 'bg-[--accent-blue] text-white' : 'border border-[--border] text-[--text-primary] bg-transparent';
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
