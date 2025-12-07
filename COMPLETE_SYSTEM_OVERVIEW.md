# Complete RUM System Overview

## 🏗️ System Architecture

```
┌─────────────────┐
│   Demo App      │  (rum-demo-app)
│   Port: 3001    │
│                 │
│  ┌───────────┐  │
│  │ RUM SDK   │──┼──┐
│  └───────────┘  │  │
└─────────────────┘  │
                     │ HTTP POST
                     │ /api/rum
                     ▼
┌─────────────────┐
│   Backend       │  (Rum/)
│   Port: 8080    │
│                 │
│  Spring Boot    │
│  + H2 Database  │
└─────────────────┘
         │
         │ HTTP GET
         │ /api/rum/*
         ▼
┌─────────────────┐
│   Dashboard     │  (rum-ui)
│   Port: 3000    │
│                 │
│  React + Vite   │
│  Grafana Style  │
└─────────────────┘
```

## 📦 Components

### 1. Backend (`Rum/`)
- **Technology:** Spring Boot, H2 Database, JPA
- **Port:** 8080
- **Purpose:** Receives, processes, and stores RUM events
- **Endpoints:**
  - `POST /api/rum` - Ingest events
  - `GET /api/rum/vitals/range` - Get web vitals
  - `GET /api/rum/errors/range` - Get errors
  - `GET /api/rum/pageviews/range` - Get page views
  - `GET /api/rum/pagespeed/range` - Get page speed
  - `GET /api/rum/pagespeed/stats` - Get page speed stats
  - `GET /api/rum/stats` - Get dashboard statistics
  - `GET /api/rum/health` - Health check

### 2. Dashboard (`rum-ui/`)
- **Technology:** React 18, Vite, Tailwind CSS, Recharts
- **Port:** 3000
- **Purpose:** Visualize RUM data in real-time
- **Features:**
  - Dark/Light mode toggle
  - Live mode with configurable refresh
  - Sidebar navigation
  - Multiple views (Dashboard, Web Vitals, Errors, etc.)
  - Time range selection
  - Grafana Faro-inspired UI

### 3. Demo App (`rum-demo-app/`)
- **Technology:** React 18, Vite
- **Port:** 3001
- **Purpose:** Demonstrates RUM SDK integration
- **Features:**
  - RUM SDK integration
  - Automatic event tracking
  - Manual event generation
  - Interactive demo buttons

## 🔄 Data Flow

### Event Collection Flow

1. **User interacts with Demo App**
   - Clicks button, navigates, generates error
   - Or automatic events (page load, web vitals)

2. **RUM SDK captures event**
   - SDK wraps event with metadata
   - Adds session ID, user ID, timestamp
   - Queues event in batch

3. **SDK sends batch to Backend**
   - Every 5 seconds OR when batch size (10) reached
   - POST request to `/api/rum`
   - JSON array of events

4. **Backend processes events**
   - Validates event structure
   - Saves to H2 database
   - Returns success response

5. **Dashboard fetches data**
   - Polls backend every 10 seconds (if live mode on)
   - GET requests to various endpoints
   - Updates UI with new data

## 📊 Event Types

### 1. Web Vital Events
- **LCP** (Largest Contentful Paint)
- **FCP** (First Contentful Paint)
- **CLS** (Cumulative Layout Shift)
- **INP** (Interaction to Next Paint)
- **TTFB** (Time to First Byte)

### 2. Error Events
- JavaScript errors
- Unhandled promise rejections
- Network errors
- Custom errors

### 3. Page View Events
- Page navigation
- Page path, title, referrer
- User session tracking

### 4. Page Speed Events
- Load time
- DOM ready time
- Interactive time
- Resource load time

### 5. User Action Events
- Clicks
- Form inputs
- Custom interactions

## 🎯 Use Cases

### Use Case 1: Monitor Production App

1. Integrate RUM SDK into your production app
2. Configure API URL to point to backend
3. Deploy backend and dashboard
4. Monitor real user metrics

### Use Case 2: Performance Testing

1. Use demo app to generate test events
2. View metrics in dashboard
3. Analyze performance trends
4. Identify bottlenecks

### Use Case 3: Error Tracking

1. Errors automatically captured
2. View in Errors view
3. Analyze error patterns
4. Fix issues based on data

## 🔐 Security Considerations

### Current Setup (Development)
- CORS enabled for all origins
- No authentication
- H2 in-memory database

### Production Recommendations
- Add authentication to backend
- Restrict CORS to specific domains
- Use production database (PostgreSQL, MySQL)
- Add rate limiting
- Encrypt sensitive data

## 📈 Scaling Considerations

### Current Limitations
- H2 in-memory database (data lost on restart)
- Single backend instance
- No caching layer

### Production Scaling
- Use persistent database
- Add Redis for caching
- Implement database connection pooling
- Add load balancing
- Consider message queue for events

## 🛠️ Development Tips

### 1. Testing Event Flow

```bash
# Terminal 1: Backend
cd Rum && mvn spring-boot:run

# Terminal 2: Dashboard
cd rum-ui && npm run dev

# Terminal 3: Demo App
cd rum-demo-app && npm run dev
```

### 2. Debugging Events

**Check Backend Logs:**
- Spring Boot console shows received events
- Check for processing errors

**Check Browser Console:**
- Demo app: Check for SDK errors
- Dashboard: Check for API errors

**Check Network Tab:**
- Verify POST requests to `/api/rum`
- Check response status codes
- Verify GET requests from dashboard

### 3. Database Inspection

**H2 Console:**
- Access at `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:rumdb`
- Username: `sa`
- Password: (empty)

## 📚 File Structure

```
project-root/
├── Rum/                    # Backend
│   ├── src/main/java/      # Java source
│   └── src/main/resources/ # Config files
│
├── rum-ui/                 # Dashboard
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   └── services/       # API services
│   └── vite.config.js
│
├── rum-demo-app/           # Demo App
│   ├── src/
│   │   ├── App.jsx         # Main app
│   │   └── rum-sdk/        # SDK wrapper
│   └── vite.config.js
│
└── rum-sdk/                # SDK source (TypeScript)
    └── src/
        └── RumWrapper.ts
```

## 🎓 Learning Resources

1. **Start Here:**
   - `SETUP_GUIDE.md` - Complete setup instructions
   - `rum-demo-app/README.md` - Demo app details
   - `rum-ui/USER_GUIDE.md` - Dashboard guide

2. **Code Examples:**
   - `rum-ui/CODE_TUTORIAL.md` - Code tutorials
   - `rum-demo-app/src/App.jsx` - SDK integration example

3. **API Reference:**
   - Backend controller: `Rum/src/main/java/.../RUMEventController.java`
   - API service: `rum-ui/src/services/apiService.js`

## ✅ Quick Verification

Run these commands to verify everything works:

```bash
# 1. Check backend
curl http://localhost:8080/api/rum/health

# 2. Check dashboard (in browser)
# Open http://localhost:3000

# 3. Check demo app (in browser)
# Open http://localhost:3001
# Click buttons to generate events
# Check dashboard for events
```

## 🚀 Next Steps

1. **Integrate SDK into your app:**
   - Copy `rum-demo-app/src/rum-sdk/RumWrapper.js`
   - Initialize in your app
   - Configure API URL

2. **Customize Dashboard:**
   - Add custom views
   - Create new charts
   - Add alerts

3. **Deploy:**
   - Deploy backend to server
   - Deploy dashboard
   - Update SDK API URLs

---

**System is ready to use! 🎉**

