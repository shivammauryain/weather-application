import React from 'react';
import PinnedFavoritesSection from '@/components/dashboard/PinnedFavoritesSection';
import AllTrackedLocations from '@/components/dashboard/AllTrackedLocations';
import GlobalTrendsChart from '@/components/dashboard/GlobalTrendsChart';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default function DashboardPage() {
  return (
    <DashboardClient>
      <div className="space-y-8">
        <PinnedFavoritesSection />

        <AllTrackedLocations />

        <section>
          <h3 className="text-lg font-semibold mb-4">Global Trends</h3>
          <GlobalTrendsChart />
        </section>
      </div>
    </DashboardClient>
  );
}
