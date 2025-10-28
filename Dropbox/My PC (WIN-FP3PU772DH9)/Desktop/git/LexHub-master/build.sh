#!/bin/bash
set -e

# Enable corepack to manage package managers
corepack enable

# Install dependencies using pnpm
pnpm install

# Build the project
pnpm build
