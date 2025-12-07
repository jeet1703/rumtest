# RUM Dashboard - User Guide & Code Tutorial

## 📚 Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Dashboard Views](#dashboard-views)
5. [Configuration](#configuration)
6. [Code Tutorial](#code-tutorial)
7. [API Reference](#api-reference)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The RUM (Real User Monitoring) Dashboard is a comprehensive React application built with Vite that provides real-time monitoring and analytics for web applications. It features a Grafana Faro-inspired dark theme UI with sidebar navigation, live data updates, and multiple views for different types of monitoring data.

### Key Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Context API** - State management

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Spring Boot backend running on `http://localhost:8080`

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd rum-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate manually to the URL

### Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

---

## ✨ Features

### 🎨 Dark/Light Mode Toggle

- Toggle between dark and light themes
- Theme preference is saved in localStorage
- Access via Settings or Sidebar footer

### 🔴 Live Mode

- Real-time data updates
- Configurable refresh intervals (5s, 10s, 30s, 1min)
- Visual indicator when live mode is active
- Can be paused/resumed from sidebar

### 📊 Multiple Dashboard Views

1. **Dashboard** - Overview with key metrics
2. **Web Vitals** - Core Web Vitals performance
3. **Errors** - Error tracking and analysis
4. **Page Speed** - Page load performance by URL
5. **Sessions** - User session tracking
6. **Analytics** - Comprehensive analytics
7. **Settings** - Configuration options

### ⏱️ Time Range Selection

- 15 minutes
- 1 hour
- 24 hours
- 7 days

---

## 📱 Dashboard Views

### 1. Dashboard (Overview)

**Location:** Main view when app loads

**Features:**
- Key metrics cards (Sessions, Users, Page Views, LCP, CLS, Errors)
- Web Vitals chart
- Errors chart
- Page Speed table
- Sessions table

**Metrics Explained:**
- **LCP (Largest Contentful Paint)**: Time to render largest content
  - Good: ≤ 2500ms
  - Needs Improvement: 2500-4000ms
  - Poor: > 4000ms

- **CLS (Cumulative Layout Shift)**: Visual stability
  - Good: ≤ 0.1
  - Needs Improvement: 0.1-0.25
  - Poor: > 0.25

### 2. Web Vitals View

**Features:**
- Detailed Core Web Vitals metrics
- LCP, FCP, INP, CLS, TTFB
- Time series charts
- Performance thresholds

### 3. Errors View

**Features:**
- Total error count
- Error severity breakdown
- Error type distribution chart
- Error categorization

### 4. Page Speed View

**Features:**
- Page load speed by URL
- View count per page
- Average, min, max load times
- Performance status indicators

### 5. Sessions View

**Features:**
- Active user sessions
- Session details (ID, URL, vitals, errors)
- Last seen timestamps
- Session activity tracking

### 6. Analytics View

**Features:**
- Comprehensive performance summary
- Error rate calculation
- Event statistics
- Performance insights

### 7. Settings View

**Features:**
- Theme toggle (Dark/Light)
- Live mode configuration
- Refresh interval settings
- API configuration info

---

## ⚙️ Configuration

### API Configuration

The API base URL is configured in `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api/rum';
```

To change the backend URL, update this constant.

### Theme Configuration

Themes are managed through CSS variables in `src/index.css`. You can customize colors by modifying:

```css
[data-theme="dark"] {
  --bg-primary: #0b0b0f;
  --bg-secondary: #1f1f23;
  /* ... */
}
```

### Refresh Intervals

Available refresh intervals:
- 5 seconds
- 10 seconds (default)
- 30 seconds
- 1 minute

Configure in Settings view or `src/contexts/LiveModeContext.jsx`.

---

## 💻 Code Tutorial

### Project Structure

```
rum-ui/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── MetricsCard.jsx
│   │   └── ...
│   ├── contexts/            # React Context providers
│   │   ├── ThemeContext.jsx
│   │   └── LiveModeContext.jsx
│   ├── hooks/               # Custom React hooks
│   │   └── useRUMData.js
│   ├── services/            # API services
│   │   └── apiService.js
│   ├── App.js               # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

### Creating a New View

1. **Create the view component:**

```jsx
// src/components/MyNewView.jsx
import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { Header } from './Header';
import { LoadingSpinner } from './LoadingSpinner';

export const MyNewView = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const { data, loading } = useRUMData(timeRange);

  return (
    <div className="min-h-screen">
      <Header 
        title="My New View" 
        subtitle="Description"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>Your content here</div>
        )}
      </div>
    </div>
  );
};
```

2. **Add to App.js:**

```jsx
import { MyNewView } from './components/MyNewView';

// In App component:
case 'mynewview':
  return <MyNewView />;
```

3. **Add to Sidebar menu:**

```jsx
// In Sidebar.jsx menuItems array:
{ id: 'mynewview', label: 'My New View', icon: '📊' }
```

### Creating a Custom Hook

```jsx
// src/hooks/useCustomData.js
import { useState, useEffect } from 'react';
import { rumAPI } from '../services/apiService';

