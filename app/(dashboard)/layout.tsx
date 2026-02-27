import React from 'react';
import Navbar from '@/components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Navbar />
      <main className="max-content py-6">{children}</main>
    </div>
  );
}
