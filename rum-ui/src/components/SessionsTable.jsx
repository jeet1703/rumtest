import React, { useMemo } from 'react';
import { format } from 'date-fns';

export const SessionsTable = ({ webVitals, errors }) => {
  const sessions = useMemo(() => {
    const sessionMap = {};

    webVitals.forEach(item => {
      if (!sessionMap[item.sessionId]) {
        sessionMap[item.sessionId] = {
          sessionId: item.sessionId,
          pageUrl: item.pageUrl,
          vitalsCount: 0,
          errorsCount: 0,
          lastSeen: item.createdAt || item.eventTimestamp,
        };
      }
      sessionMap[item.sessionId].vitalsCount += 1;
      const lastSeen = item.createdAt || item.eventTimestamp;
      if (new Date(lastSeen) > new Date(sessionMap[item.sessionId].lastSeen)) {
        sessionMap[item.sessionId].lastSeen = lastSeen;
      }
    });

    errors.forEach(item => {
      if (!sessionMap[item.sessionId]) {
        sessionMap[item.sessionId] = {
          sessionId: item.sessionId,
          pageUrl: item.pageUrl,
          vitalsCount: 0,
          errorsCount: 0,
          lastSeen: item.createdAt || item.eventTimestamp,
        };
      }
      sessionMap[item.sessionId].errorsCount += 1;
      const lastSeen = item.createdAt || item.eventTimestamp;
      if (new Date(lastSeen) > new Date(sessionMap[item.sessionId].lastSeen)) {
        sessionMap[item.sessionId].lastSeen = lastSeen;
      }
    });

    return Object.values(sessionMap).sort(
      (a, b) => new Date(b.lastSeen) - new Date(a.lastSeen)
    );
  }, [webVitals, errors]);

  if (sessions.length === 0) {
    return (
      <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg p-8">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">👥</div>
          <p className="text-gray-400 text-sm">No sessions data</p>
          <p className="text-gray-500 text-xs mt-2">User sessions will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f23] border border-[#2d2d33] rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-[#2d2d33] bg-[#18181b]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#d8d9da] flex items-center gap-2">
              <span className="text-xl">👥</span>
              User Sessions
            </h2>
            <p className="text-xs text-gray-500 mt-1">Active user sessions and activity</p>
          </div>
          <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded text-xs font-semibold border border-blue-500/30">
            {sessions.length} Active
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#18181b] border-b border-[#2d2d33]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Session ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Page URL
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Vitals
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Errors
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Last Seen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2d33]">
            {sessions.slice(0, 10).map((session, index) => (
              <tr 
                key={session.sessionId} 
                className="hover:bg-[#18181b] transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <span className="font-mono text-sm text-[#d8d9da] font-medium">
                      {session.sessionId.slice(0, 16)}...
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-[#d8d9da] truncate max-w-md" title={session.pageUrl}>
                    {session.pageUrl}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-[#2d2d33] text-blue-400">
                    {session.vitalsCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${
                    session.errorsCount > 0
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-green-500/10 text-green-400'
                  }`}>
                    {session.errorsCount}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {format(new Date(session.lastSeen), 'MMM dd, HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sessions.length > 10 && (
        <div className="px-6 py-4 border-t border-[#2d2d33] text-center text-xs text-gray-500">
          Showing 10 of {sessions.length} sessions
        </div>
      )}
    </div>
  );
};

