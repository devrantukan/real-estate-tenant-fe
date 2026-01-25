FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app

# Install dependencies first for better caching
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Final setup
EXPOSE 3001
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

# Use development server for testing
CMD ["npm", "run", "dev"]
