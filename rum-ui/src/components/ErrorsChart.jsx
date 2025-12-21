import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f1f23] p-3 rounded border border-[#2d2d33] shadow-xl">
        <p className="font-semibold text-[#d8d9da] mb-2 text-sm">
          {payload[0].payload.type}
        </p>
        <p className="text-xs text-red-400">
          <span className="font-medium">Count:</span> {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export const ErrorsChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const grouped = {};

    data.forEach(item => {
      const key = item.errorType || 'Unknown';
      if (!grouped[key]) {
        grouped[key] = { type: key, count: 0 };
      }
      grouped[key].count += 1;
    });

    return Object.values(grouped).sort((a, b) => b.count - a.count);
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-8">
        <div className="text-center py-12">
          <img src="/assets/icons/checkmark.svg" alt="No errors" className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <p className="text-gray-400 text-sm">No errors recorded</p>
          <p className="text-gray-500 text-xs mt-2">
            Great! Your application is error-free
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#18181b]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#d8d9da] flex items-center gap-2">
              <img src="/assets/icons/error.svg" alt="Errors" className="w-5 h-5" />
              Errors by Type
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Error distribution and frequency
            </p>
          </div>
          <div className="bg-red-500/10 text-red-400 px-3 py-1 rounded text-xs font-semibold border border-red-500/30">
            {data.length} Total
          </div>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d33" />
            <XAxis
              dataKey="type"
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              tick={{ fill: '#9ca3af' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              tick={{ fill: '#9ca3af' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#9ca3af' }} />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
