# Code Tutorial - Building RUM Dashboard Features

This tutorial walks through building features for the RUM Dashboard.

## Table of Contents

1. [Understanding the Architecture](#architecture)
2. [Adding a New Metric Card](#new-metric-card)
3. [Creating a Custom Chart](#custom-chart)
4. [Adding a New API Endpoint](#new-api-endpoint)
5. [Implementing Real-time Updates](#real-time-updates)
6. [Styling Components](#styling)

---

## Architecture

### Component Hierarchy

```
App
├── Layout
│   └── Sidebar
└── Views (Dashboard, WebVitals, etc.)
    ├── Header
    └── Content Components
```

### Data Flow

```
Backend API → apiService.js → useRUMData Hook → Components
```

---

## Adding a New Metric Card

### Step 1: Create the Component

```jsx
// src/components/MyMetricCard.jsx
import React from 'react';

export const MyMetricCard = ({ title, value, unit, status, icon }) => {
  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--text-secondary)]">{title}</p>
          <p className="text-2xl font-bold text-[var(--text-primary)]">
            {value} {unit}
          </p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
};
```

### Step 2: Use in a View

```jsx
import { MyMetricCard } from './MyMetricCard';

<MyMetricCard
  title="My Metric"
  value={123}
  unit="ms"
  status="good"
  icon="📊"
/>
```

---

## Creating a Custom Chart

### Step 1: Install Recharts (if needed)

```bash
npm install recharts
```

### Step 2: Create Chart Component

```jsx
// src/components/MyChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const MyChart = ({ data }) => {
  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
        My Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d2d33" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#6366f1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
```

---

## Adding a New API Endpoint

### Step 1: Add to apiService.js

```javascript
// src/services/apiService.js
export const rumAPI = {
  // ... existing endpoints
  
  getMyNewData: (startMs, endMs) =>
    apiClient.get('/myendpoint/range', {
      params: { startMs, endMs },
    }),
};
```

### Step 2: Update useRUMData Hook

```javascript
// src/hooks/useRUMData.js
const [myNewDataRes] = await Promise.all([
  // ... existing calls
  rumAPI.getMyNewData(startTime, endTime),
]);

setData({
  // ... existing data
  myNewData: myNewDataRes.data || [],
});
```

### Step 3: Use in Component

```jsx
const { myNewData } = useRUMData(timeRange);
```

---

## Implementing Real-time Updates

### Using Live Mode Context

```jsx
import { useLiveMode } from '../contexts/LiveModeContext';

function MyComponent() {
  const { isLive, refreshInterval } = useLiveMode();
  
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data
    };
    
    fetchData();
    
    if (isLive) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [isLive, refreshInterval]);
}
```

---

## Styling Components

### Using Theme Variables

```jsx
// Dark/Light mode compatible
<div className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
  Content
</div>
```

### Status Colors

```jsx
// Good status
className="text-green-400 bg-green-400/10"

// Warning status
className="text-yellow-400 bg-yellow-400/10"

// Poor status
className="text-red-400 bg-red-400/10"
```

### Dark Theme Colors

```jsx
// Backgrounds
bg-[#0b0b0f]    // Primary
bg-[#18181b]    // Secondary
bg-[#1f1f23]    // Tertiary

// Borders
border-[#2d2d33]

// Text
text-[#d8d9da]  // Primary
text-gray-400    // Secondary
text-gray-500    // Tertiary
```

---

## Best Practices

1. **Always handle loading states**
2. **Show error messages to users**
3. **Use theme variables for colors**
4. **Keep components small and focused**
5. **Extract reusable logic to hooks**
6. **Follow existing code patterns**

---

## Example: Complete Feature

```jsx
// src/components/FeatureView.jsx
import React, { useState } from 'react';
import { useRUMData } from '../hooks/useRUMData';
import { Header } from './Header';
import { MetricsCard } from './MetricsCard';
import { LoadingSpinner } from './LoadingSpinner';

export const FeatureView = () => {
  const [timeRange, setTimeRange] = useState(3600000);
  const { data, loading, error } = useRUMData(timeRange);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Feature" 
        subtitle="Description"
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
      <div className="p-6">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            <MetricsCard
              title="Metric 1"
              value={data.metric1}
              unit=""
              status="good"
              icon="📊"
            />
          </div>
        )}
      </div>
    </div>
  );
};
```

---

For more examples, see the existing components in `src/components/`.

