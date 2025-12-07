import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { MetricsCard } from './MetricsCard';
import { WebVitalsChart } from './WebVitalsChart';
import { ErrorsChart } from './ErrorsChart';
import { SessionsTable } from './SessionsTable';
import { PageSpeedTable } from './PageSpeedTable';
import { LoadingSpinner } from './LoadingSpinner';
import { Header } from './Header';

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState(3600000); // 1 hour
  const { webVitals, errors, pageViews, pageSpeedStats, stats, loading, error, lastUpdate } = useRUMData(timeRange);

  const calculateMetrics = () => {
    if (webVitals.length === 0) {
      return {
        avgLCP: 0,
        avgCLS: 0,
        avgFCP: 0,
        avgINP: 0,
        errorCount: 0,
        sessionCount: 0,
        pageViewCount: 0,
        avgPageLoadTime: 0,
      };
    }

    const lcpValues = webVitals.filter(v => v.metricName === 'LCP').map(v => v.value);
    const clsValues = webVitals.filter(v => v.metricName === 'CLS').map(v => v.value);
    const fcpValues = webVitals.filter(v => v.metricName === 'FCP').map(v => v.value);
    const inpValues = webVitals.filter(v => v.metricName === 'INP').map(v => v.value);
    const sessions = new Set(webVitals.map(v => v.sessionId));

    return {
      avgLCP: lcpValues.length > 0 ? lcpValues.reduce((a, b) => a + b, 0) / lcpValues.length : 0,
      avgCLS: clsValues.length > 0 ? clsValues.reduce((a, b) => a + b, 0) / clsValues.length : 0,
      avgFCP: fcpValues.length > 0 ? fcpValues.reduce((a, b) => a + b, 0) / fcpValues.length : 0,
      avgINP: inpValues.length > 0 ? inpValues.reduce((a, b) => a + b, 0) / inpValues.length : 0,
      errorCount: errors.length,
      sessionCount: stats.uniqueSessions || sessions.size,
      pageViewCount: stats.totalPageViews || pageViews.length,
      avgPageLoadTime: stats.avgPageLoadTime || 0,
      uniqueUsers: stats.uniqueUsers || 0,
    };
  };

  const metrics = calculateMetrics();

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-[var(--bg-secondary)] border border-red-500/30 rounded-lg p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-red-400 mb-4">Connection Error</h1>
            <p className="text-[var(--text-secondary)] mb-2">
              Unable to connect to backend: <span className="font-mono text-sm text-red-400">{error}</span>
            </p>
            <p className="text-[var(--text-tertiary)] mt-4 text-sm">
              Make sure your Spring Boot backend is running on <span className="font-mono bg-[var(--bg-tertiary)] px-2 py-1 rounded text-[var(--text-primary)]">http://localhost:8080</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header 
        title="Dashboard" 
        subtitle="Real User Monitoring Overview"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-6 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              <MetricsCard
                title="Sessions"
                value={metrics.sessionCount}
                unit=""
                status="good"
                icon="👥"
              />
              <MetricsCard
                title="Users"
                value={metrics.uniqueUsers}
                unit=""
                status="good"
                icon="👤"
              />
              <MetricsCard
                title="Page Views"
                value={metrics.pageViewCount}
                unit=""
                status="good"
                icon="📄"
              />
              <MetricsCard
                title="Avg LCP"
                value={metrics.avgLCP}
                unit="ms"
                status={metrics.avgLCP <= 2500 ? 'good' : metrics.avgLCP <= 4000 ? 'needs-improvement' : 'poor'}
                icon="⚡"
              />
              <MetricsCard
                title="Avg CLS"
                value={metrics.avgCLS}
                unit=""
                status={metrics.avgCLS <= 0.1 ? 'good' : metrics.avgCLS <= 0.25 ? 'needs-improvement' : 'poor'}
                icon="📐"
              />
              <MetricsCard
                title="Errors"
                value={metrics.errorCount}
                unit=""
                status={metrics.errorCount === 0 ? 'good' : 'poor'}
                icon="❌"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <WebVitalsChart data={webVitals} />
              <ErrorsChart data={errors} />
            </div>

            {/* Page Speed Table */}
            <div className="mb-6">
              <PageSpeedTable data={pageSpeedStats} />
            </div>

            {/* Sessions Table */}
            <SessionsTable webVitals={webVitals} errors={errors} />
          </>
        )}
      </div>
    </div>
  );
};
