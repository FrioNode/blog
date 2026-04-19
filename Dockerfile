# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm


# ---------------- BUILD STAGE ----------------
FROM base AS build

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    python3 \
    pkg-config

COPY package.json pnpm-lock.yaml ./

# install all deps (needed for native build)
RUN pnpm install --frozen-lockfile

COPY . .

# force native rebuild for sqlite
RUN pnpm rebuild better-sqlite3


# ---------------- PRODUCTION STAGE ----------------
FROM base AS runner

WORKDIR /app

COPY --from=build /app /app

# ensure runtime folder exists
RUN mkdir -p /data

ENV DB_PATH=/data/sqlite.db

EXPOSE 3000

CMD ["pnpm", "start"]
