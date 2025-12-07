import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLiveMode } from '../contexts/LiveModeContext';

export const Header = ({ title, subtitle, timeRange, setTimeRange }) => {
  const { theme } = useTheme();
  const { isLive } = useLiveMode();

  const timeRangeOptions = [
    { label: '15 min', value: 900000 },
    { label: '1 hour', value: 3600000 },
    { label: '24 hours', value: 86400000 },
    { label: '7 days', value: 604800000 },
  ];

  return (
    <div className="bg-[#18181b] border-b border-[#2d2d33] sticky top-0 z-10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#d8d9da] flex items-center gap-3">
              {title}
              {isLive && (
                <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">LIVE</span>
                </div>
              )}
            </h1>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-[#1f1f23] p-1 rounded border border-[#2d2d33]">
              {timeRangeOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    timeRange === option.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-[#d8d9da] hover:bg-[#2d2d33]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
