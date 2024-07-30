# Use the official Node.js runtime as the base image for building
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Set environment variables for the React app
ENV REACT_APP_SUPABASE_URL_WS=127.0.0.1
ENV REACT_APP_SUPABASE_URL_PORT=8200

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Install tzdata for timezone settings
RUN apk update && apk add --no-cache tzdata

# Set the timezone environment variable with a default value
ENV TZ=UTC

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
