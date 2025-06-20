FROM ubuntu:latest
LABEL authors="satoshimitsumori"

ENTRYPOINT ["top", "-b"]

# Use Node base image
FROM node:18 as build

# Set working directory
WORKDIR /app

#Install dependencies and build
COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build

ENV CI=false
RUN npm install
RUN npm run build

COPY . .

# Use Nginx to serve build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]