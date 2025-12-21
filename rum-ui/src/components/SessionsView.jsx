import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { Header } from './Header';
import { SessionsTable } from './SessionsTable';
import { MetricsCard } from './MetricsCard';
import { LoadingSpinner } from './LoadingSpinner';

export const SessionsView = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const { webVitals, errors, stats, loading } = useRUMData(timeRange);

  const sessions = new Set(webVitals.map(v => v.sessionId));
  const uniqueUsers = stats.uniqueUsers || 0;

  return (
    <div className="min-h-screen">
      <Header 
        title="User Sessions" 
        subtitle="Active user sessions and activity"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <MetricsCard
                title="Active Sessions"
                value={sessions.size}
                unit=""
                status="good"
                iconSrc="/assets/icons/users.svg"
              />
              <MetricsCard
                title="Unique Users"
                value={uniqueUsers}
                unit=""
                status="good"
                iconSrc="/assets/icons/user.svg"
              />
              <MetricsCard
                title="Total Events"
                value={webVitals.length + errors.length}
                unit=""
                status="good"
                iconSrc="/assets/icons/graph.svg"
              />
            </div>
            <SessionsTable webVitals={webVitals} errors={errors} />
          </>
        )}
      </div>
    </div>
  );
};

