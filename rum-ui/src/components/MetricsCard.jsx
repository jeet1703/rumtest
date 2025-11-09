import React from 'react';

export const MetricsCard = ({ 
  title, 
  value, 
  unit = '', 
  status = 'good', 
  icon = '📊' 
}) => {
  const statusColors = {
    good: 'bg-green-100 text-green-800',
    'needs-improvement': 'bg-yellow-100 text-yellow-800',
    poor: 'bg-red-100 text-red-800',
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${statusColors[status] || statusColors.good}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {typeof value === 'number' ? value.toFixed(2) : value}
            <span className="text-lg ml-1">{unit}</span>
          </p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
};

