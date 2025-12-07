import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLiveMode } from '../contexts/LiveModeContext';
import { Header } from './Header';

export const SettingsView = () => {
  const { theme, toggleTheme } = useTheme();
  const { isLive, toggleLiveMode, refreshInterval, updateRefreshInterval } = useLiveMode();

  const refreshOptions = [
    { label: '5 seconds', value: 5000 },
    { label: '10 seconds', value: 10000 },
    { label: '30 seconds', value: 30000 },
    { label: '1 minute', value: 60000 },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Settings" subtitle="Configure dashboard preferences" />
      <div className="p-6 max-w-4xl">
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#d8d9da] mb-4">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#d8d9da] font-medium">Theme</p>
                <p className="text-xs text-gray-500 mt-1">Choose between light and dark mode</p>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-[#2d2d33] hover:bg-[#3d3d44] rounded-lg text-sm font-medium text-[#d8d9da] transition-colors flex items-center gap-2"
              >
                <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
                <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </div>

          {/* Live Mode Settings */}
          <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#d8d9da] mb-4">Live Updates</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#d8d9da] font-medium">Live Mode</p>
                  <p className="text-xs text-gray-500 mt-1">Automatically refresh data</p>
                </div>
                <button
                  onClick={toggleLiveMode}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    isLive
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-[#2d2d33] text-gray-400 hover:bg-[#3d3d44]'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                  <span>{isLive ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
              {isLive && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#d8d9da] font-medium">Refresh Interval</p>
                    <p className="text-xs text-gray-500 mt-1">How often to update data</p>
                  </div>
                  <select
                    value={refreshInterval}
                    onChange={(e) => updateRefreshInterval(Number(e.target.value))}
                    className="px-4 py-2 bg-[#2d2d33] border border-[#3d3d44] rounded-lg text-sm text-[#d8d9da] focus:outline-none focus:border-blue-500"
                  >
                    {refreshOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* API Settings */}
          <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#d8d9da] mb-4">API Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 block mb-1">API Base URL</label>
                <input
                  type="text"
                  defaultValue="http://localhost:8080/api/rum"
                  className="w-full px-4 py-2 bg-[#2d2d33] border border-[#3d3d44] rounded-lg text-sm text-[#d8d9da] focus:outline-none focus:border-blue-500"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Configure in apiService.js</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

