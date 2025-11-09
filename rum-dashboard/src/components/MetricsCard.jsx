import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const MetricsCard = ({ 
  title, 
  value, 
  unit = '', 
  status = 'good', 
  icon,
  trend,
  subtitle
}) => {
  const statusClasses = {
    good: 'metric-good text-green-800',
    'needs-improvement': 'metric-warning text-yellow-800',
    poor: 'metric-poor text-red-800',
  };

  const getTrendIcon = () => {
    if (trend === undefined) return null;
    if (trend > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <div className={`card border-2 ${statusClasses[status] || statusClasses.good} transition-all hover:shadow-lg hover:scale-[1.02]`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-2xl">{icon}</div>}
          <h3 className="text-sm font-semibold opacity-80 uppercase tracking-wide">
            {title}
          </h3>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend > 0 ? 'text-red-600' : trend < 0 ? 'text-green-600' : 'text-gray-600'
          }`}>
            {getTrendIcon()}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <p className="text-4xl font-bold">
          {typeof value === 'number' ? value.toFixed(2) : value}
          {unit && <span className="text-xl ml-2 font-normal opacity-70">{unit}</span>}
        </p>
      </div>
      
      {subtitle && (
        <p className="text-xs opacity-60 mt-2">{subtitle}</p>
      )}
      
      <div className="mt-4 pt-4 border-t border-current border-opacity-20">
        <div className="flex items-center justify-between text-xs">
          <span className="opacity-70">Status</span>
          <span className="font-semibold capitalize">
            {status === 'needs-improvement' ? 'Needs Improvement' : status}
          </span>
        </div>
      </div>
    </div>
  );
};

