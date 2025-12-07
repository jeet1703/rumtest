# Complete RUM System Setup Guide

This guide will help you set up and run the complete RUM (Real User Monitoring) system with the backend, dashboard, and demo application.

## 📋 System Overview

The RUM system consists of three main components:

1. **Backend** (`Rum/`) - Spring Boot API server
2. **Dashboard** (`rum-ui/`) - React dashboard for monitoring
3. **Demo App** (`rum-demo-app/`) - Sample application with RUM SDK

## 🚀 Quick Start (All Components)

### Step 1: Start the Backend

```bash
# Navigate to backend directory
cd Rum

# Start Spring Boot application
mvn spring-boot:run

# Or if you have Maven wrapper
./mvnw spring-boot:run

# Backend will run on http://localhost:8080
```

**Verify backend is running:**
- Open `http://localhost:8080/api/rum/health`
- Should return: `{"status":"UP","service":"RUM Backend",...}`

### Step 2: Start the Dashboard

```bash
# Open a new terminal
cd rum-ui

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Dashboard will run on http://localhost:3000
```

**Verify dashboard is running:**
- Open `http://localhost:3000`
- You should see the RUM Dashboard with sidebar navigation

### Step 3: Start the Demo App

```bash
# Open another new terminal
cd rum-demo-app

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Demo app will run on http://localhost:3001
```

**Verify demo app is running:**
- Open `http://localhost:3001`
- You should see the demo application interface

## 🎯 Testing the Complete System

### 1. Generate Events from Demo App

1. **Open the demo app** (`http://localhost:3001`)
2. **Interact with the app:**
   - Click "Track User Action" button
   - Click "Generate Error" button
   - Click "Simulate Slow Load" button
   - Navigate between pages (Home, About, Products, Contact)

3. **Wait a few seconds** for events to be batched and sent

### 2. View Events in Dashboard

1. **Open the dashboard** (`http://localhost:3000`)
2. **Navigate through views:**
   - **Dashboard** - Overview with all metrics
   - **Web Vitals** - See LCP, FCP, CLS, INP metrics
   - **Errors** - View generated errors
   - **Page Speed** - See page load times per URL
   - **Sessions** - View user sessions
   - **Analytics** - Comprehensive analytics

3. **Enable Live Mode** (if not already enabled):
   - Click the Live Mode toggle in sidebar
   - Data will auto-refresh every 10 seconds

4. **Change time range** if needed:
   - Use time range selector in header
   - Try "24 hours" to see all events

## 📊 What Events Are Tracked

### Automatic Events (from Demo App)

- ✅ **Page View** - On initial page load
- ✅ **Page Speed** - Load time, DOM ready, interactive
- ✅ **Web Vitals** - LCP, FCP, CLS (automatically measured)
- ✅ **Errors** - JavaScript errors and unhandled rejections

### Manual Events (from buttons)

- 🖱️ **User Actions** - Button clicks
- ❌ **Errors** - Test errors
- 🐌 **Page Speed** - Simulated slow loads
- 🧭 **Page Views** - Navigation events

## 🔧 Configuration

### Backend Configuration

**File:** `Rum/src/main/resources/application.properties`

```properties
# Server port
server.port=8080

# Database (H2 in-memory)
spring.datasource.url=jdbc:h2:mem:rumdb
spring.jpa.hibernate.ddl-auto=create-drop
```

### Dashboard Configuration

**File:** `rum-ui/src/services/apiService.js`

```javascript
const API_BASE_URL = 'http://localhost:8080/api/rum';
```

### Demo App Configuration

**File:** `rum-demo-app/src/App.jsx`

```javascript
const rumInstance = new RUMWrapper({
  apiUrl: 'http://localhost:8080/api/rum',
  batchSize: 10,
  batchInterval: 5000,
});
```

## 🐛 Troubleshooting

### Backend Not Starting

**Problem:** Maven build fails or port 8080 already in use

**Solutions:**
1. Check if port 8080 is in use: `netstat -ano | findstr :8080` (Windows) or `lsof -i :8080` (Mac/Linux)
2. Kill the process or change port in `application.properties`
3. Clean Maven: `mvn clean install`
4. Check Java version: `java -version` (should be 17+)

### Dashboard Can't Connect to Backend

**Problem:** Dashboard shows "Connection Error"

**Solutions:**
1. Verify backend is running: `http://localhost:8080/api/rum/health`
2. Check CORS settings in backend (should allow `http://localhost:3000`)
3. Verify API URL in `rum-ui/src/services/apiService.js`
4. Check browser console for detailed errors

### Demo App Not Sending Events

**Problem:** Events don't appear in dashboard

**Solutions:**
1. Check browser console for errors
2. Verify backend is running
3. Check Network tab for failed POST requests to `/api/rum`
4. Verify API URL in demo app matches backend
5. Wait for batch interval (5 seconds) or trigger more events

### No Data in Dashboard

**Problem:** Dashboard loads but shows no data

**Solutions:**
1. Generate events from demo app
2. Check time range (try "24 hours")
3. Verify events are being sent (check Network tab)
4. Check backend logs for errors
5. Verify database is storing events

## 📝 Development Workflow

### Typical Development Session

1. **Start backend** (Terminal 1)
   ```bash
   cd Rum && mvn spring-boot:run
   ```

2. **Start dashboard** (Terminal 2)
   ```bash
   cd rum-ui && npm run dev
   ```

3. **Start demo app** (Terminal 3)
   ```bash
   cd rum-demo-app && npm run dev
   ```

4. **Test flow:**
   - Interact with demo app → Generate events
   - View events in dashboard → See real-time updates
   - Analyze metrics → Check different views

### Making Changes

- **Backend changes:** Restart Spring Boot app
- **Dashboard changes:** Vite HMR will auto-reload
- **Demo app changes:** Vite HMR will auto-reload

## 🎓 Learning Path

1. **Start with Demo App**
   - Understand how SDK is initialized
   - See how events are tracked
   - Learn about different event types

2. **Explore Dashboard**
   - Navigate through different views
   - Understand metrics and charts
   - Try different time ranges

3. **Check Backend**
   - View API endpoints
   - Understand data models
   - See how events are stored

## 📚 Additional Resources

- **Dashboard User Guide:** `rum-ui/USER_GUIDE.md`
- **Dashboard Code Tutorial:** `rum-ui/CODE_TUTORIAL.md`
- **Demo App README:** `rum-demo-app/README.md`

## ✅ Verification Checklist

- [ ] Backend running on port 8080
- [ ] Backend health check returns OK
- [ ] Dashboard running on port 3000
- [ ] Dashboard can connect to backend
- [ ] Demo app running on port 3001
- [ ] Demo app can send events
- [ ] Events appear in dashboard
- [ ] Live mode works in dashboard
- [ ] All views accessible in dashboard

## 🎉 Success!

If all checkboxes are checked, your RUM system is fully operational!

**Next Steps:**
1. Integrate SDK into your own application
2. Customize dashboard views
3. Set up alerts and monitoring
4. Deploy to production

---

**Happy Monitoring! 🚀**

