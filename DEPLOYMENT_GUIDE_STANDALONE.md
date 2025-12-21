# RUM System Deployment Guide - Standalone

This guide covers deploying the RUM (Real User Monitoring) system as a standalone application without Nexus.

## Prerequisites

- Java 17+ installed
- Node.js 18+ and npm installed
- Maven 3.6+ installed
- PostgreSQL/Oracle/MySQL database (or use H2 for development)
- Web server (Nginx/Apache) or Docker

## Table of Contents

1. [Backend Deployment](#backend-deployment)
2. [Database Setup](#database-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [SDK Distribution](#sdk-distribution)
5. [Production Configuration](#production-configuration)
6. [Docker Deployment](#docker-deployment)

---

## Backend Deployment

### 1. Build the Backend

```bash
cd Rum
mvn clean package -DskipTests
```

This creates `Rum/target/Rum-0.0.1-SNAPSHOT.jar`

### 2. Configure Application Properties

Edit `Rum/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.address=0.0.0.0

# Database Configuration (PostgreSQL example)
spring.datasource.url=jdbc:postgresql://localhost:5432/rum_db
spring.datasource.username=rum_user
spring.datasource.password=rum_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:3000,http://your-frontend-domain.com
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*

# Logging
logging.level.com.example.Rum=INFO
logging.level.org.springframework.web=WARN
```

### 3. Run the Backend

**Option A: Using Java directly**

```bash
java -jar Rum/target/Rum-0.0.1-SNAPSHOT.jar
```

**Option B: Using Maven**

```bash
cd Rum
mvn spring-boot:run
```

**Option C: As a systemd service (Linux)**

Create `/etc/systemd/system/rum-backend.service`:

```ini
[Unit]
Description=RUM Backend Service
After=network.target

[Service]
Type=simple
User=rum
WorkingDirectory=/opt/rum
ExecStart=/usr/bin/java -jar /opt/rum/Rum-0.0.1-SNAPSHOT.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable rum-backend
sudo systemctl start rum-backend
sudo systemctl status rum-backend
```

---

## Database Setup

### PostgreSQL Setup

1. **Install PostgreSQL:**

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# CentOS/RHEL
sudo yum install postgresql-server postgresql-contrib
```

2. **Create Database and User:**

```bash
sudo -u postgres psql

CREATE DATABASE rum_db;
CREATE USER rum_user WITH PASSWORD 'rum_password';
GRANT ALL PRIVILEGES ON DATABASE rum_db TO rum_user;
\q
```

3. **Update application.properties** with database credentials

### Oracle Setup

1. **Create tablespace and user:**

```sql
CREATE TABLESPACE rum_ts
DATAFILE '/u01/oracle/data/rum_ts.dbf' SIZE 100M
AUTOEXTEND ON;

CREATE USER rum_user IDENTIFIED BY rum_password
DEFAULT TABLESPACE rum_ts
TEMPORARY TABLESPACE temp;

GRANT CONNECT, RESOURCE TO rum_user;
GRANT UNLIMITED TABLESPACE TO rum_user;
```

2. **Use Oracle-specific properties:**

Edit `application-oracle.properties`:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
spring.datasource.username=rum_user
spring.datasource.password=rum_password
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
```

3. **Run with Oracle profile:**

```bash
java -jar Rum-0.0.1-SNAPSHOT.jar --spring.profiles.active=oracle
```

### H2 Database (Development Only)

For development/testing, H2 is included. No setup required - it creates an in-memory database automatically.

---

## Frontend Deployment

### 1. Build the Frontend

```bash
cd rum-ui
npm install
npm run build
```

This creates `rum-ui/build/` directory with production files.

### 2. Configure API Endpoint

Before building, update `rum-ui/src/services/apiService.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://your-backend-domain.com:8080/api/rum';
```

Or set environment variable:

```bash
export REACT_APP_API_URL=http://your-backend-domain.com:8080/api/rum
npm run build
```

### 3. Deploy Frontend

**Option A: Nginx**

1. **Install Nginx:**

```bash
# Ubuntu/Debian
sudo apt-get install nginx

# CentOS/RHEL
sudo yum install nginx
```

2. **Copy build files:**

```bash
sudo cp -r rum-ui/build/* /var/www/html/rum/
```

3. **Configure Nginx** (`/etc/nginx/sites-available/rum`):

```nginx
server {
    listen 80;
    server_name your-frontend-domain.com;
    root /var/www/html/rum;
    index index.html;

    # Frontend routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. **Enable site:**

```bash
sudo ln -s /etc/nginx/sites-available/rum /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Option B: Apache**

1. **Install Apache:**

```bash
# Ubuntu/Debian
sudo apt-get install apache2

# CentOS/RHEL
sudo yum install httpd
```

2. **Copy build files:**

```bash
sudo cp -r rum-ui/build/* /var/www/html/rum/
```

3. **Configure Apache** (`/etc/apache2/sites-available/rum.conf`):

```apache
<VirtualHost *:80>
    ServerName your-frontend-domain.com
    DocumentRoot /var/www/html/rum

    <Directory /var/www/html/rum>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # API proxy
    ProxyPass /api http://localhost:8080/api
    ProxyPassReverse /api http://localhost:8080/api

    ErrorLog ${APACHE_LOG_DIR}/rum_error.log
    CustomLog ${APACHE_LOG_DIR}/rum_access.log combined
</VirtualHost>
```

4. **Enable site:**

```bash
sudo a2ensite rum.conf
sudo a2enmod proxy proxy_http rewrite
sudo systemctl restart apache2
```

---

## SDK Distribution

### Option 1: npm Registry (Public/Private)

1. **Build SDK:**

```bash
cd rum-sdk
npm install
npm run build
```

2. **Publish to npm:**

```bash
# Public npm registry
npm publish

# Private registry
npm publish --registry=https://your-registry.com
```

### Option 2: Direct Distribution

1. **Build SDK:**

```bash
cd rum-sdk
npm install
npm run build
```

2. **Package for distribution:**

```bash
# Create tarball
cd dist
tar -czf rum-sdk-VERSION.tgz .

# Or zip
zip -r rum-sdk-VERSION.zip .
```

3. **Distribute via:**
   - GitHub Releases
   - CDN
   - Direct download link
   - Package manager

### Option 3: CDN Distribution

1. **Build SDK:**

```bash
cd rum-sdk
npm run build
```

2. **Upload to CDN:**
   - Upload `dist/index.js` and `dist/index.d.ts` to your CDN
   - Provide CDN URL for users to include

3. **Usage:**

```html
<script src="https://your-cdn.com/rum-sdk/v1.0.0/index.js"></script>
```

---

## Production Configuration

### 1. Environment Variables

Create `.env` file or set system environment variables:

```bash
# Backend
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/rum_db
export SPRING_DATASOURCE_USERNAME=rum_user
export SPRING_DATASOURCE_PASSWORD=rum_password
export SERVER_PORT=8080

# Frontend
export REACT_APP_API_URL=http://your-backend-domain.com:8080/api/rum
```

### 2. Security Hardening

1. **Enable HTTPS:**

   - Use Let's Encrypt for SSL certificates
   - Configure Nginx/Apache with SSL
   - Redirect HTTP to HTTPS

2. **Firewall Configuration:**

```bash
# Allow only necessary ports
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp  # Only if backend is directly exposed
sudo ufw enable
```

3. **Database Security:**

   - Use strong passwords
   - Limit database user permissions
   - Enable SSL for database connections
   - Regular backups

### 3. Monitoring and Logging

1. **Application Logs:**

```bash
# Backend logs
tail -f /var/log/rum-backend.log

# Nginx logs
tail -f /var/log/nginx/rum_access.log
tail -f /var/log/nginx/rum_error.log
```

2. **Set up log rotation:**

Create `/etc/logrotate.d/rum-backend`:

```
/var/log/rum-backend.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
}
```

---

## Docker Deployment

### 1. Backend Dockerfile

Create `Rum/Dockerfile`:

```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/Rum-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 2. Frontend Dockerfile

Create `rum-ui/Dockerfile`:

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

### 3. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: rum_db
      POSTGRES_USER: rum_user
      POSTGRES_PASSWORD: rum_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: ./Rum
      dockerfile: Dockerfile
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://database:5432/rum_db
      SPRING_DATASOURCE_USERNAME: rum_user
      SPRING_DATASOURCE_PASSWORD: rum_password
    ports:
      - "8080:8080"
    depends_on:
      - database

  frontend:
    build:
      context: ./rum-ui
      dockerfile: Dockerfile
    environment:
      REACT_APP_API_URL: http://localhost:8080/api/rum
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### 4. Deploy with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## Verification

### 1. Backend Health Check

```bash
curl http://localhost:8080/api/rum/health
# Expected: {"status":"ok"}
```

### 2. Frontend Access

Open browser: `http://your-frontend-domain.com`

### 3. SDK Integration Test

```javascript
import { RUMWrapper } from '@your-org/rum-sdk';

const rum = new RUMWrapper({
  backendUrl: 'http://your-backend-domain.com:8080/api/rum'
});

rum.start();
```

---

## Troubleshooting

### Backend Issues

- **Port already in use**: Change `server.port` in `application.properties`
- **Database connection failed**: Verify database is running and credentials are correct
- **CORS errors**: Update `spring.web.cors.allowed-origins` in properties

### Frontend Issues

- **API calls failing**: Check `API_BASE_URL` and CORS configuration
- **Build fails**: Ensure Node.js 18+ is installed
- **Blank page**: Check browser console for errors

### Database Issues

- **Connection timeout**: Verify database is accessible and firewall allows connections
- **Schema errors**: Check `spring.jpa.hibernate.ddl-auto` setting

---

## Backup and Recovery

### Database Backup

```bash
# PostgreSQL
pg_dump -U rum_user rum_db > rum_backup_$(date +%Y%m%d).sql

# Restore
psql -U rum_user rum_db < rum_backup_20240101.sql
```

### Application Backup

```bash
# Backup JAR file
cp Rum-0.0.1-SNAPSHOT.jar backups/Rum-0.0.1-SNAPSHOT_$(date +%Y%m%d).jar

# Backup frontend build
tar -czf rum-ui-build_$(date +%Y%m%d).tar.gz rum-ui/build/
```

---

## Performance Optimization

1. **Enable Gzip compression** in Nginx/Apache
2. **Configure caching** for static assets
3. **Use connection pooling** for database
4. **Enable JPA query caching**
5. **Monitor JVM memory** usage

---

## Additional Resources

- [Spring Boot Deployment Guide](https://spring.io/guides/gs/spring-boot/)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)

