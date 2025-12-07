import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { Header } from './Header';
import { WebVitalsChart } from './WebVitalsChart';
import { MetricsCard } from './MetricsCard';
import { LoadingSpinner } from './LoadingSpinner';

export const WebVitalsView = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const { webVitals, loading } = useRUMData(timeRange);

  const calculateMetrics = () => {
    if (webVitals.length === 0) {
      return {
        avgLCP: 0,
        avgCLS: 0,
        avgFCP: 0,
        avgINP: 0,
        avgTTFB: 0,
      };
    }

    const lcpValues = webVitals.filter(v => v.metricName === 'LCP').map(v => v.value);
    const clsValues = webVitals.filter(v => v.metricName === 'CLS').map(v => v.value);
    const fcpValues = webVitals.filter(v => v.metricName === 'FCP').map(v => v.value);
    const inpValues = webVitals.filter(v => v.metricName === 'INP').map(v => v.value);
    const ttfbValues = webVitals.filter(v => v.metricName === 'TTFB').map(v => v.value);

    return {
      avgLCP: lcpValues.length > 0 ? lcpValues.reduce((a, b) => a + b, 0) / lcpValues.length : 0,
      avgCLS: clsValues.length > 0 ? clsValues.reduce((a, b) => a + b, 0) / clsValues.length : 0,
      avgFCP: fcpValues.length > 0 ? fcpValues.reduce((a, b) => a + b, 0) / fcpValues.length : 0,
      avgINP: inpValues.length > 0 ? inpValues.reduce((a, b) => a + b, 0) / inpValues.length : 0,
      avgTTFB: ttfbValues.length > 0 ? ttfbValues.reduce((a, b) => a + b, 0) / ttfbValues.length : 0,
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen">
      <Header 
        title="Web Vitals" 
        subtitle="Core Web Vitals performance metrics"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <MetricsCard
                title="LCP"
                value={metrics.avgLCP}
                unit="ms"
                status={metrics.avgLCP <= 2500 ? 'good' : metrics.avgLCP <= 4000 ? 'needs-improvement' : 'poor'}
                icon="⚡"
              />
              <MetricsCard
                title="FCP"
                value={metrics.avgFCP}
                unit="ms"
                status={metrics.avgFCP <= 1800 ? 'good' : metrics.avgFCP <= 3000 ? 'needs-improvement' : 'poor'}
                icon="🎯"
              />
              <MetricsCard
                title="INP"
                value={metrics.avgINP}
                unit="ms"
                status={metrics.avgINP <= 200 ? 'good' : metrics.avgINP <= 500 ? 'needs-improvement' : 'poor'}
                icon="👆"
              />
              <MetricsCard
                title="CLS"
                value={metrics.avgCLS}
                unit=""
                status={metrics.avgCLS <= 0.1 ? 'good' : metrics.avgCLS <= 0.25 ? 'needs-improvement' : 'poor'}
                icon="📐"
              />
              <MetricsCard
                title="TTFB"
                value={metrics.avgTTFB}
                unit="ms"
                status={metrics.avgTTFB <= 800 ? 'good' : metrics.avgTTFB <= 1800 ? 'needs-improvement' : 'poor'}
                icon="🌐"
              />
            </div>
            <WebVitalsChart data={webVitals} />
          </>
        )}
      </div>
    </div>
  );
};

