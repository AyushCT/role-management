# Dockerfile

# Dockerfile for building the Docker image of the application

# Use Node.js base image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
