
# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Set env to avoid CI treating warnings as errors
ENV CI=false

# Install dependencies first (caches better)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose app port
EXPOSE 5005

# Run the server
CMD ["node", "server.js"]