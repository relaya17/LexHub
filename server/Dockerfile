FROM node:20-alpine AS base
WORKDIR /repo

# Enable pnpm via corepack
RUN corepack enable

# Copy workspace manifests first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY server/package.json server/tsconfig.json server/jest.config.cjs ./server/
COPY packages ./packages
COPY server/src ./server/src
COPY server/tests ./server/tests

# Install only once for the workspace
RUN pnpm install --frozen-lockfile

# Build server (tsc)
RUN pnpm --filter lexhub-server build

EXPOSE 4000

CMD ["pnpm", "--filter", "lexhub-server", "start"]


