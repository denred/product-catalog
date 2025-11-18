# Product Catalog Backend

A modern REST API backend for a product catalog application built with NestJS and TypeScript.

## Description

This is the backend service for the Product Catalog application, providing a robust API for managing products, users, authentication, and file uploads. The application is built using the NestJS framework and follows modern development practices.

## Features

- 🔐 **Authentication & Authorization** - JWT-based auth with role-based access control
- 📦 **Product Management** - CRUD operations for products with search, filtering, and sorting
- 👥 **User Management** - User registration, profile management, and admin controls
- 📁 **File Upload** - Image upload functionality for product photos
- 🔍 **Search & Filter** - Advanced product search with category and price filters
- 📊 **Validation** - Comprehensive input validation and error handling
- 🐳 **Docker Ready** - Containerized for easy deployment

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Products

- `GET /products` - Get all products (with filtering, sorting, pagination)
- `GET /products/:slug` - Get product by slug
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)

### Users

- `GET /users` - Get all users (Admin only)
- `POST /users` - Create user (Admin only)
- `PUT /users/:id` - Update user (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)

### Upload

- `POST /upload` - Upload image files

## Project Setup

```bash
npm install
```

## Environment Setup

Create a `.env` file based on `example.env`:

```bash
cp example.env .env
```

Update the environment variables according to your setup.

## Run the Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Run Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker Development

The application includes Docker configuration for easy development and deployment.

### Using Docker Compose (Recommended)

Run the entire application stack (backend + database) with Docker Compose from the root directory:

```bash
cd ..
docker-compose up -d
```

### Manual Docker Build

```bash
# Build the image
docker build -t product-catalog-backend .

# Run the container
docker run -p 3001:3001 product-catalog-backend
```

## Project Structure

```
src/
├── auth/              # Authentication module
├── products/          # Products module
├── users/             # Users module
├── upload/            # File upload module
├── app.module.ts      # Main application module
└── main.ts           # Application entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables

Required environment variables (see `example.env`):

- `PORT` - Server port (default: 3001)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRES_IN` - JWT expiration time

## License

This project is licensed under the MIT License.
