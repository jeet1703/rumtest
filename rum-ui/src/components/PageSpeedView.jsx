import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { Header } from './Header';
import { PageSpeedTable } from './PageSpeedTable';
import { MetricsCard } from './MetricsCard';
import { LoadingSpinner } from './LoadingSpinner';

export const PageSpeedView = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const { pageSpeedStats, stats, loading } = useRUMData(timeRange);

  const avgLoadTime = stats.avgPageLoadTime || 0;
  const totalPages = pageSpeedStats.length;
  const totalViews = pageSpeedStats.reduce((sum, page) => sum + (page.viewCount || 0), 0);

  return (
    <div className="min-h-screen">
      <Header 
        title="Page Speed" 
        subtitle="Page load performance by URL"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricsCard
                title="Avg Load Time"
                value={avgLoadTime}
                unit="ms"
                status={avgLoadTime < 1000 ? 'good' : avgLoadTime < 3000 ? 'needs-improvement' : 'poor'}
                iconSrc="/assets/icons/lightning.svg"
              />
              <MetricsCard
                title="Total Pages"
                value={totalPages}
                unit=""
                status="good"
                iconSrc="/assets/icons/document.svg"
              />
              <MetricsCard
                title="Total Views"
                value={totalViews}
                unit=""
                status="good"
                iconSrc="/assets/icons/eye.svg"
              />
            </div>
            <PageSpeedTable data={pageSpeedStats} />
          </>
        )}
      </div>
    </div>
  );
};

