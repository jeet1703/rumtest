import { useState, useEffect } from 'react';
import { rumAPI } from '../services/apiService';
import { useLiveMode } from '../contexts/LiveModeContext';

export const useRUMData = (timeRangeMs = 3600000) => { // 1 hour default
  const { isLive, refreshInterval } = useLiveMode();
  const [data, setData] = useState({
    webVitals: [],
    errors: [],
    pageViews: [],
    pageSpeed: [],
    pageSpeedStats: [],
    stats: {},
    loading: true,
    error: null,
    lastUpdate: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        const endTime = Date.now();
        const startTime = endTime - timeRangeMs;

        const [
          vitalsRes, 
          errorsRes, 
          pageViewsRes, 
          pageSpeedRes, 
          pageSpeedStatsRes,
          statsRes
        ] = await Promise.all([
          rumAPI.getWebVitals(startTime, endTime),
          rumAPI.getErrors(startTime, endTime),
          rumAPI.getPageViews(startTime, endTime),
          rumAPI.getPageSpeed(startTime, endTime),
          rumAPI.getPageSpeedStats(startTime, endTime),
          rumAPI.getDashboardStats(startTime, endTime),
        ]);

        setData({
          webVitals: vitalsRes || [],
          errors: errorsRes || [],
          pageViews: pageViewsRes || [],
          pageSpeed: pageSpeedRes || [],
          pageSpeedStats: pageSpeedStatsRes || [],
          stats: statsRes || {},
          loading: false,
          error: null,
          lastUpdate: new Date(),
        });
      } catch (err) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: err.message || 'Failed to fetch data',
        }));
      }
    };

    fetchData();
    
    // Refetch based on live mode and refresh interval
    if (isLive) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [timeRangeMs, isLive, refreshInterval]);

  return data;
};

