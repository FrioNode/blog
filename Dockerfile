# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
ENV NODE_ENV="production"

ARG PNPM_VERSION=latest
RUN npm install -g pnpm@$PNPM_VERSION


# ---------------- BUILD STAGE ----------------
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    python-is-python3 \
    pkg-config \
    node-gyp

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# 🔥 CRITICAL: rebuild native modules for target env
RUN pnpm rebuild better-sqlite3


# ---------------- FINAL STAGE ----------------
FROM base

COPY --from=build /app /app

WORKDIR /app

# ensure runtime can use sqlite file
RUN mkdir -p /data
VOLUME /data

EXPOSE 3000

ENV DB_PATH="/data/sqlite.db"

CMD ["pnpm", "run", "start"]
