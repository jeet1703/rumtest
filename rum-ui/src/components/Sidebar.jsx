import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLiveMode } from '../contexts/LiveModeContext';

export const Sidebar = ({ activeView, setActiveView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLive, toggleLiveMode } = useLiveMode();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard.svg' },
    { id: 'webvitals', label: 'Web Vitals', icon: 'health.svg' },
    { id: 'errors', label: 'Errors', icon: 'error.svg' },
    { id: 'pagespeed', label: 'Page Speed', icon: 'speed.svg' },
    { id: 'sessions', label: 'Sessions', icon: 'users.svg' },
    { id: 'analytics', label: 'Analytics', icon: 'graph.svg' },
    { id: 'comparison', label: 'Comparison', icon: 'search.svg' },
    { id: 'settings', label: 'Settings', icon: 'settings.svg' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#18181b] border-r border-[#2d2d33] transition-all duration-300 z-50 ${isCollapsed ? 'w-16' : 'w-64'
      }`}>
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#2d2d33]">
        {!isCollapsed && (
          <div className="flex items-center gap-2 flex-1">
            {/* <img
              src="/logo.png"
              alt="SEM Vitals"
              className="h-full w-full  object-contain"
            /> */}
            <p className='text-center text-2xl'>SEM<span className="text-[#00aafe] font-bold text-center ">Vitals</span></p>
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center flex-1">
            <img
              src="/logo.png"
              alt="SEM Vitals"
              className="h-8 w-8 object-contain"
            />
          </div>
        )}
          {/* <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded hover:bg-[#2d2d33] text-gray-400 hover:text-[#d8d9da] transition-colors ml-2"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <img 
              src={isCollapsed ? '/assets/icons/hamburg.svg' : '/assets/icons/chevron-left'} 
              alt={isCollapsed ? 'Expand' : 'Collapse'} 
              className="w-5 h-5" 
            />
          </button> */}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeView === item.id
                ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-500'
                : 'text-gray-400 hover:bg-[#2d2d33] hover:text-[#d8d9da]'
              }`}
            title={isCollapsed ? item.label : ''}
          >
            <img 
              src={`/assets/icons/${item.icon}`} 
              alt={item.label} 
              className="w-10 h-10 flex-shrink-0" 
            />
            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className="border-t border-[#2d2d33] p-4 space-y-2">
        {/* Live Mode Toggle */}
        <button
          onClick={toggleLiveMode}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${isLive
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-[#2d2d33] text-gray-400 hover:bg-[#3d3d44]'
            }`}
          title={isCollapsed ? (isLive ? 'Live Mode On' : 'Live Mode Off') : ''}
        >
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-blue-400 animate-pulse' : 'bg-gray-500'}`}></div>
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {isLive ? 'Live Mode' : 'Paused'}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        {/* <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#2d2d33] text-gray-400 hover:bg-[#3d3d44] hover:text-[#d8d9da] transition-colors"
          title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : ''}
        >
          <img 
            src={theme === 'dark' ? '/assets/icons/sun.svg' : '/assets/icons/moon.svg'} 
            alt={theme === 'dark' ? 'Light Mode' : 'Dark Mode'} 
            className="w-5 h-5" 
          />
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button> */}
      </div>
    </div>
  );
};