export const useCustomData = (timeRangeMs) => {
  const [data, setData] = useState({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true }));
        const endTime = Date.now();
        const startTime = endTime - timeRangeMs;
        
        const response = await rumAPI.getYourEndpoint(startTime, endTime);
        
        setData({
          items: response.data || [],
          loading: false,
          error: null,
        });
      } catch (err) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };

    fetchData();
  }, [timeRangeMs]);

  return data;
};
```

### Using Theme Context

```jsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Using Live Mode Context

```jsx
import { useLiveMode } from '../contexts/LiveModeContext';

function MyComponent() {
  const { isLive, toggleLiveMode, refreshInterval } = useLiveMode();
  
  return (
    <div>
      <p>Live mode: {isLive ? 'ON' : 'OFF'}</p>
      <p>Refresh interval: {refreshInterval}ms</p>
      <button onClick={toggleLiveMode}>Toggle Live</button>
    </div>
  );
}
```

### Creating a Metrics Card

```jsx
import { MetricsCard } from './MetricsCard';

<MetricsCard
  title="My Metric"
  value={123.45}
  unit="ms"
  status="good"  // 'good', 'needs-improvement', or 'poor'
  icon="📊"
/>
```

### Styling with Tailwind

The app uses Tailwind CSS with custom dark theme colors:

```jsx
// Dark theme colors
className="bg-[#1f1f23] border border-[#2d2d33] text-[#d8d9da]"

// Status colors
className="text-green-400"  // Good
className="text-yellow-400" // Warning
className="text-red-400"    // Poor
```

---

## 🔌 API Reference

### Endpoints

All endpoints are prefixed with `/api/rum`

#### Get Web Vitals
```
GET /vitals/range?startMs={timestamp}&endMs={timestamp}
```

#### Get Errors
```
GET /errors/range?startMs={timestamp}&endMs={timestamp}
```

#### Get Page Views
```
GET /pageviews/range?startMs={timestamp}&endMs={timestamp}
```

#### Get Page Speed
```
GET /pagespeed/range?startMs={timestamp}&endMs={timestamp}
```

#### Get Page Speed Stats
```
GET /pagespeed/stats?startMs={timestamp}&endMs={timestamp}
```

#### Get Dashboard Stats
```
GET /stats?startMs={timestamp}&endMs={timestamp}
```

#### Health Check
```
GET /health
```

### Response Formats

**Web Vitals:**
```json
[
  {
    "id": 1,
    "sessionId": "abc123",
    "metricName": "LCP",
    "value": 2500.5,
    "eventTimestamp": "2024-01-01T12:00:00",
    "pageUrl": "https://example.com"
  }
]
```

**Page Speed Stats:**
```json
[
  {
    "pageUrl": "https://example.com/page1",
    "viewCount": 150,
    "avgLoadTime": 1200.5,
    "minLoadTime": 800.0,
    "maxLoadTime": 2500.0
  }
]
```

---

## 🔧 Troubleshooting

### Backend Connection Issues

**Problem:** Dashboard shows "Connection Error"

**Solutions:**
1. Verify backend is running: `http://localhost:8080`
2. Check CORS configuration in backend
3. Verify API URL in `src/services/apiService.js`
4. Check browser console for detailed error messages

### No Data Displayed

**Problem:** Dashboard loads but shows no data

**Solutions:**
1. Verify backend has data for the selected time range
2. Check time range selection (try 24 hours)
3. Verify API endpoints are returning data
4. Check browser Network tab for API responses

### Theme Not Persisting

**Problem:** Theme resets on page refresh

**Solutions:**
1. Check browser localStorage is enabled
2. Verify `ThemeContext` is properly saving to localStorage
3. Clear browser cache and try again

### Live Mode Not Working

**Problem:** Data doesn't auto-refresh

**Solutions:**
1. Verify Live Mode is enabled (green indicator)
2. Check refresh interval in Settings
3. Verify `useRUMData` hook is using `isLive` from context
4. Check browser console for errors

### Build Errors

**Problem:** `npm run build` fails

**Solutions:**
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Update dependencies: `npm update`
4. Check for syntax errors in components

---

## 📝 Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use custom hooks for data fetching
   - Extract reusable UI components

2. **State Management**
   - Use Context API for global state (theme, live mode)
   - Use local state for component-specific data
   - Avoid prop drilling

3. **Performance**
   - Use `useMemo` for expensive calculations
   - Use `useCallback` for event handlers passed to children
   - Implement proper loading states

4. **Styling**
   - Use Tailwind utility classes
   - Follow the dark theme color scheme
   - Maintain consistency across components

5. **Error Handling**
   - Always handle API errors gracefully
   - Show user-friendly error messages
   - Log errors for debugging

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)

---

## 📄 License

This project is part of the RUM monitoring system.

---

## 🤝 Contributing

When adding new features:

1. Follow the existing code structure
2. Add proper error handling
3. Update this documentation
4. Test with different time ranges
5. Ensure dark/light theme compatibility

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review browser console errors
3. Verify backend API responses
4. Check network requests in DevTools

---

**Last Updated:** 2024

