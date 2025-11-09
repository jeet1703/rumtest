import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/rum';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const rumAPI = {
  // Health check
  health: () => apiClient.get('/health'),

  // Get web vitals for time range
  getWebVitals: (startMs, endMs) =>
    apiClient.get('/vitals/range', {
      params: { startMs, endMs },
    }),

  // Get errors for time range
  getErrors: (startMs, endMs) =>
    apiClient.get('/errors/range', {
      params: { startMs, endMs },
    }),

  // Get vitals by session
  getSessionVitals: (sessionId) =>
    apiClient.get(`/sessions/${sessionId}/vitals`),

  // Get errors by session
  getSessionErrors: (sessionId) =>
    apiClient.get(`/sessions/${sessionId}/errors`),
};

export default apiClient;

