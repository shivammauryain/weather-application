"use client";

import React from 'react';
import useRealtime from '@/hooks/useRealtime';

interface Props {
  children: React.ReactNode;
}

export default function DashboardClient({ children }: Props) {
  useRealtime();
  return <>{children}</>;
}
