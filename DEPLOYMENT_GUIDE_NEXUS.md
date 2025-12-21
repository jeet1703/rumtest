# RUM System Deployment Guide - Sonatype Nexus

This guide covers deploying the RUM (Real User Monitoring) system to Sonatype Nexus Repository Manager.

## Prerequisites

- Sonatype Nexus Repository Manager (3.x or later)
- Maven 3.6+ installed
- Access to Nexus with deployment permissions
- Java 17+ for building the backend

## Table of Contents

1. [Nexus Repository Configuration](#nexus-repository-configuration)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [SDK Deployment](#sdk-deployment)
5. [Verification](#verification)

---

## Nexus Repository Configuration

### 1. Create Maven Hosted Repository

1. Log into Nexus Repository Manager
2. Navigate to **Administration** → **Repositories** → **Create repository**
3. Select **maven2 (hosted)**
4. Configure:
   - **Name**: `rum-releases` (for releases) or `rum-snapshots` (for snapshots)
   - **Version policy**: `Release` or `Snapshot`
   - **Layout policy**: `Strict`
   - **Deployment policy**: `Allow redeploy`

### 2. Create NPM Hosted Repository (for SDK)

1. Navigate to **Repositories** → **Create repository**
2. Select **npm (hosted)**
3. Configure:
   - **Name**: `rum-npm`
   - **Version policy**: `Release`

### 3. Configure Maven Settings

Add the following to your `~/.m2/settings.xml`:

```xml
<settings>
  <servers>
    <server>
      <id>nexus-rum-releases</id>
      <username>YOUR_NEXUS_USERNAME</username>
      <password>YOUR_NEXUS_PASSWORD</password>
    </server>
    <server>
      <id>nexus-rum-snapshots</id>
      <username>YOUR_NEXUS_USERNAME</username>
      <password>YOUR_NEXUS_PASSWORD</password>
    </server>
  </servers>
</settings>
```

---

## Backend Deployment

### 1. Update pom.xml

Add distribution management to `Rum/pom.xml`:

```xml
<distributionManagement>
  <repository>
    <id>nexus-rum-releases</id>
    <name>RUM Releases</name>
    <url>http://YOUR_NEXUS_URL/repository/rum-releases/</url>
  </repository>
  <snapshotRepository>
    <id>nexus-rum-snapshots</id>
    <name>RUM Snapshots</name>
    <url>http://YOUR_NEXUS_URL/repository/rum-snapshots/</url>
  </snapshotRepository>
</distributionManagement>
```

### 2. Build and Deploy

```bash
cd Rum

# For release version
mvn clean deploy -DskipTests

# For snapshot version (automatically uses snapshot repository)
mvn clean deploy -DskipTests
```

### 3. Verify Deployment

Check Nexus UI:
- Navigate to **Browse** → **rum-releases** (or **rum-snapshots**)
- Verify `com.example:Rum:VERSION` artifact is present

---

## Frontend Deployment

The frontend (React app) can be deployed as a static site or Docker container.

### Option 1: Static Build Deployment

1. **Build the frontend:**

```bash
cd rum-ui
npm install
npm run build
```

2. **Deploy build artifacts:**

   - Copy `rum-ui/build/` contents to your web server
   - Or upload to Nexus as a generic artifact

3. **Configure API endpoint:**

   Update `rum-ui/src/services/apiService.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_BACKEND_URL/api/rum';
   ```

### Option 2: Docker Deployment

1. **Create Dockerfile** (`rum-ui/Dockerfile`):

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf** (`rum-ui/nginx.conf`):

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

3. **Build and push Docker image:**

```bash
docker build -t rum-ui:latest .
docker tag rum-ui:latest YOUR_NEXUS_URL/rum-docker/rum-ui:latest
docker push YOUR_NEXUS_URL/rum-docker/rum-ui:latest
```

---

## SDK Deployment

### 1. Configure npm Registry

Create `.npmrc` in `rum-sdk/`:

```
registry=http://YOUR_NEXUS_URL/repository/rum-npm/
//YOUR_NEXUS_URL/repository/rum-npm/:_authToken=YOUR_NEXUS_TOKEN
```

### 2. Build SDK

```bash
cd rum-sdk
npm install
npm run build
```

### 3. Publish to Nexus

```bash
# Update package.json version
npm version patch  # or minor, major

# Publish
npm publish --registry=http://YOUR_NEXUS_URL/repository/rum-npm/
```

### 4. Verify SDK Deployment

Check Nexus UI:
- Navigate to **Browse** → **rum-npm**
- Verify package `@your-org/rum-sdk` is present

---

## Verification

### 1. Backend Verification

```bash
# Test backend API
curl http://YOUR_BACKEND_URL/api/rum/health

# Expected response: {"status":"ok"}
```

### 2. Frontend Verification

1. Open browser: `http://YOUR_FRONTEND_URL`
2. Verify dashboard loads
3. Check browser console for errors

### 3. SDK Verification

```bash
# Install SDK from Nexus
npm install @your-org/rum-sdk --registry=http://YOUR_NEXUS_URL/repository/rum-npm/

# Verify installation
npm list @your-org/rum-sdk
```

---

## Troubleshooting

### Maven Deployment Issues

- **401 Unauthorized**: Check credentials in `settings.xml`
- **403 Forbidden**: Verify deployment permissions in Nexus
- **Connection refused**: Verify Nexus URL and network connectivity

### Frontend Build Issues

- **Build fails**: Check Node.js version (requires 18+)
- **API errors**: Verify `API_BASE_URL` in `apiService.js`

### SDK Publishing Issues

- **401 Unauthorized**: Check `.npmrc` authentication token
- **403 Forbidden**: Verify npm publish permissions

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy to Nexus

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
      - name: Deploy to Nexus
        run: |
          cd Rum
          mvn clean deploy -DskipTests
        env:
          NEXUS_USER: ${{ secrets.NEXUS_USER }}
          NEXUS_PASS: ${{ secrets.NEXUS_PASS }}
```

---

## Security Best Practices

1. **Use HTTPS** for Nexus URLs in production
2. **Rotate credentials** regularly
3. **Limit deployment permissions** to CI/CD systems
4. **Enable content validation** in Nexus repositories
5. **Use repository health checks** to monitor artifacts

---

## Additional Resources

- [Nexus Repository Manager Documentation](https://help.sonatype.com/repomanager3)
- [Maven Deployment Guide](https://maven.apache.org/guides/mini/guide-central-repository-upload.html)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

