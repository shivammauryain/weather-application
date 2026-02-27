import React from 'react';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <div className="card p-8 rounded-2xl text-center">
      <div className="mb-6">
        <div className="w-16 h-16 rounded-md bg-[--accent-blue] mx-auto mb-3 flex items-center justify-center">☁️</div>
        <h2 className="text-2xl font-bold">Welcome to WeatherLyte</h2>
        <p className="text-[--text-muted] mt-2">Sign in with Google to continue</p>
      </div>

      <div>
        <Button className="w-full">Sign in with Google</Button>
      </div>
    </div>
  );
}
