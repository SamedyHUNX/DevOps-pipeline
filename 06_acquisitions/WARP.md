# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an **Acquisitions API** - a Node.js/Express.js authentication service using Drizzle ORM with Neon Serverless PostgreSQL. The project uses ES modules and includes path aliases for cleaner imports.

## Common Commands

### Development
```bash
# Start development server with auto-reload
npm run dev
```

### Code Quality
```bash
# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format <files>

# Check code formatting
npm run format:check
```

### Database Operations
```bash
# Generate database migrations from schema changes
npm run db:generate

# Apply migrations to database
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

## Architecture Overview

### Application Structure

The application follows a **layered architecture** with clear separation of concerns:

**Entry Point Flow:**
```
index.js → loads environment → server.js → starts HTTP server → app.js (Express app configuration)
```

**Request Flow:**
```
app.js (middleware) → routes → controllers → services → database
```

### Path Aliases

The project uses Node.js subpath imports (defined in `package.json`) for cleaner imports:

- `#config/*` → `./src/config/*`
- `#contollers/*` → `./src/controllers/*` (note: typo in package.json)
- `#middleware/*` → `./src/middleware/*`
- `#models/*` → `./src/models/*`
- `#routes/*` → `./src/routes/*`
- `#services/*` → `./src/services/*`
- `#utils/*` → `./src/utils/*`
- `#validations/*` → `./src/validations/*`

### Key Components

#### Configuration Layer (`src/config/`)
- **database.js**: Drizzle ORM setup with Neon serverless PostgreSQL connection
- **logger.js**: Winston logger configured with file transports (`logs/error.log`, `logs/combined.log`) and console output in development

#### Model Layer (`src/models/`)
- Uses **Drizzle ORM** with PostgreSQL
- Models define database schemas using `drizzle-orm/pg-core`
- Current model: `users` table with fields: id, name, email, password, role, created_at, updated_at
- Schema changes require running `npm run db:generate` and `npm run db:migrate`

#### Service Layer (`src/services/`)
- Contains business logic and database operations
- Uses Drizzle ORM queries with `db.select()`, `db.insert()`, etc.
- Password hashing with bcrypt (10 rounds)
- Returns data without password fields

#### Controller Layer (`src/controllers/`)
- Handles HTTP request/response
- Validates input using Zod schemas via `safeParse()`
- Uses formatted validation errors from `#utils/format.js`
- Sets JWT tokens as HTTP-only cookies
- Logs user actions

#### Validation Layer (`src/validations/`)
- Uses **Zod** for schema validation
- Schemas include: `signupSchema`, `singinSchema` (note: typo)
- Validation is done with `.safeParse()` in controllers

#### Routes Layer (`src/routes/`)
- Express Router for endpoint definitions
- Current routes: `/api/auth/sign-up`, `/api/auth/sign-in`, `/api/auth/sign-out`
- Mounted at `/api/auth` in app.js

#### Utilities (`src/utils/`)
- **jwt.js**: JWT token signing and verification (default 1-day expiration)
- **cookie.js**: Cookie management with security options (httpOnly, secure in production, sameSite: strict)
- **format.js**: Zod validation error formatting

### Middleware Stack (in order)

1. **helmet**: Security headers
2. **cors**: CORS configuration
3. **express.json()**: JSON body parsing
4. **express.urlencoded()**: URL-encoded body parsing
5. **cookie-parser**: Cookie parsing
6. **morgan**: HTTP request logging (combined format to Winston)

### Database Workflow

The project uses Drizzle ORM with a migration-based workflow:

1. Define or modify schemas in `src/models/*.js` using Drizzle schema syntax
2. Generate migrations: `npm run db:generate` (creates SQL in `drizzle/` directory)
3. Apply migrations: `npm run db:migrate`
4. Database connection uses Neon serverless HTTP (not WebSocket/TCP)

Configuration is in `drizzle.config.js`:
- Schema: `./src/models/*.js`
- Output: `./drizzle`
- Dialect: `postgresql`

## Environment Configuration

Required environment variables (see `.env.example`):

```bash
PORT=            # Server port (default: 8000)
NODE_ENV=        # Environment (development/production)
LOG_LEVEL=       # Winston log level (default: info)
DATABASE_URL=    # Neon PostgreSQL connection string
JWT_SECRET=      # JWT signing secret (required for production)
```

**Important:** 
- Logs are written to `logs/` directory
- In production, `NODE_ENV=production` enables secure cookies and disables console logging
- JWT_SECRET defaults to a placeholder but MUST be set for production

## Code Style Conventions

### ESLint Rules
- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Unused vars**: Allowed if prefixed with `_`
- **Line endings**: Unix (LF)
- **Modern syntax**: `const` over `let`, no `var`, arrow functions preferred

### Prettier Configuration
- Single quotes
- 2-space tabs
- 80 character line width
- Trailing commas (ES5)
- Arrow function parens: avoid

## Current Implementation Status

**Completed:**
- User signup endpoint with validation, password hashing, and JWT authentication
- Database schema with users table
- Logger configuration with file and console transports
- Security middleware (helmet, cors)

**Not Yet Implemented:**
- Sign-in endpoint (route exists but returns placeholder)
- Sign-out endpoint (route exists but returns placeholder)
- Authentication middleware for protected routes
- Password comparison logic for sign-in
- Additional models/resources beyond users

## Working with Authentication

The authentication flow uses:
1. **JWT tokens** stored in HTTP-only cookies (15-minute max age)
2. **bcrypt** for password hashing (10 rounds)
3. **Zod schemas** for input validation

Token payload includes: `{ id, email, role }`

Cookie configuration is environment-aware:
- Development: httpOnly, sameSite: strict
- Production: adds `secure: true` flag
