#!/usr/bin/env bash
set -euo pipefail

echo "[deploy] installing dependencies"
npm ci

echo "[deploy] building app"
npm run build

if command -v pm2 >/dev/null 2>&1; then
  echo "[deploy] restarting pm2 app"
  pm2 startOrReload ecosystem.config.cjs --env production
  pm2 save
else
  echo "[deploy] pm2 not found, start app manually: npm run start"
fi

echo "[deploy] done"
