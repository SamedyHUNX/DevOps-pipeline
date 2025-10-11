# Multi-stage Dockerfile for Node.js Acquisitions Application

# Base stage - common dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Copy package files
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 3000

# Development command with hot reload
CMD ["npm", "run", "dev"]

# Production dependencies stage
FROM base AS dependencies
ENV NODE_ENV=production

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM node:20-alpine AS production
ENV NODE_ENV=production

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeapp -u 1001

WORKDIR /app

# Copy production dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY --chown=nodeapp:nodejs . .

# Create logs directory with proper permissions
RUN mkdir -p logs && chown -R nodeapp:nodejs logs

# Switch to non-root user
USER nodeapp

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); \
    const req = http.request('http://localhost:3000/health', (res) => { \
        process.exit(res.statusCode === 200 ? 0 : 1); \
    }); \
    req.on('error', () => process.exit(1)); \
    req.end();"

# Production command
CMD ["npm", "start"]