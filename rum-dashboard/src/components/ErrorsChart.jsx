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
import { AlertTriangle } from 'lucide-react';

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16'];

export const ErrorsChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const grouped = {};

    data.forEach(item => {
      const key = item.errorType || 'unknown';
      if (!grouped[key]) {
        grouped[key] = { type: key, count: 0 };
      }
      grouped[key].count += 1;
    });

    return Object.values(grouped)
      .sort((a, b) => b.count - a.count)
      .map((item, index) => ({
        ...item,
        type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
        color: COLORS[index % COLORS.length]
      }));
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Errors by Type</h2>
        </div>
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No errors recorded</p>
          <p className="text-sm mt-2">Great! Your application is error-free</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h2 className="text-xl font-bold text-gray-900">Errors by Type</h2>
        <span className="ml-auto px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
          {data.length} total
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="type" 
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
          <Legend />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

