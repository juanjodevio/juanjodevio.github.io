#!/usr/bin/env bash
# Site validation for CI — fails on missing artifacts, broken wiring, or a11y regressions.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

fail() {
  echo "validate: $*" >&2
  exit 1
}

ok() {
  echo "validate: $*"
}

# --- deploy artifact must match pages.yml copy list ---
REQUIRED=(
  index.html
  favicon.svg
  og-image.svg
  CNAME
  css/main.css
  js/main.js
)
for f in "${REQUIRED[@]}"; do
  [[ -f "$f" ]] || fail "missing required file: $f"
done
ok "all deploy artifacts present"

# --- HTML wiring ---
grep -q 'href="css/main.css"' index.html || fail 'index.html must link css/main.css'
grep -q 'src="js/main.js"' index.html || fail 'index.html must load js/main.js'
grep -q 'me@juanjodev.io' index.html || fail 'index.html must use production email'
grep -q 'class="skip-link"' index.html || fail 'missing skip link'
grep -q 'id="contenido"' index.html || fail 'missing main#contenido landmark'
grep -q 'href="#contacto"' index.html || fail 'missing #contacto anchor'
grep -q 'href="#servicios"' index.html || fail 'missing #servicios anchor'
ok "index.html wiring checks passed"

# --- CSS a11y guardrails ---
grep -q ':focus-visible' css/main.css || fail 'css must define :focus-visible styles'
grep -q 'body\.custom-cursor' css/main.css || fail 'cursor:none must be scoped to body.custom-cursor'
if grep -qE '^body\{[^}]*cursor:\s*none' css/main.css; then
  fail 'body must not set cursor:none globally (use body.custom-cursor only)'
fi
ok "css a11y guardrails passed"

# --- JS cursor mode ---
grep -q 'custom-cursor' js/main.js || fail 'js must toggle body.custom-cursor'
grep -q 'disableCustomCursor' js/main.js || fail 'js must disable custom cursor for keyboard (Tab)'
if grep -q 'opacity:\s*0' js/main.js; then
  fail 'scroll reveals must not gate visibility with opacity:0 (use transform only)'
fi
ok "js guardrails passed"

# --- static HTTP smoke (served from repo root) ---
python_smoke_ok() {
  command -v "$1" >/dev/null 2>&1 && "$1" -c "import http.server" 2>/dev/null
}

PORT="${VALIDATE_PORT:-8765}"
export VALIDATE_PORT="$PORT"
SERVER_PID=""

if python_smoke_ok python3; then
  python3 -m http.server "$PORT" --bind 127.0.0.1 &
  SERVER_PID=$!
elif python_smoke_ok python; then
  python -m http.server "$PORT" --bind 127.0.0.1 &
  SERVER_PID=$!
elif command -v node >/dev/null 2>&1; then
  node -e "
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const port = Number(process.env.VALIDATE_PORT || 8765);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
};
http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = path.join(root, urlPath === '/' ? 'index.html' : urlPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end();
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(port, '127.0.0.1');
" &
  SERVER_PID=$!
else
  fail "HTTP smoke needs python3, a working python, or node on PATH"
fi

trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT

base="http://127.0.0.1:${PORT}"
ready=0
for _ in $(seq 1 20); do
  if curl -sf "${base}/" -o /dev/null; then
    ready=1
    break
  fi
  sleep 0.25
done
[[ "$ready" -eq 1 ]] || fail "local HTTP server did not start on port ${PORT}"

for path in / /css/main.css /js/main.js; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "${base}${path}")"
  [[ "$code" == "200" ]] || fail "GET ${path} returned HTTP ${code}, expected 200"
done
ok "static HTTP smoke passed"

echo "validate: all checks passed"
