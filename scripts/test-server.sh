#!/usr/bin/env bash
set -euo pipefail

echo "=== LexHub: Server Tests (Docker Mongo + pnpm) ==="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found. Run: corepack enable"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker not found."
  exit 1
fi

compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
  else
    docker-compose "$@"
  fi
}

cleanup() {
  echo "🧹 Cleanup: removing mongo container..."
  compose rm -sf mongo >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

echo "🔧 Build server (typecheck)..."
pnpm --filter lexhub-server build

echo "🐳 Starting fresh MongoDB container..."
compose rm -sf mongo >/dev/null 2>&1 || true
compose up -d mongo

echo "⏳ Waiting for MongoDB to be ready..."
for i in {1..60}; do
  if docker exec lexhub-mongo mongosh --quiet \
      --username root --password example --authenticationDatabase admin \
      --eval "db.runCommand({ ping: 1 })" >/dev/null 2>&1; then
    echo "✅ MongoDB is ready."
    break
  fi
  sleep 2
  if [[ "$i" -eq 60 ]]; then
    echo "❌ MongoDB did not become ready in time."
    exit 1
  fi
done

export MONGODB_URI_TEST="mongodb://root:example@localhost:27017/lexhub_test?authSource=admin"
export WEB_ORIGIN="${WEB_ORIGIN:-http://localhost:3019}"
export COOKIE_SECURE="${COOKIE_SECURE:-false}"
export COOKIE_SAMESITE="${COOKIE_SAMESITE:-lax}"
export JWT_SECRET="${JWT_SECRET:-test-jwt-secret}"
export JWT_REFRESH_SECRET="${JWT_REFRESH_SECRET:-test-refresh-secret}"

echo "🧪 Running server tests..."
pnpm --filter lexhub-server test

echo "✅ Done."


