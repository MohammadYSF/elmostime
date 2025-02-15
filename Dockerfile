# Use Node.js as the base image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Svelte app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html


COPY .well-known/acme-challenge/NaYRL5XDNW3pkyk6OmirEH3tqTZ4s3ufE4DVVBVu_ac.txt /usr/share/nginx/html/.well-known/acme-challenge/
COPY .well-known/acme-challenge/SeiSO0Tx5J5gzT0wC4eTprA38-_MfdyrJIXrYzn0aWQ.txt /usr/share/nginx/html/.well-known/acme-challenge/


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
