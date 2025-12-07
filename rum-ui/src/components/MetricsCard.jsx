import React from 'react';

export const MetricsCard = ({ 
  title, 
  value, 
  unit = '', 
  status = 'good', 
  icon = '📊',
  trend = null 
}) => {
  const statusConfig = {
    good: {
      border: 'border-green-500/30',
      text: 'text-green-400',
      bg: 'bg-green-500/5',
    },
    'needs-improvement': {
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      bg: 'bg-yellow-500/5',
    },
    poor: {
      border: 'border-red-500/30',
      text: 'text-red-400',
      bg: 'bg-red-500/5',
    },
  };

  const config = statusConfig[status] || statusConfig.good;

  return (
    <div className={`relative bg-[var(--bg-secondary)] border border-[var(--border-color)] ${config.border} rounded-lg p-4 hover:border-[var(--border-color)] hover:border-opacity-70 transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2 uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${config.text}`}>
              {typeof value === 'number' ? value.toFixed(value < 1 ? 2 : 0) : value}
            </p>
            {unit && (
              <span className="text-sm font-medium text-[var(--text-tertiary)] ml-1">{unit}</span>
            )}
          </div>
          {trend && (
            <p className={`text-xs mt-2 ${config.text} opacity-70`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
        <div className={`${config.bg} p-2 rounded text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

