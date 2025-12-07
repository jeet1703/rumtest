import React from 'react';

export const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-16">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#2d2d33] rounded-full"></div>
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
    </div>
    <p className="mt-6 text-base font-medium text-[#d8d9da]">Loading RUM data...</p>
    <p className="mt-2 text-xs text-gray-500">Fetching real-time metrics</p>
  </div>
);

