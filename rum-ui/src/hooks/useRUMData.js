import { useState, useEffect } from 'react';
import { rumAPI } from '../services/apiService';

export const useRUMData = (timeRangeMs = 3600000) => { // 1 hour default
  const [data, setData] = useState({
    webVitals: [],
    errors: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        const endTime = Date.now();
        const startTime = endTime - timeRangeMs;

        const [vitalsRes, errorsRes] = await Promise.all([
          rumAPI.getWebVitals(startTime, endTime),
          rumAPI.getErrors(startTime, endTime),
        ]);

        setData({
          webVitals: vitalsRes.data,
          errors: errorsRes.data,
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

