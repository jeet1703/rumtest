import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { MetricsCard } from './MetricsCard';
import { WebVitalsChart } from './WebVitalsChart';
import { ErrorsChart } from './ErrorsChart';
import { SessionsTable } from './SessionsTable';
import { LoadingSpinner } from './LoadingSpinner';
import { 
  Zap, 
  Layout, 
  AlertCircle, 
  Users, 
  Activity,
  RefreshCw,
  Clock
} from 'lucide-react';

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState(3600000); // 1 hour
  const { webVitals, errors, loading, error } = useRUMData(timeRange);

  const calculateMetrics = () => {
    if (webVitals.length === 0) {
      return {
        avgLCP: 0,
        avgCLS: 0,
        avgFCP: 0,
        avgINP: 0,
        errorCount: 0,
        sessionCount: 0,
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
      sessionCount: sessions.size,
    };
  };

  const metrics = calculateMetrics();

  const timeRangeOptions = [
    { label: '15 min', value: 900000, icon: Clock },
    { label: '1 hour', value: 3600000, icon: Clock },
    { label: '24 hours', value: 86400000, icon: Clock },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full card border-red-300">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-red-900">Connection Error</h1>
          </div>
          <p className="text-red-700 mb-2">
            Unable to connect to backend: <code className="bg-red-100 px-2 py-1 rounded">{error}</code>
          </p>
          <p className="text-red-600 text-sm">
            Make sure your Spring Boot backend is running on <strong>http://localhost:8080</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RUM Dashboard</h1>
                <p className="text-xs text-gray-500">Real User Monitoring Analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
              <span className="text-sm text-gray-500">Auto-refreshing</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Time Range</span>
          </div>
          <div className="flex gap-2">
            {timeRangeOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    timeRange === option.value
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricsCard
                title="Largest Contentful Paint"
                value={metrics.avgLCP}
                unit="ms"
                status={metrics.avgLCP <= 2500 ? 'good' : metrics.avgLCP <= 4000 ? 'needs-improvement' : 'poor'}
                icon={<Zap className="w-5 h-5" />}
                subtitle="Target: < 2.5s"
              />
              <MetricsCard
                title="Cumulative Layout Shift"
                value={metrics.avgCLS}
                unit=""
                status={metrics.avgCLS <= 0.1 ? 'good' : metrics.avgCLS <= 0.25 ? 'needs-improvement' : 'poor'}
                icon={<Layout className="w-5 h-5" />}
                subtitle="Target: < 0.1"
              />
              <MetricsCard
                title="Total Errors"
                value={metrics.errorCount}
                unit="errors"
                status={metrics.errorCount === 0 ? 'good' : 'poor'}
                icon={<AlertCircle className="w-5 h-5" />}
                subtitle={metrics.errorCount === 0 ? 'No errors detected' : 'Action required'}
              />
              <MetricsCard
                title="Active Sessions"
                value={metrics.sessionCount}
                unit="sessions"
                icon={<Users className="w-5 h-5" />}
                subtitle={`${webVitals.length} total events`}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <WebVitalsChart data={webVitals} />
              <ErrorsChart data={errors} />
            </div>

            {/* Sessions Table */}
            <SessionsTable webVitals={webVitals} errors={errors} />
          </>
        )}
      </main>
    </div>
  );
};

