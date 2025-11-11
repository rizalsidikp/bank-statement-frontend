# Gunakan base image untuk build
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build project for production
RUN npm run build

# --- Stage 2: Nginx for serving static files ---
FROM nginx:alpine

# Copy the build output to the default Nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Jalankan nginx
CMD ["nginx", "-g", "daemon off;"]
