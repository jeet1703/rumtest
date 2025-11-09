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
import { Activity } from 'lucide-react';

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
      
      if (item.metricName) {
        grouped[timeKey][item.metricName] = item.value;
      }
    });

    return Object.values(grouped)
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-30);
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Web Vitals Over Time</h2>
        </div>
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No web vitals data available</p>
          <p className="text-sm mt-2">Start monitoring to see metrics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">Web Vitals Over Time</h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="time" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Line 
            type="monotone" 
            dataKey="LCP" 
            stroke="#3b82f6" 
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            name="LCP (ms)"
          />
          <Line 
            type="monotone" 
            dataKey="FCP" 
            stroke="#10b981" 
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            name="FCP (ms)"
          />
          <Line 
            type="monotone" 
            dataKey="INP" 
            stroke="#f59e0b" 
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            name="INP (ms)"
          />
          <Line 
            type="monotone" 
            dataKey="CLS" 
            stroke="#ef4444" 
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            name="CLS"
          />
          <Line 
            type="monotone" 
            dataKey="TTFB" 
            stroke="#8b5cf6" 
            strokeWidth={2.5}
            dot={false}
            isAnimationActive={false}
            name="TTFB (ms)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

