#!/usr/bin/env bash
# Deploy Node (không Docker) lên VPS.
# Usage:
#   export VPS_HOST=103.211.87.154 VPS_USER=tiendev VPS_PATH=/home/tiendev/trancongtien
#   export SSHPASS='...'   # hoặc dùng SSH key
#   ./scripts/deploy-vps.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

VPS_HOST="${VPS_HOST:-103.110.87.154}"
VPS_USER="${VPS_USER:-tiendev}"
VPS_PATH="${VPS_PATH:-/home/tiendev/trancongtien}"
WEB_PORT="${WEB_PORT:-3342}"
APP_NAME="${APP_NAME:-trancongtien-web}"

SSH_BASE_OPTS=(-o StrictHostKeyChecking=accept-new -o ConnectTimeout=20)
CONTROL_SOCKET="/tmp/ssh-vps-${$}.sock"

cleanup() {
  ssh -O exit -S "$CONTROL_SOCKET" "${VPS_USER}@${VPS_HOST}" 2>/dev/null || true
  rm -f "$CONTROL_SOCKET"
}
trap cleanup EXIT INT TERM

if [[ -n "${SSHPASS:-}" ]] && command -v sshpass >/dev/null 2>&1; then
  export SSHPASS
  sshpass -e ssh "${SSH_BASE_OPTS[@]}" -o PreferredAuthentications=password -o PubkeyAuthentication=no -M -S "$CONTROL_SOCKET" -f -N "${VPS_USER}@${VPS_HOST}"
else
  ssh "${SSH_BASE_OPTS[@]}" -M -S "$CONTROL_SOCKET" -f -N "${VPS_USER}@${VPS_HOST}"
fi

SSH=(ssh -S "$CONTROL_SOCKET" "${VPS_USER}@${VPS_HOST}")
RSYNC_SSH="ssh -S $CONTROL_SOCKET"

echo "==> Check SSH ${VPS_USER}@${VPS_HOST}"
"${SSH[@]}" "echo ok && uname -a && node -v && npm -v"

echo "==> Ensure remote dirs"
"${SSH[@]}" "mkdir -p '${VPS_PATH}/logs'"

echo "==> Rsync source (exclude node_modules/.next/.git/uploads)"
rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude uploads \
  --exclude public/uploads \
  --exclude .env \
  --exclude .env.production \
  --exclude connect.md \
  --exclude '*.db' \
  --exclude .DS_Store \
  --exclude '*.log' \
  --exclude video1.mp4 \
  --exclude 0_NaN.jpg \
  -e "$RSYNC_SSH" \
  "$ROOT/" "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/"

echo "==> Ensure Postgres DB + .env.production on server"
"${SSH[@]}" "bash -s" <<EOF
set -euo pipefail
cd '${VPS_PATH}'

# Resolve DATABASE_URL: try password 123456 then empty
# Note: do NOT put &query in URL if updating via sed — & is special in sed replacements.
pick_db() {
  if PGPASSWORD='123456' psql -h 127.0.0.1 -U postgres -d postgres -c 'SELECT 1' >/dev/null 2>&1; then
    echo 'postgresql://postgres:123456@127.0.0.1:5432/trancongtien?schema=public'
    return 0
  fi
  if PGPASSWORD='' psql -h 127.0.0.1 -U postgres -d postgres -c 'SELECT 1' >/dev/null 2>&1; then
    echo 'postgresql://postgres@127.0.0.1:5432/trancongtien?schema=public'
    return 0
  fi
  if sudo -n -u postgres psql -d postgres -c 'SELECT 1' >/dev/null 2>&1; then
    # peer auth as postgres OS user — app still needs password TCP; create role password if needed
    echo 'peer'
    return 0
  fi
  return 1
}

DB_URL="\$(pick_db || true)"
if [[ -z "\${DB_URL}" ]]; then
  echo "ERROR: cannot connect to Postgres as postgres (tried 123456 / empty)."
  exit 1
fi
echo "DB probe: \${DB_URL}"

