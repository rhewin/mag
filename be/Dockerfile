# Use the official Bun image as the base image
FROM oven/bun:1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lockb to install dependencies
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client (if not already generated)
RUN bunx prisma generate

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "bunx prisma migrate deploy && bunx prisma db seed && bun run src/index.ts"]
