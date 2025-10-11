# Acquisitions Application

A Node.js Express application with Neon Database integration, designed to work seamlessly in both development and production environments using Docker.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Development Environment](#development-environment)
- [Production Environment](#production-environment)
- [Environment Variables](#environment-variables)
- [Database Management](#database-management)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🏗️ Architecture Overview

This application uses a dual-environment Docker setup:

- **Development**: Uses Neon Local proxy for local database development with ephemeral branches
- **Production**: Connects directly to Neon Cloud Database with optimized container configuration

### Technology Stack

- **Runtime**: Node.js 20 (Alpine)
- **Framework**: Express.js
- **Database**: PostgreSQL via Neon Database
- **ORM**: Drizzle ORM
- **Security**: Helmet, ArcJet
- **Logging**: Winston, Morgan
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Docker (v20.10+) and Docker Compose (v2.0+)
- Node.js 20+ (for local development without Docker)
- Neon Database account with API access

### Required Neon Database Setup

1. Create a Neon project at [neon.tech](https://neon.tech)
2. Get your API key from the Neon Dashboard
3. Note your Project ID and Branch ID

## 🔧 Development Environment

The development environment uses **Neon Local**, a proxy service that creates ephemeral database branches automatically.

### Quick Start

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd 06_acquisitions
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.development .env
   ```

3. **Edit `.env` file with your Neon credentials**:
   ```env
   NEON_API_KEY=your_neon_api_key_here
   NEON_PROJECT_ID=your_neon_project_id_here  
   PARENT_BRANCH_ID=your_parent_branch_id_here
   ARCJET_KEY=your_arcjet_key_here
   ```

4. **Start development environment**:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

5. **Access the application**:
   - Application: http://localhost:3000
   - Health Check: http://localhost:3000/health
   - API: http://localhost:3000/api

### Development Features

- **Hot Reload**: Source code changes are automatically reflected
- **Ephemeral Database**: Fresh database branch created on each startup
- **Debug Logging**: Enhanced logging for development
- **Database Tools**: Access to Drizzle Studio via `npm run db:studio`

### Development Commands

```bash
# Start with build
docker-compose -f docker-compose.dev.yml up --build

# Start in background
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down

# Stop and remove volumes
docker-compose -f docker-compose.dev.yml down -v

# Run database migrations
docker-compose -f docker-compose.dev.yml exec app npm run db:migrate

# Generate database schema
docker-compose -f docker-compose.dev.yml exec app npm run db:generate
```

## 🚀 Production Environment

The production environment connects directly to Neon Cloud Database with optimized container settings.

### Production Deployment

1. **Set up environment variables**:
   ```bash
   cp .env.production .env
   ```

2. **Configure production variables**:
   ```env
   DATABASE_URL=postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require
   ARCJET_KEY=your_production_arcjet_key
   ```

3. **Deploy with Docker Compose**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

4. **With Nginx reverse proxy** (recommended):
   ```bash
   # Make sure you have SSL certificates in ./ssl/ directory
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

### Production Features

- **Optimized Container**: Multi-stage build with production dependencies only
- **Security**: Non-root user, resource limits, security headers
- **Health Checks**: Automated health monitoring
- **Reverse Proxy**: Optional Nginx with SSL, rate limiting, and compression
- **Resource Limits**: CPU and memory constraints for stability

### Production Commands

```bash
# Deploy production stack
docker-compose -f docker-compose.prod.yml up -d --build

# View production logs
docker-compose -f docker-compose.prod.yml logs -f app

# Scale application (if needed)
docker-compose -f docker-compose.prod.yml up -d --scale app=3

# Update application
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d --build

# Stop production stack
docker-compose -f docker-compose.prod.yml down
```

## 🔐 Environment Variables

### Development (.env.development)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | Yes |
| `PORT` | Application port | Yes |
| `DATABASE_URL` | Neon Local connection string | Yes |
| `NEON_API_KEY` | Neon API key | Yes |
| `NEON_PROJECT_ID` | Neon project ID | Yes |
| `PARENT_BRANCH_ID` | Parent branch for ephemeral branches | Yes |
| `ARCJET_KEY` | ArcJet security key | Yes |

### Production (.env.production)

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode | Yes |
| `PORT` | Application port | Yes |
| `DATABASE_URL` | Neon Cloud connection string | Yes |
| `ARCJET_KEY` | ArcJet security key | Yes |
| `TRUST_PROXY` | Proxy trust setting | No |

## 🗄️ Database Management

### Development Database Operations

```bash
# Generate new migration
docker-compose -f docker-compose.dev.yml exec app npm run db:generate

# Run migrations
docker-compose -f docker-compose.dev.yml exec app npm run db:migrate

# Open Drizzle Studio
docker-compose -f docker-compose.dev.yml exec app npm run db:studio
```

### Production Database Operations

```bash
# Run migrations in production
docker-compose -f docker-compose.prod.yml exec app npm run db:migrate

# Check database connection
docker-compose -f docker-compose.prod.yml exec app node -e "console.log('DB URL:', process.env.DATABASE_URL)"
```

### Database Connection Details

**Development (Neon Local)**:
- Host: `neon-local` (within Docker network)
- Port: `5432`
- Database: `neondb`
- Connection: `postgres://neon:npg@neon-local:5432/neondb?sslmode=require`

**Production (Neon Cloud)**:
- Connection: Provided via `DATABASE_URL` environment variable
- Format: `postgresql://user:pass@ep-xxx-pooler.region.aws.neon.tech/dbname?sslmode=require`

## 🛠️ Troubleshooting

### Common Issues

**1. Neon Local Connection Failed**
```bash
# Check Neon Local container logs
docker-compose -f docker-compose.dev.yml logs neon-local

# Verify environment variables
docker-compose -f docker-compose.dev.yml exec neon-local env | grep NEON
```

**2. Application Won't Start**
```bash
# Check application logs
docker-compose -f docker-compose.dev.yml logs app

# Verify database connectivity
docker-compose -f docker-compose.dev.yml exec app npm run db:studio
```

**3. Permission Errors in Production**
```bash
# Check container user
docker-compose -f docker-compose.prod.yml exec app whoami

# Fix log directory permissions
sudo chown -R 1001:1001 logs/
```

**4. SSL Certificate Issues (Production)**
```bash
# Verify certificate files
ls -la ssl/

# Test without SSL temporarily
# Comment out nginx service and use app directly on port 3000
```

### Health Checks

- **Development**: http://localhost:3000/health
- **Production**: http://localhost/health or https://your-domain/health

### Log Locations

- **Container logs**: `docker-compose logs -f`
- **Application logs**: `./logs/combined.log` and `./logs/error.log`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and test in development environment
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Workflow

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Make code changes (hot reload active)
# Test your changes at http://localhost:3000

# Run linting and formatting
docker-compose -f docker-compose.dev.yml exec app npm run lint:fix
docker-compose -f docker-compose.dev.yml exec app npm run format

# Test production build locally
docker-compose -f docker-compose.prod.yml up --build
```

## 📄 License

This project is licensed under the ISC License.

---

**Need Help?** Check the troubleshooting section above or create an issue in the repository.