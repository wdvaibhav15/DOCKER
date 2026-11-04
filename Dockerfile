# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./

# Install project dependencies
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# Expose the port your server listens on (change 3000 if your app uses a different port)
EXPOSE 3000

# Define the command to run your application
CMD ["node", "server.js"]