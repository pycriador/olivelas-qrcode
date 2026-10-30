#!/usr/bin/env bash
# Olivelas QR Code Studio - Inicializador para Linux e macOS

set -e

echo "==================================================="
echo "       Olivelas QR Code Studio - Inicializador     "
echo "==================================================="
echo ""

PORT=8000

# Funcao para abrir navegador de acordo com o SO
open_browser() {
  local url="$1"
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url" >/dev/null 2>&1 &
  elif command -v open >/dev/null 2>&1; then
    open "$url" >/dev/null 2>&1 &
  else
    echo "Abra no seu navegador: $url"
  fi
}

# Tenta Python 3
if command -v python3 >/dev/null 2>&1; then
  echo "[OK] Python 3 detectado. Iniciando servidor em http://localhost:$PORT..."
  open_browser "http://localhost:$PORT"
  python3 -m http.server $PORT
  exit 0
fi

# Tenta Python generico
if command -v python >/dev/null 2>&1; then
  echo "[OK] Python detectado. Iniciando servidor em http://localhost:$PORT..."
  open_browser "http://localhost:$PORT"
  python -m http.server $PORT 2>/dev/null || python -m SimpleHTTPServer $PORT
  exit 0
fi

# Tenta npx serve
if command -v npx >/dev/null 2>&1; then
  echo "[OK] Node/npx detectado. Iniciando servidor com npx serve na porta 3000..."
  open_browser "http://localhost:3000"
  npx serve -l 3000 .
  exit 0
fi

# Fallback: abre direto o arquivo index.html no navegador
echo "[INFO] Servidor local nao encontrado. Abrindo index.html diretamente..."
open_browser "./index.html"
