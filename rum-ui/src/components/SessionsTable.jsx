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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">👥 User Sessions</h2>
        <div className="text-center text-gray-500 py-8">No sessions data</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">👥 User Sessions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Session ID</th>
              <th className="px-4 py-2 text-left">Page URL</th>
              <th className="px-4 py-2 text-center">Vitals</th>
              <th className="px-4 py-2 text-center">Errors</th>
              <th className="px-4 py-2 text-left">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {sessions.slice(0, 10).map((session) => (
              <tr key={session.sessionId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-xs">{session.sessionId.slice(0, 12)}...</td>
                <td className="px-4 py-2 truncate text-xs max-w-xs">{session.pageUrl}</td>
                <td className="px-4 py-2 text-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {session.vitalsCount}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span className={`px-2 py-1 rounded ${
                    session.errorsCount > 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.errorsCount}
                  </span>
                </td>
                <td className="px-4 py-2 text-xs">
                  {format(new Date(session.lastSeen), 'HH:mm:ss')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

