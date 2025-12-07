# RUM Dashboard - Real User Monitoring

A modern, Grafana Faro-inspired React dashboard for monitoring real user metrics, built with Vite.

![Dashboard Preview](https://via.placeholder.com/800x400)

## ✨ Features

- 🎨 **Dark/Light Mode** - Toggle between themes
- 🔴 **Live Mode** - Real-time data updates with configurable intervals
- 📊 **Multiple Views** - Dashboard, Web Vitals, Errors, Page Speed, Sessions, Analytics
- 📱 **Responsive Design** - Works on all screen sizes
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎯 **Grafana Faro Style** - Professional dark theme UI

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Spring Boot backend running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
rum-ui/
├── src/
│   ├── components/      # React components
│   ├── contexts/        # Context providers (Theme, LiveMode)
│   ├── hooks/          # Custom hooks
│   ├── services/        # API services
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── vite.config.js      # Vite configuration
```

## 🎯 Key Components

- **Sidebar** - Navigation and controls
- **Dashboard** - Overview with key metrics
- **WebVitalsView** - Core Web Vitals metrics
- **ErrorsView** - Error tracking
- **PageSpeedView** - Page load performance
- **SessionsView** - User sessions
- **AnalyticsView** - Comprehensive analytics
- **SettingsView** - Configuration

## 🔧 Configuration

### API Endpoint

Update in `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api/rum';
```

### Theme

Themes are configured in `src/index.css` using CSS variables.

## 📚 Documentation

See [USER_GUIDE.md](./USER_GUIDE.md) for comprehensive documentation including:
- Detailed feature descriptions
- Code tutorials
- API reference
- Troubleshooting guide

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts
- **Axios** - HTTP client

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Follow existing code structure
2. Add proper error handling
3. Update documentation
4. Test thoroughly

## 📄 License

Part of the RUM monitoring system.

---

For detailed usage instructions, see [USER_GUIDE.md](./USER_GUIDE.md)
