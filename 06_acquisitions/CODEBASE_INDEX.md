# Acquisitions Application - Codebase Index

## Project Overview
- **Name**: 06_acquisitions
- **Type**: Node.js Express REST API
- **Version**: 1.0.0
- **Architecture**: MVC pattern with service layer
- **Database**: PostgreSQL via Neon Database with Drizzle ORM
- **Security**: ArcJet protection, Helmet, JWT authentication
- **Container**: Docker with development and production configurations

## 📁 Directory Structure

```
06_acquisitions/
├── 📄 Configuration Files
│   ├── .dockerignore              # Docker ignore patterns
│   ├── .env                       # Environment variables (not tracked)
│   ├── .gitignore                # Git ignore patterns
│   ├── .prettierignore           # Prettier ignore patterns
│   ├── .prettierrc               # Prettier configuration
│   ├── Dockerfile                # Production Docker image
│   ├── docker-compose.dev.yml    # Development environment
│   ├── docker-compose.prod.yml   # Production environment
│   ├── drizzle.config.js         # Drizzle ORM configuration
│   ├── eslint.config.js          # ESLint configuration
│   ├── nginx.conf                # Nginx reverse proxy config
│   ├── package.json              # Node.js dependencies & scripts
│   └── package-lock.json         # Locked dependency versions
│
├── 📁 drizzle/                   # Database migrations
│   ├── 0000_magical_psylocke.sql # Initial migration
│   └── meta/                     # Migration metadata
│       ├── 0000_snapshot.json
│       └── _journal.json
│
├── 📁 logs/                      # Application logs
│   ├── combined.log              # All logs
│   └── error.log                 # Error logs only
│
├── 📁 scripts/                   # Utility scripts
│   ├── dev.sh                    # Development startup
│   └── prod.sh                   # Production startup
│
└── 📁 src/                       # Application source code
    ├── index.js                  # Application entry point
    ├── server.js                 # Server initialization
    ├── app.js                    # Express app configuration
    │
    ├── 📁 config/                # Configuration modules
    │   ├── arcjet.js             # ArcJet security config
    │   ├── database.js           # Database connection
    │   └── logger.js             # Winston logger setup
    │
    ├── 📁 controllers/           # Request handlers
    │   ├── auth.controller.js    # Authentication endpoints
    │   └── users.controller.js   # User management endpoints
    │
├── 📁 middleware/            # Express middleware
│   ├── auth.middleware.js    # JWT authentication middleware
│   └── security.middleware.js # ArcJet security middleware
    │
    ├── 📁 models/                # Database models
    │   └── user.model.js         # User table schema
    │
    ├── 📁 routes/                # API route definitions
    │   ├── auth.route.js         # Authentication routes
    │   └── users.route.js        # User management routes
    │
    ├── 📁 services/              # Business logic
    │   ├── auth.service.js       # Authentication services
    │   └── users.service.js      # User management services
    │
    ├── 📁 utils/                 # Utility functions
    │   ├── cookie.js             # Cookie handling
    │   ├── format.js             # Data formatting
    │   └── jwt.js                # JWT token handling
    │
└── 📁 validations/           # Input validation schemas
    ├── auth.validation.js    # Authentication validation
    └── users.validation.js   # User CRUD validation
```

## 🔧 Key Components

### Application Entry Points
- **`src/index.js`**: Main entry point - loads environment and starts server
- **`src/server.js`**: Server initialization and port binding
- **`src/app.js`**: Express application configuration with middleware setup

### Core Architecture

#### Models (Database Layer)
- **`src/models/user.model.js`**: User table schema using Drizzle ORM
  - Fields: id, name, email, password, role, created_at, updated_at
  - Primary key: serial id
  - Unique constraint: email

#### Controllers (Presentation Layer)
- **`src/controllers/auth.controller.js`**: Authentication handlers
  - `signup()`: User registration with validation
  - `signin()`: User authentication with JWT
  - `signout()`: Session termination
- **`src/controllers/users.controller.js`**: User management handlers
  - `fetchAllUsers()`: Get all users (admin only)
  - `fetchUserById()`: Get user by ID with authorization
  - `updateUserById()`: Update user with role-based permissions
  - `deleteUserById()`: Delete user with authorization

#### Services (Business Logic Layer)
- **`src/services/auth.service.js`**: Authentication business logic
  - User creation and authentication
  - Password hashing with bcrypt
- **`src/services/users.service.js`**: User management business logic
  - `getAllUsers()`: Retrieve all users from database
  - `getUserById()`: Retrieve single user by ID
  - `updateUser()`: Update user information with validation
  - `deleteUser()`: Delete user from database

#### Routes (API Layer)
- **`src/routes/auth.route.js`**: Authentication endpoints
  - POST `/api/auth/signup`
  - POST `/api/auth/signin`
  - POST `/api/auth/signout`
- **`src/routes/users.route.js`**: User management endpoints (all require authentication)
  - GET `/api/users` - Get all users (admin only)
  - GET `/api/users/:id` - Get user by ID (owner or admin)
  - PUT `/api/users/:id` - Update user (owner or admin, role changes admin-only)
  - DELETE `/api/users/:id` - Delete user (owner or admin)

