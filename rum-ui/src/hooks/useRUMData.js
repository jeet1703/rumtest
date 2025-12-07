import { useState, useEffect } from 'react';
import { rumAPI } from '../services/apiService';

export const useRUMData = (timeRangeMs = 3600000) => { // 1 hour default
  const [data, setData] = useState({
    webVitals: [],
    errors: [],
    pageViews: [],
    pageSpeed: [],
    pageSpeedStats: [],
    stats: {},
    loading: true,
    error: null,
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
          webVitals: vitalsRes.data || [],
          errors: errorsRes.data || [],
          pageViews: pageViewsRes.data || [],
          pageSpeed: pageSpeedRes.data || [],
          pageSpeedStats: pageSpeedStatsRes.data || [],
          stats: statsRes.data || {},
          loading: false,
          error: null,
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
    
    // Refetch every 10 seconds for real-time updates
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [timeRangeMs]);

  return data;
};

