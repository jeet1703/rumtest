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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f1f23] p-3 rounded border border-[#2d2d33] shadow-xl">
        <p className="font-semibold text-[#d8d9da] mb-2 text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            <span className="font-medium">{entry.name}:</span> {entry.value?.toFixed(2)}
            {entry.name === 'LCP' || entry.name === 'FCP' || entry.name === 'INP' ? ' ms' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const WebVitalsChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const grouped = {};

    data.forEach(item => {
      const timestamp = new Date(item.eventTimestamp).getTime();
      if (!grouped[timestamp]) {
        grouped[timestamp] = {
          time: format(new Date(item.eventTimestamp), 'HH:mm:ss'),
          timestamp,
        };
      }
      grouped[timestamp][item.metricName] = item.value;
    });

    return Object.values(grouped)
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-30); // Last 30 data points
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-8">
        <div className="text-center py-12">
          <img src="/assets/icons/graph.svg" alt="Chart" className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400 text-sm">No web vitals data available</p>
          <p className="text-gray-500 text-xs mt-2">Data will appear here once events are received</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#18181b]">
        <h2 className="text-lg font-semibold text-[#d8d9da] flex items-center gap-2">
          <img src="/assets/icons/chart-line.svg" alt="Chart" className="w-5 h-5" />
          Web Vitals Over Time
        </h2>
        <p className="text-xs text-gray-500 mt-1">Core Web Vitals performance metrics</p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d33" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              tick={{ fill: '#9ca3af' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              tick={{ fill: '#9ca3af' }}
            />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px', color: '#9ca3af' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="LCP" 
            stroke="#6366f1" 
            strokeWidth={3}
            dot={{ fill: '#6366f1', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false} 
          />
          <Line 
            type="monotone" 
            dataKey="FCP" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false} 
          />
          <Line 
            type="monotone" 
            dataKey="INP" 
            stroke="#f59e0b" 
            strokeWidth={3}
            dot={{ fill: '#f59e0b', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false} 
          />
          <Line 
            type="monotone" 
            dataKey="CLS" 
            stroke="#ef4444" 
            strokeWidth={3}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false} 
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

