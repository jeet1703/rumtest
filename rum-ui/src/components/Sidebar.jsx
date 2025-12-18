import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLiveMode } from '../contexts/LiveModeContext';

export const Sidebar = ({ activeView, setActiveView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLive, toggleLiveMode } = useLiveMode();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'webvitals', label: 'Web Vitals', icon: '⚡' },
    { id: 'errors', label: 'Errors', icon: '❌' },
    { id: 'pagespeed', label: 'Page Speed', icon: '🚀' },
    { id: 'sessions', label: 'Sessions', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'comparison', label: 'Comparison', icon: '🔍' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#18181b] border-r border-[#2d2d33] transition-all duration-300 z-50 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#2d2d33]">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="text-lg font-semibold text-[#d8d9da]">RUM</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded hover:bg-[#2d2d33] text-gray-400 hover:text-[#d8d9da] transition-colors"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
              activeView === item.id
                ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500'
                : 'text-gray-400 hover:bg-[#2d2d33] hover:text-[#d8d9da]'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className="border-t border-[#2d2d33] p-4 space-y-2">
        {/* Live Mode Toggle */}
        <button
          onClick={toggleLiveMode}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
            isLive
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-[#2d2d33] text-gray-400 hover:bg-[#3d3d44]'
          }`}
          title={isCollapsed ? (isLive ? 'Live Mode On' : 'Live Mode Off') : ''}
        >
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {isLive ? 'Live Mode' : 'Paused'}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#2d2d33] text-gray-400 hover:bg-[#3d3d44] hover:text-[#d8d9da] transition-colors"
          title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : ''}
        >
          <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

