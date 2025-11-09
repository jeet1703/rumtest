import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { MetricsCard } from './MetricsCard';
import { WebVitalsChart } from './WebVitalsChart';
import { ErrorsChart } from './ErrorsChart';
import { SessionsTable } from './SessionsTable';
import { LoadingSpinner } from './LoadingSpinner';

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState(3600000); // 1 hour
  const { webVitals, errors, loading, error } = useRUMData(timeRange);

  const calculateMetrics = () => {
    if (webVitals.length === 0) {
      return {
        avgLCP: 0,
        avgCLS: 0,
        errorCount: 0,
        sessionCount: 0,
      };
    }

    const lcpValues = webVitals.filter(v => v.metricName === 'LCP').map(v => v.value);
    const clsValues = webVitals.filter(v => v.metricName === 'CLS').map(v => v.value);
    const sessions = new Set(webVitals.map(v => v.sessionId));

    return {
      avgLCP: lcpValues.length > 0 ? lcpValues.reduce((a, b) => a + b, 0) / lcpValues.length : 0,
      avgCLS: clsValues.length > 0 ? clsValues.reduce((a, b) => a + b, 0) / clsValues.length : 0,
      errorCount: errors.length,
      sessionCount: sessions.size,
    };
  };

  const metrics = calculateMetrics();

  const timeRangeOptions = [
    { label: '15 min', value: 900000 },
    { label: '1 hour', value: 3600000 },
    { label: '24 hours', value: 86400000 },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-red-800 mb-4">❌ Connection Error</h1>
          <p className="text-red-600">
            Unable to connect to backend: {error}
          </p>
          <p className="text-red-600 mt-2">
            Make sure your Spring Boot backend is running on http://localhost:8080
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">📊 RUM Dashboard</h1>
          <p className="text-gray-600 mt-2">Real User Monitoring Analytics</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {timeRangeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                timeRange === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                title="Error Count"
                value={metrics.errorCount}
                unit="errors"
                status={metrics.errorCount === 0 ? 'good' : 'poor'}
                icon="❌"
              />
              <MetricsCard
                title="Sessions"
                value={metrics.sessionCount}
                unit="active"
                icon="👥"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <WebVitalsChart data={webVitals} />
              <ErrorsChart data={errors} />
            </div>

            {/* Sessions Table */}
            <SessionsTable webVitals={webVitals} errors={errors} />
          </>
        )}
      </div>
    </div>
  );
};

