import React from 'react';

export const MetricsCard = ({
  title,
  value,
  unit = '',
  status = 'good',
  iconSrc = null,   // <-- SVG / image path
  trend = null
}) => {
  const statusConfig = {
    good: {
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      bg: 'bg-blue-500/5',
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
    <div
      className={`relative bg-[var(--bg-secondary)] border border-[var(--border-color)]
      ${config.border} rounded-xl p-5 hover:border-opacity-70 transition-all duration-300 
      shadow-lg hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-[var(--text-tertiary)] mb-2 uppercase tracking-wide">
            {title}
          </p>

          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${config.text}`}>
              {typeof value === 'number'
                ? value.toFixed(value < 1 ? 2 : 0)
                : value}
            </p>

            {unit && (
              <span className="text-sm font-medium text-[var(--text-tertiary)]">
                {unit}
              </span>
            )}
          </div>

          {trend !== null && (
            <p className={`text-xs mt-2 ${config.text} opacity-70 flex items-center gap-1`}>
              <img 
                src={trend > 0 ? "/assets/icons/arrow-up.svg" : "/assets/icons/arrow-down.svg"} 
                alt={trend > 0 ? "Up" : "Down"} 
                className="w-3 h-3 inline"
              />
              {Math.abs(trend)}%
            </p>
          )}
        </div>

        {/* ICON */}
        {iconSrc && (
          <div className={`${config.bg} p-2 rounded`}>
            <img
              src={iconSrc}
              alt={title}
              className="w-6 h-6 object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};
