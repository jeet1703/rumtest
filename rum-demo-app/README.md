# RUM Demo Application

A demo React application that integrates the RUM SDK to send monitoring events to the backend. This app demonstrates how to use the RUM SDK in a real application and generates events that can be viewed in the RUM Dashboard.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Spring Boot backend running on `http://localhost:8080`
- RUM Dashboard running on `http://localhost:3000`

### Installation

1. **Navigate to the demo app directory:**
   ```bash
   cd rum-demo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - The app will automatically open at `http://localhost:3001`
   - If not, navigate manually to the URL

## 📋 Features

### Automatic Tracking

- ✅ **Page Views** - Automatically tracked on page load
- ✅ **Page Speed** - Load time, DOM ready, interactive metrics
- ✅ **Web Vitals** - LCP, FCP, CLS automatically measured
- ✅ **Errors** - JavaScript errors and unhandled promise rejections

### Interactive Features

- 🖱️ **User Actions** - Click the "Track User Action" button
- ❌ **Error Generation** - Generate test errors to see error tracking
- 🐌 **Slow Load Simulation** - Simulate slow page loads
- 🧭 **Navigation** - Navigate between pages to track page views

## 🎯 How It Works

1. **SDK Initialization**
   - The RUM SDK is initialized when the app loads
   - Creates a session ID and user ID
   - Sets up automatic event tracking

2. **Event Collection**
   - Events are collected and queued
   - Batched and sent to the backend every 5 seconds
   - Or immediately when batch size (10 events) is reached

3. **Backend Integration**
   - Events are sent to `http://localhost:8080/api/rum`
   - Backend processes and stores events
   - Dashboard displays events in real-time

## 📊 Viewing Events in Dashboard

1. **Start the backend:**
   ```bash
   cd Rum
   mvn spring-boot:run
   ```

2. **Start the dashboard:**
   ```bash
   cd rum-ui
   npm run dev
   ```

3. **Start this demo app:**
   ```bash
   cd rum-demo-app
   npm run dev
   ```

4. **Interact with the demo app:**
   - Click buttons to generate events
   - Navigate between pages
   - Generate errors
   - Wait for automatic web vitals

5. **View in dashboard:**
   - Open `http://localhost:3000`
   - See events appear in real-time
   - Check different views (Dashboard, Web Vitals, Errors, etc.)

## 🔧 Configuration

### API URL

Update the API URL in `src/App.jsx`:

```javascript
const rumInstance = new RUMWrapper({
  apiUrl: 'http://localhost:8080/api/rum', // Change this
  // ...
});
```

### Batch Settings

Adjust batch size and interval:

```javascript
const rumInstance = new RUMWrapper({
  batchSize: 10,        // Send when 10 events queued
  batchInterval: 5000,  // Or every 5 seconds
  // ...
});
```

## 📁 Project Structure

```
rum-demo-app/
├── src/
│   ├── App.jsx              # Main app component
│   ├── App.css              # Styles
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── rum-sdk/
│       └── RumWrapper.js    # RUM SDK wrapper
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Features Demonstrated

### 1. Page View Tracking
- Automatic tracking on page load
- Manual tracking on navigation
- Includes page path, title, referrer

### 2. Web Vitals
- **LCP** (Largest Contentful Paint)
- **FCP** (First Contentful Paint)
- **CLS** (Cumulative Layout Shift)
- Automatically measured using Performance API

### 3. Error Tracking
- JavaScript errors
- Unhandled promise rejections
- Manual error generation for testing

### 4. Page Speed Metrics
- Total load time
- DOM content loaded
- DOM interactive
- Resource load time

### 5. User Actions
- Button clicks
- Form interactions
- Custom events

## 🐛 Troubleshooting

### Events Not Appearing in Dashboard

1. **Check backend is running:**
   - Verify `http://localhost:8080/api/rum/health` returns OK

2. **Check CORS:**
   - Backend should allow requests from `http://localhost:3001`

3. **Check browser console:**
   - Look for errors when sending events
   - Check Network tab for failed requests

4. **Verify API URL:**
   - Ensure API URL in `App.jsx` matches backend

### Events Not Sending

1. **Check SDK initialization:**
   - Verify `rumRef.current` is not null
   - Check console for initialization errors

2. **Check batch settings:**
   - Events may be queued (wait for batch interval)
   - Or trigger manually by clicking buttons

3. **Check network:**
   - Verify backend is accessible
   - Check for CORS errors

## 📝 Next Steps

1. **Integrate into your app:**
   - Copy `rum-sdk/RumWrapper.js` to your project
   - Initialize in your app entry point
   - Configure API URL and settings

2. **Customize tracking:**
   - Add custom events
   - Track specific user actions
   - Add business metrics

3. **Monitor in dashboard:**
   - Set up alerts
   - Create custom views
   - Analyze performance trends

## 🔗 Related Projects

- **RUM Dashboard** (`rum-ui`) - View collected events
- **RUM Backend** (`Rum`) - Process and store events
- **RUM SDK** (`rum-sdk`) - TypeScript SDK source

## 📄 License

Part of the RUM monitoring system.

---

**Happy Monitoring! 🚀**

