import React from 'react';
import { format } from 'date-fns';

export const PageSpeedTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-6">
        <div className="text-center py-12">
          <img src="/assets/icons/document.svg" alt="Document" className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400 text-sm">No page speed data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#18181b]">
        <h2 className="text-lg font-semibold text-[#d8d9da]">Page Load Speed</h2>
        <p className="text-xs text-gray-500 mt-1">Performance metrics by page URL</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#18181b] border-b border-[#2d2d33]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Page URL
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Avg Load (ms)
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Min (ms)
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Max (ms)
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2d33]">
            {data.map((page, index) => {
              const avgLoad = page.avgLoadTime || 0;
              const status = avgLoad < 1000 ? 'good' : avgLoad < 3000 ? 'warning' : 'poor';
              const statusColor = {
                good: 'text-blue-400 bg-blue-400/10',
                warning: 'text-yellow-400 bg-yellow-400/10',
                poor: 'text-red-400 bg-red-400/10',
              };

              return (
                <tr key={index} className="hover:bg-[#18181b] transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#d8d9da] truncate max-w-md" title={page.pageUrl}>
                      {page.pageUrl}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#2d2d33] text-[#d8d9da]">
                      {page.viewCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-sm font-semibold ${
                      status === 'good' ? 'text-blue-400' : 
                      status === 'warning' ? 'text-yellow-400' : 
                      'text-red-400'
                    }`}>
                      {avgLoad.toFixed(0)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">
                    {page.minLoadTime ? page.minLoadTime.toFixed(0) : '-'}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">
                    {page.maxLoadTime ? page.maxLoadTime.toFixed(0) : '-'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${statusColor[status]}`}>
                      {status === 'good' ? 'Fast' : status === 'warning' ? 'Moderate' : 'Slow'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

