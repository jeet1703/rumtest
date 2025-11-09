import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Users, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';

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
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">User Sessions</h2>
        </div>
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No sessions data</p>
          <p className="text-sm mt-2">Sessions will appear here once monitoring starts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">User Sessions</h2>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          {sessions.length} active
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Session ID
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Page URL
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Vitals
              </th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Errors
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Seen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sessions.slice(0, 10).map((session) => (
              <tr 
                key={session.sessionId} 
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <code className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {session.sessionId.slice(0, 16)}...
                  </code>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 truncate max-w-xs">
                      {session.pageUrl}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    <CheckCircle2 className="w-3 h-3" />
                    {session.vitalsCount}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    session.errorsCount > 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {session.errorsCount > 0 ? (
                      <XCircle className="w-3 h-3" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3" />
                    )}
                    {session.errorsCount}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-600">
                    {format(new Date(session.lastSeen), 'HH:mm:ss')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

