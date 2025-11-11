
FROM node:22-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for development)
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 4000

# Default command (can be overridden in docker-compose)
CMD ["npm", "run", "start:dev"]