### Configuration & Infrastructure

#### Database Configuration
- **`drizzle.config.js`**: Drizzle ORM configuration for PostgreSQL
- **`src/config/database.js`**: Database connection setup
- **`drizzle/`**: Migration files and metadata

#### Security Configuration
- **`src/config/arcjet.js`**: ArcJet security service setup
- **`src/middleware/security.middleware.js`**: Security middleware implementation
- Helmet for security headers
- CORS configuration
- JWT authentication

#### Logging & Monitoring
- **`src/config/logger.js`**: Winston logger configuration
- **`logs/`**: Application log files
- Morgan HTTP request logging
- Health check endpoint at `/health`

### Development & Deployment

#### Docker Configuration
- **`Dockerfile`**: Multi-stage production build
- **`docker-compose.dev.yml`**: Development environment with:
  - Neon Local proxy for ephemeral database branches
  - Hot reload for development
  - Volume mounting for source code
- **`docker-compose.prod.yml`**: Production environment with:
  - Optimized container image
  - Nginx reverse proxy
  - Health checks and resource limits

#### Scripts & Automation
- **`scripts/dev.sh`**: Development environment startup
- **`scripts/prod.sh`**: Production environment startup
- **`nginx.conf`**: Reverse proxy configuration with SSL support

## 🔌 API Endpoints

### Public Endpoints
- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api` - API status

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### User Management Endpoints (Authentication Required)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (owner or admin)
- `PUT /api/users/:id` - Update user (owner or admin, role changes admin-only)
- `DELETE /api/users/:id` - Delete user (owner or admin)

## 🛠 Technology Stack

### Runtime & Framework
- **Node.js 20** (Alpine Linux in container)
- **Express.js 5.1.0** - Web application framework
- **ES6 Modules** - Modern JavaScript module system

### Database & ORM
- **PostgreSQL** via Neon Database
- **Drizzle ORM 0.44.6** - Type-safe database toolkit
- **@neondatabase/serverless 1.0.2** - Neon database driver

### Security & Authentication
- **@arcjet/node 1.0.0-beta.13** - Security service
- **jsonwebtoken 9.0.2** - JWT token handling
- **bcrypt 6.0.0** - Password hashing
- **helmet 8.1.0** - Security headers
- **cors 2.8.5** - Cross-origin resource sharing

### Validation & Utilities
- **zod 4.1.12** - Schema validation
- **cookie-parser 1.4.7** - Cookie handling
- **dotenv 17.2.3** - Environment variable management

### Logging & Monitoring
- **winston 3.18.3** - Application logging
- **morgan 1.10.1** - HTTP request logging

### Development Tools
- **ESLint 9.37.0** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Drizzle Kit 0.31.5** - Database migrations

### Containerization
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Role-based access control (user roles)
- Session management with secure cookies

### Security Middleware
- ArcJet protection against common attacks
- Helmet for security headers
- CORS configuration
- Input validation with Zod schemas

### Production Security
- Non-root container user
- Resource limits and constraints
- SSL/TLS termination at Nginx
- Security headers and rate limiting

## 🚀 Environment Configurations

### Development Environment
- Uses Neon Local proxy for ephemeral database branches
- Hot reload for development
- Enhanced debug logging
- Development-specific environment variables

### Production Environment
- Direct connection to Neon Cloud Database
- Optimized container build
- Nginx reverse proxy with SSL
- Production logging and monitoring
- Health checks and auto-restart policies

## 📦 Package Dependencies

### Production Dependencies (17 packages)
- **Core**: express, dotenv, cookie-parser, cors
- **Database**: @neondatabase/serverless, drizzle-orm
- **Security**: @arcjet/node, @arcjet/inspect, bcrypt, helmet, jsonwebtoken
- **Logging**: winston, morgan
- **Validation**: zod

### Development Dependencies (6 packages)
- **Linting**: @eslint/js, eslint, eslint-config-prettier, eslint-plugin-prettier
- **Formatting**: prettier
- **Database**: drizzle-kit

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## 📝 Development Workflow

### Local Development
1. Clone repository
2. Configure environment variables in `.env`
3. Start development environment: `docker-compose -f docker-compose.dev.yml up --build`
4. Access application at `http://localhost:3000`

### Database Operations
- Generate migrations: `npm run db:generate`
- Run migrations: `npm run db:migrate`
- Open Drizzle Studio: `npm run db:studio`

### Code Quality
- Linting: `npm run lint` / `npm run lint:fix`
- Formatting: `npm run format` / `npm run format:check`

### Production Deployment
1. Configure production environment variables
2. Deploy with: `docker-compose -f docker-compose.prod.yml up -d --build`
3. Access application through Nginx proxy

---

**Last Updated**: $(date)
**Node.js Version**: 20.x
**Database**: PostgreSQL (Neon)
**Container Runtime**: Docker + Docker Compose