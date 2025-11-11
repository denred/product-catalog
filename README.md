# Product Catalog Application

A full-stack web application for managing product catalogs with user authentication and CRUD operations.

## Tech Stack

- **Backend:** NestJS (TypeScript), JWT Authentication, Swagger API Documentation, MongoDB
- **Frontend:** Next.js 16 (React 19, TypeScript), Redux Toolkit, SCSS, Formik + Yup
- **Infrastructure:** Docker + Docker Compose

## Prerequisites

- Docker (v20.0+)
- Docker Compose (v2.0+)
- Git

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/denred/product-catalog.git
cd product-catalog
```

### 2. Backend Configuration

```bash
cd backend
cp example.env .env
# Edit .env file if needed (JWT_SECRET, etc.)
cd ..
```

### 3. Run with Docker (Recommended)

```bash
docker-compose up --build -d
```

## Services

Once running, access these URLs:

- **Frontend Application:** <http://localhost:3000>
- **Backend API:** <http://localhost:4000>
- **API Documentation (Swagger):** <http://localhost:4000/api/docs>
- **MongoDB:** `mongodb://localhost:27017`

## Manual Development Setup

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Available Scripts

### Backend Commands

```bash
npm run start:dev    # Development mode
npm run start:prod   # Production mode
npm run build        # Build application
npm run test         # Run tests
npm run lint         # Lint code
npm run format       # Format code
```

### Frontend Commands

```bash
npm run dev          # Development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
npm run format       # Format code
```

### Docker Commands

```bash
docker-compose up -d          # Start services in background
docker-compose down           # Stop all services
docker-compose logs -f        # View all logs
docker-compose logs backend   # View backend logs only
docker-compose logs frontend  # View frontend logs only
```

## Project Structure

```text
product-catalog/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── products/       # Product management
│   │   ├── users/          # User management
│   │   └── main.ts         # Entry point
│   ├── Dockerfile
│   ├── example.env         # Environment template
│   └── package.json
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # Next.js app router
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store
│   │   └── types/         # TypeScript definitions
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Multi-service configuration
└── README.md
```

## ⚡ Quick Start

```bash
git clone https://github.com/denred/product-catalog.git
cd product-catalog
cp backend/example.env backend/.env
docker-compose up --build
```

**Application available at:** <http://localhost:3000>

## Troubleshooting

### Port Conflicts

```bash
# Kill processes on specific ports
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### Clean Docker Build

```bash
docker system prune -f
docker-compose build --no-cache
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
