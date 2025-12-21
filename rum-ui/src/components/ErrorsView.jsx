import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { Header } from './Header';
import { ErrorsChart } from './ErrorsChart';
import { ErrorsTable } from './ErrorsTable';
import { MetricsCard } from './MetricsCard';
import { LoadingSpinner } from './LoadingSpinner';

export const ErrorsView = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const { errors, loading } = useRUMData(timeRange);

  const errorStats = {
    total: errors.length,
    byType: errors.reduce((acc, err) => {
      const type = err.errorType || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {}),
    critical: errors.filter(e => e.severity === 'critical').length,
    high: errors.filter(e => e.severity === 'high').length,
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Errors"
        subtitle="Error tracking and analysis"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricsCard
                title="Total Errors"
                value={errorStats.total}
                unit=""
                status={errorStats.total === 0 ? 'good' : 'poor'}
                iconSrc="/assets/icons/error.svg"
              />

              <MetricsCard
                title="Critical"
                value={errorStats.critical}
                unit=""
                status={errorStats.critical === 0 ? 'good' : 'poor'}
                iconSrc="/assets/icons/alert.svg"
              />

              <MetricsCard
                title="High Severity"
                value={errorStats.high}
                unit=""
                status={errorStats.high === 0 ? 'good' : 'needs-improvement'}
                iconSrc="/assets/icons/warning.svg"
              />

              <MetricsCard
                title="Error Types"
                value={Object.keys(errorStats.byType).length}
                unit=""
                status="good"
                iconSrc="/assets/icons/graph.svg"
              />
            </div>

            <div className="mb-6">
              <ErrorsChart data={errors} />
            </div>

            <ErrorsTable errors={errors} />
          </>
        )}
      </div>
    </div>
  );
};

