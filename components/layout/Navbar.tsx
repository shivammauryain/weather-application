"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FiBell, FiUser } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className="nav-bar flex items-center px-6">
      <div className="max-content flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[--accent-blue] flex items-center justify-center">☁️</div>
            <span className="text-white text-2xl font-bold">WeatherLyte</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button aria-label="notifications" className="p-2 rounded-md bg-transparent text-[--text-secondary]"><FiBell /></button>
          <button aria-label="profile" className="p-2 rounded-md bg-transparent text-[--text-secondary]"><FiUser /></button>
        </div>
      </div>
    </header>
  );
}
