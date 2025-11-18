# Product Catalog Frontend

A modern, responsive web application for browsing and managing products, built with Next.js, TypeScript, and SCSS.

## Description

This is the frontend client for the Product Catalog application, providing an intuitive user interface for browsing products, user authentication, and administrative functions. The application features a modern design with advanced filtering, search capabilities, and responsive layout.

## Features

- 🛍️ **Product Browsing** - Browse products with beautiful card layouts and detailed views
- 🔍 **Advanced Search** - Real-time search with filtering by category, price range, and sorting
- 🔐 **User Authentication** - Login/register with JWT-based authentication
- 👑 **Admin Panel** - Administrative interface for managing products and users
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations
- 📸 **Image Upload** - Product image management with drag-and-drop support
- ⚡ **Performance** - Optimized with Next.js features like SSR and image optimization

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS/Sass
- **State Management**: Redux Toolkit (RTK Query)
- **Authentication**: JWT with Context API
- **Image Handling**: Next.js Image component
- **Form Validation**: Custom validation utilities
- **Icons**: Custom SVG icon components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file based on `example.env`:

```bash
cp example.env .env.local
```

Update the environment variables according to your setup.

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product-related pages
│   └── users/             # User management pages
├── components/            # Reusable UI components
│   ├── ProductCard/       # Product display components
│   ├── Navbar/           # Navigation components
│   ├── ProductForm/      # Product form components
│   └── ...               # Other UI components
├── contexts/             # React Context providers
├── store/                # Redux Toolkit store and API slices
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── validations/          # Form validation schemas
└── styles/               # Global styles and SCSS modules
```

## Key Features

### Product Management

- Browse products with pagination
- Advanced filtering (category, price range)
- Sorting options (price, name, date)
- Product detail pages with full information
- Admin CRUD operations for products

### User Authentication

- User registration and login
- JWT token management
- Protected routes and role-based access
- User profile management

### Admin Features

- Product management (create, edit, delete)
- User management and role assignment
- Image upload for product photos
- Administrative dashboard

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## Docker Development

The application includes Docker configuration for containerized development.

### Using Docker Compose (Recommended)

Run the entire application stack from the root directory:

```bash
cd ..
docker-compose up -d
```

### Manual Docker Build

```bash
# Build the image
docker build -t product-catalog-frontend .

# Run the container
docker run -p 3000:3000 product-catalog-frontend
```

## Environment Variables

Required environment variables (see `example.env`):

- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL
- `NEXT_PUBLIC_APP_URL` - Frontend application URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language reference
- [Redux Toolkit](https://redux-toolkit.js.org/) - Modern Redux development
- [Sass Documentation](https://sass-lang.com/documentation) - CSS extension language

## License

This project is licensed under the MIT License.
