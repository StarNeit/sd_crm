# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 4173
CMD ["npm", "run", "preview"]
