# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json* ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Next.js app for production
RUN npm run build

# Step 7: Expose the default port (3000) for the Next.js app
EXPOSE 5000

# Step 8: Start the Next.js app in production mode
CMD ["npm", "start"]
