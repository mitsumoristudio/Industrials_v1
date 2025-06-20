#
## Use Node.js base image
#FROM node:18
#
## Set working directory
#WORKDIR /app
#
## Set env to avoid CI treating warnings as errors
#ENV CI=false
#
## Install dependencies first (caches better)
#COPY package*.json ./
#RUN npm install
#
## Copy source code
#COPY . .
#
## Expose app port
#EXPOSE 5005
#
## Run the server
#CMD ["node", "server.js"]

# --- Build React frontend ---
FROM node:18 as build-frontend
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

# --- Build backend ---
FROM node:18
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend code
COPY backend ./backend

# Copy frontend build into backend (to serve it with Express)
COPY --from=build-frontend /app/frontend/build ./backend/build

# Set working directory to backend
WORKDIR /app/backend

EXPOSE 5005
CMD ["node", "server.js"]