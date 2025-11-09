# RUM Dashboard

Real User Monitoring (RUM) Data Visualization Dashboard built with React.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The dashboard will open at `http://localhost:3000`

## Prerequisites

- Node.js 16+ and npm
- Spring Boot backend running on `http://localhost:8080`

## Features

- Real-time data updates (every 10 seconds)
- Web vitals visualization (LCP, FCP, INP, CLS, TTFB)
- Error tracking and categorization
- User sessions table
- Time range filtering (15 min, 1 hour, 24 hours)
- Responsive design with Tailwind CSS

## Project Structure

```
rum-ui/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── WebVitalsChart.jsx
│   │   ├── ErrorsChart.jsx
│   │   ├── SessionsTable.jsx
│   │   ├── MetricsCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── services/
│   │   └── apiService.js
│   ├── hooks/
│   │   └── useRUMData.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
│   └── index.html
└── package.json
```

## Customization

### Change API URL
Update `src/services/apiService.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url:8080/api/rum';
```

### Add More Charts
Create new chart components and import in `Dashboard.jsx`

### Customize Colors
Modify Tailwind classes in components or update `tailwind.config.js`

