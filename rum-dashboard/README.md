# RUM Dashboard

A modern, beautiful Real User Monitoring (RUM) dashboard built with React and Vite.

## Features

✨ **Modern UI/UX**
- Clean, professional design with gradient cards
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Dark mode ready (coming soon)

📊 **Real-time Monitoring**
- Live data updates every 10 seconds
- Web vitals visualization (LCP, FCP, INP, CLS, TTFB)
- Error tracking and categorization
- User sessions table with detailed metrics

🎨 **Beautiful Charts**
- Interactive line charts for web vitals
- Color-coded bar charts for errors
- Responsive and performant

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Spring Boot backend running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
rum-dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Main dashboard component
│   │   ├── WebVitalsChart.jsx   # Web vitals line chart
│   │   ├── ErrorsChart.jsx      # Errors bar chart
│   │   ├── SessionsTable.jsx    # User sessions table
│   │   ├── MetricsCard.jsx      # Metric display cards
│   │   └── LoadingSpinner.jsx   # Loading indicator
│   ├── services/
│   │   └── apiService.js        # API client
│   ├── hooks/
│   │   └── useRUMData.js        # Data fetching hook
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
└── package.json
```

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Lucide React** - Icons
- **date-fns** - Date formatting

## Customization

### Change API URL

Update `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:8080/api/rum';
```

### Modify Colors

Edit `tailwind.config.js` to customize the color scheme.

### Add More Metrics

Extend the `MetricsCard` component and add new cards in `Dashboard.jsx`.

## License

MIT