if [[ "\${DB_URL}" == "peer" ]]; then
  sudo -u postgres psql -d postgres -tc "SELECT 1 FROM pg_database WHERE datname='trancongtien'" | grep -q 1 \
    || sudo -u postgres createdb trancongtien
  # ensure password login for app
  sudo -u postgres psql -d postgres -c "ALTER USER postgres PASSWORD '123456';"
  DB_URL='postgresql://postgres:123456@127.0.0.1:5432/trancongtien?schema=public'
else
  # create database if missing
  if [[ "\${DB_URL}" == *":123456@"* ]]; then
    export PGPASSWORD=123456
  else
    export PGPASSWORD=
  fi
  psql -h 127.0.0.1 -U postgres -d postgres -tc "SELECT 1 FROM pg_database WHERE datname='trancongtien'" | grep -q 1 \
    || psql -h 127.0.0.1 -U postgres -d postgres -c "CREATE DATABASE trancongtien;"
fi

write_db_url() {
  local url="\$1"
  if [[ -f .env.production ]]; then
    grep -v '^DATABASE_URL=' .env.production > .env.production.tmp || true
    mv .env.production.tmp .env.production
  else
    umask 077
    : > .env.production
  fi
  printf 'DATABASE_URL="%s"\n' "\$url" | cat - .env.production > .env.production.tmp
  # Keep DATABASE_URL first
  {
    grep '^DATABASE_URL=' .env.production.tmp
    grep -v '^DATABASE_URL=' .env.production.tmp || true
  } > .env.production
  rm -f .env.production.tmp
}

if [[ ! -f .env.production ]] || ! grep -q '^SESSION_SECRET=' .env.production 2>/dev/null; then
  umask 077
  SESSION_SECRET="\$(openssl rand -base64 32)"
  cat > .env.production <<ENV
DATABASE_URL="\${DB_URL}"
SESSION_SECRET="\${SESSION_SECRET}"
ADMIN_EMAIL=admin@trancongtien.com
ADMIN_PASSWORD=123123123
ADMIN_NAME="Trần Công Tiến"
NOTIFY_EMAIL=trancongtien406@gmail.com
NOTIFY_PHONE=+84382802406
WEB_PORT=${WEB_PORT}
PORT=${WEB_PORT}
SITE_ORIGIN=https://trancongtien.com
ENV
  echo "Created .env.production (edit SMTP/R2 later)."
else
  write_db_url "\${DB_URL}"
  echo "Updated DATABASE_URL in existing .env.production"
fi

# Quote unquoted ADMIN_NAME if needed (legacy file)
if grep -q '^ADMIN_NAME=Trần Công Tiến$' .env.production 2>/dev/null; then
  sed -i.bak 's|^ADMIN_NAME=Trần Công Tiến$|ADMIN_NAME="Trần Công Tiến"|' .env.production
fi

ln -sfn .env.production .env
grep '^DATABASE_URL=' .env.production
EOF

echo "==> Install, migrate, build, restart pm2"
"${SSH[@]}" "bash -s" <<EOF
set -euo pipefail
cd '${VPS_PATH}'
export NODE_ENV=production
set -a
# shellcheck disable=SC1091
# Values in .env.production must be quoted if they contain & or spaces
source ./.env.production
set +a

if ! command -v pm2 >/dev/null 2>&1; then
  sudo npm i -g pm2
fi

npm ci --include=dev
npx prisma migrate deploy
npm run build
npm run seed || true

pm2 delete '${APP_NAME}' >/dev/null 2>&1 || true
pm2 start npm --name '${APP_NAME}' --cwd '${VPS_PATH}' -- start
pm2 reload trancongtien-mcp >/dev/null 2>&1 || true
pm2 save
pm2 status '${APP_NAME}'
sleep 3
curl -fsS "http://127.0.0.1:\${PORT:-${WEB_PORT}}/api/health"
EOF

echo "==> Deploy done. Health: https://trancongtien.com/api/health"
