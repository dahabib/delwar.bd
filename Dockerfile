FROM node:20-alpine AS base
RUN apk add --no-cache sqlite-libs openssl
RUN apk add --no-cache libssl1.1 || apk add --no-cache libssl3

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate
RUN yarn build

FROM base AS prod-deps
WORKDIR /app
COPY package.json yarn.lock ./
# Install only production dependencies
RUN yarn install --frozen-lockfile --production

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 sveltekit

# Copy built application
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Copy production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Specifically copy Prisma from builder (it's a devDependency but needed for start.sh migrations)
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma

# Copy entrypoint script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Setup data directory for SQLite
RUN mkdir -p /app/data && chown -R sveltekit:nodejs /app/data

USER sveltekit

EXPOSE 3000

ENV PORT=3000
ENV DATABASE_URL="file:/app/data/dev.db"

CMD ["./start.sh"]
