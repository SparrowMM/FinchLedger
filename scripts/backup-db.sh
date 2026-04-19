#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is required"
  exit 1
fi

BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"

TS="$(date +%Y%m%d_%H%M%S)"
OUT_FILE="$BACKUP_DIR/finchledger_${TS}.dump"

echo "[backup] creating backup: $OUT_FILE"
pg_dump "$DATABASE_URL" --format=custom --file="$OUT_FILE"

echo "[backup] completed: $OUT_FILE"
