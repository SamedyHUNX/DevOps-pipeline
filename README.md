# DevOps Learning Repository 🚀

A comprehensive collection of DevOps projects demonstrating modern containerization, CI/CD pipelines, orchestration, and deployment practices. This repository contains hands-on examples progressing from basic concepts to advanced production-ready applications.

## 📋 Table of Contents

- [Projects Overview](#projects-overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Technology Stack](#technology-stack)
- [Learning Path](#learning-path)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Projects Overview

This repository contains 6 progressive projects, each building upon DevOps concepts:

### 01. CI/CD Pipeline 🔄
**Path:** `01_cicd_pipeline/`  
**Focus:** Basic CI/CD concepts and automated testing

A simple Node.js application demonstrating fundamental CI/CD pipeline concepts with automated testing.

**Key Features:**
- Basic Node.js application structure
- Automated test execution
- Foundation for CI/CD integration

**Technologies:** Node.js, NPM Scripts

---

### 02. Docker Basics 🐳
**Path:** `02_docker/`  
**Focus:** Container fundamentals

Introduction to Docker containerization with a minimal Node.js application.

**Key Features:**
- Basic Dockerfile creation
- Container image building
- Simple containerized application

**Technologies:** Docker, Node.js Alpine

---

### 03. React Docker Application 🎨
**Path:** `03_react_docker/`  
**Focus:** Frontend application containerization

A React application built with Vite and TypeScript, demonstrating frontend containerization practices.

**Key Features:**
- React 19 with TypeScript
- Vite build tooling
- ESLint configuration
- Docker containerization for frontend apps

**Technologies:** React, TypeScript, Vite, Docker

---

### 04. Vite Project with Docker Compose 🏗️
**Path:** `04_vite_project/`  
**Focus:** Multi-container orchestration

Enhanced React application with Docker Compose orchestration and development workflow optimization.

**Key Features:**
- React application with Vite
- Docker Compose configuration
- Development and production configurations
- Volume mounting for development

**Technologies:** React, Vite, Docker Compose

---

### 05. Kubernetes Deployment ☸️
**Path:** `05_k8s/`  
**Focus:** Container orchestration and scaling

Express.js application with full Kubernetes deployment configuration, demonstrating container orchestration.

**Key Features:**
- Express.js API server
- Kubernetes deployment manifests
- Service configuration
- Health checks and probes
- Resource limits and requests
- Horizontal scaling configuration

**Technologies:** Express.js, Docker, Kubernetes, YAML

---

### 06. Acquisitions - Production Application 🏢
**Path:** `06_acquisitions/`  
**Focus:** Production-ready enterprise application

A comprehensive Node.js application showcasing enterprise-grade DevOps practices with database integration, security, and monitoring.

**Key Features:**
- Express.js with comprehensive middleware
- Neon Database (PostgreSQL) integration
- Drizzle ORM with migrations
- Security with Helmet and ArcJet
- Docker multi-environment setup (dev/prod)
- Nginx reverse proxy
- Logging with Winston and Morgan
- Testing with Jest
- Code quality with ESLint and Prettier
- Database management scripts

**Technologies:** Express.js, PostgreSQL, Drizzle ORM, Docker Compose, Nginx, Security Middleware

## 🔧 Prerequisites

Before getting started, ensure you have the following installed:

### Required Tools
- **Docker** (v20.10+) - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** (v2.0+) - [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js** (v20+) - [Install Node.js](https://nodejs.org/)
- **Git** - [Install Git](https://git-scm.com/downloads)

### Optional Tools (for advanced projects)
- **Kubernetes** (kubectl, minikube, or cloud provider) - [Install Kubernetes](https://kubernetes.io/docs/setup/)
- **Neon Database Account** (for project 06) - [Sign up at neon.tech](https://neon.tech)

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd devops
   ```

2. **Choose a project to explore:**
   ```bash
   # Start with Docker basics
   cd 02_docker
   docker build -t hello-docker .
   docker run hello-docker
   ```

3. **Or jump to a more advanced project:**
   ```bash
   # Try the Kubernetes project
   cd 05_k8s
   npm install
   npm run dev
   ```

4. **For the full production application:**
   ```bash
   cd 06_acquisitions
   # Follow the detailed README.md in that directory
   ```

## 🛠️ Technology Stack

This repository demonstrates proficiency with:

### **Containerization & Orchestration**
- Docker & Docker Compose
- Kubernetes (Deployments, Services, ConfigMaps)
- Multi-stage Docker builds
- Container security practices

### **Frontend Technologies**
- React 19 with TypeScript
- Vite build tooling
- Modern JavaScript/ES6+

### **Backend Technologies**
- Node.js & Express.js
- RESTful API design
- Database integration (PostgreSQL via Neon)
- ORM (Drizzle)

### **DevOps & Infrastructure**
- CI/CD pipeline concepts
- Environment configuration management
- Health checks and monitoring
- Reverse proxy configuration (Nginx)
- SSL/TLS setup

### **Security & Quality**
- Security middleware (Helmet, ArcJet)
- Code linting (ESLint)
- Code formatting (Prettier)
- Testing frameworks (Jest)
- Security best practices

### **Database & Persistence**
- PostgreSQL with Neon Database
- Database migrations
- ORM patterns
- Connection pooling

## 📚 Learning Path

Follow this suggested learning path to maximize your DevOps journey:

### **Beginner Path**
1. **01_cicd_pipeline** - Understand CI/CD fundamentals
2. **02_docker** - Learn containerization basics
3. **03_react_docker** - Apply Docker to frontend applications

### **Intermediate Path**
4. **04_vite_project** - Master Docker Compose and multi-container apps
5. **05_k8s** - Explore Kubernetes orchestration

### **Advanced Path**
6. **06_acquisitions** - Study production-ready application architecture

### **Skills You'll Develop**
- Container orchestration and management
- CI/CD pipeline design and implementation
- Microservices architecture patterns
- Infrastructure as Code practices
- Security and monitoring implementation
- Database management in containerized environments
- Production deployment strategies

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m 'Add amazing feature'`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow existing code style and conventions
- Add documentation for new features
- Include tests for new functionality
- Update README files as needed

## 📁 Repository Structure

```
devops/
├── 01_cicd_pipeline/          # Basic CI/CD concepts
│   ├── index.js               # Main application
│   ├── test.js                # Test suite
│   └── package.json           # Dependencies
├── 02_docker/                 # Docker fundamentals
│   ├── Dockerfile             # Container configuration
│   └── hello.js               # Simple Node.js app
├── 03_react_docker/           # React with Docker
│   ├── src/                   # React source code
│   ├── Dockerfile             # React container config
│   └── package.json           # React dependencies
├── 04_vite_project/           # Docker Compose project
│   ├── src/                   # Vite React app
│   ├── compose.yaml           # Docker Compose config
│   └── Dockerfile             # Multi-stage build
├── 05_k8s/                    # Kubernetes deployment
│   ├── k8s/                   # Kubernetes manifests
│   │   ├── deployment.yaml    # K8s deployment config
│   │   └── service.yaml       # K8s service config
│   ├── index.js               # Express.js API
│   └── deploy.sh              # Deployment script
├── 06_acquisitions/           # Production application
│   ├── src/                   # Application source
│   ├── docker-compose.dev.yml # Development environment
│   ├── docker-compose.prod.yml# Production environment
│   ├── drizzle.config.js      # Database configuration
│   └── nginx.conf             # Reverse proxy config
└── README.md                  # This file
```

## 📞 Support & Questions

If you have questions or need help:

1. **Check the individual project README files** - Each project has detailed setup instructions
2. **Review the code comments** - Inline documentation explains key concepts
3. **Open an issue** - Use GitHub issues for bug reports or feature requests

## 📄 License

This project is licensed under the ISC License - see the individual `package.json` files for details.

---

**Happy Learning! 🎓**

This repository represents a journey through modern DevOps practices. Each project builds upon the previous one, creating a comprehensive learning experience from basic containerization to production-ready applications.

Start with project 01 and work your way through, or dive into any project that matches your current skill level. The key is to understand not just *how* to implement these technologies, but *why* they're important in modern software development and deployment.