Param(
  [int]$MaxWaitSeconds = 120
)

$ErrorActionPreference = "Stop"

Write-Host "=== LexHub: Server Tests (Docker Mongo + pnpm) ==="

Set-Location (Resolve-Path "$PSScriptRoot\..")

function Compose {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)
  try {
    docker compose version *> $null
    docker compose @Args
  } catch {
    docker-compose @Args
  }
}

try {
  Write-Host "🔧 Build server (typecheck)..."
  pnpm --filter lexhub-server build

  Write-Host "🐳 Starting fresh MongoDB container..."
  try { Compose rm -sf mongo *> $null } catch {}
  Compose up -d mongo | Out-Null

  Write-Host "⏳ Waiting for MongoDB to be ready..."
  $deadline = (Get-Date).AddSeconds($MaxWaitSeconds)
  while ((Get-Date) -lt $deadline) {
    try {
      docker exec lexhub-mongo mongosh --quiet --username root --password example --authenticationDatabase admin --eval "db.runCommand({ ping: 1 })" | Out-Null
      Write-Host "✅ MongoDB is ready."
      break
    } catch {
      Start-Sleep -Seconds 2
    }
  }

  if ((Get-Date) -ge $deadline) {
    throw "MongoDB did not become ready in time."
  }

  $env:MONGODB_URI_TEST = "mongodb://root:example@localhost:27017/lexhub_test?authSource=admin"
  if (-not $env:WEB_ORIGIN) { $env:WEB_ORIGIN = "http://localhost:3019" }
  if (-not $env:COOKIE_SECURE) { $env:COOKIE_SECURE = "false" }
  if (-not $env:COOKIE_SAMESITE) { $env:COOKIE_SAMESITE = "lax" }
  if (-not $env:JWT_SECRET) { $env:JWT_SECRET = "test-jwt-secret" }
  if (-not $env:JWT_REFRESH_SECRET) { $env:JWT_REFRESH_SECRET = "test-refresh-secret" }

  Write-Host "🧪 Running server tests..."
  pnpm --filter lexhub-server test
}
finally {
  Write-Host "🧹 Cleanup: removing mongo container..."
  try { Compose rm -sf mongo *> $null } catch {}
}


