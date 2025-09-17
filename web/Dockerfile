# Dockerfile
FROM node:20-alpine

# Install mysql-client for health check/wait script
RUN apk add --no-cache mysql-client

WORKDIR /usr/src/app

# Copy package files first (leverage layer caching)
COPY package*.json ./

# Install dependencies (production)
RUN npm ci --only=production

# Copy app source
COPY . .

# Copy and set executable for wait-for-db entrypoint script
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Entrypoint will wait for DB, then start the app.
CMD ["sh", "/usr/local/bin/wait-for-db.sh"]
