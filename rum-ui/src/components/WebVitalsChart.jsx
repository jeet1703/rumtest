import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

export const WebVitalsChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const grouped = {};

    data.forEach(item => {
      const timestamp = new Date(item.eventTimestamp).getTime();
      const timeKey = Math.floor(timestamp / 60000) * 60000; // Group by minute
      
      if (!grouped[timeKey]) {
        grouped[timeKey] = {
          time: format(new Date(timeKey), 'HH:mm'),
          timestamp: timeKey,
        };
      }
      
      // Store the value for this metric
      if (item.metricName) {
        grouped[timeKey][item.metricName] = item.value;
      }
    });

    return Object.values(grouped)
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-30); // Last 30 data points
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">📈 Web Vitals Over Time</h2>
        <div className="text-center text-gray-500 py-8">No web vitals data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">📈 Web Vitals Over Time</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="LCP" stroke="#8884d8" isAnimationActive={false} strokeWidth={2} />
          <Line type="monotone" dataKey="FCP" stroke="#82ca9d" isAnimationActive={false} strokeWidth={2} />
          <Line type="monotone" dataKey="INP" stroke="#ffc658" isAnimationActive={false} strokeWidth={2} />
          <Line type="monotone" dataKey="CLS" stroke="#ff7c7c" isAnimationActive={false} strokeWidth={2} />
          <Line type="monotone" dataKey="TTFB" stroke="#8dd1e1" isAnimationActive={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

