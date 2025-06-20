
# Use Node base image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code (public, src, etc.)
COPY . .

# Optional: Turn off CI strict mode
ENV CI=false

# Build React app
RUN npm run build

# Use Nginx to serve the built React app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]