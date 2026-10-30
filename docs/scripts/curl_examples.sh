#!/usr/bin/env bash
# Olivelas QR Code Studio - Exemplos de Download via cURL
set -e

echo "=== 1. Gerando QR Code PNG Padrão ==="
curl -s "https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=https%3A%2F%2Fgithub.com%2Fpycriador%2Folivelas-qrcode" -o qrcode_curl.png
echo "[OK] Salvo em qrcode_curl.png"

echo "=== 2. Gerando QR Code SVG Vetorial com Cores Personalizadas ==="
# Índigo (#4f46e5) sobre fundo branco
curl -s "https://quickchart.io/qr?text=https%3A%2F%2Fgithub.com%2Fpycriador%2Folivelas-qrcode&dark=4f46e5&light=ffffff&size=1024&format=svg" -o qrcode_curl.svg
echo "[OK] Salvo em qrcode_curl.svg"

echo "=== 3. Pipeline: Encurtar URL e Gerar QR Code Automático ==="
ORIGINAL_URL="https://github.com/pycriador/olivelas-qrcode"
SHORT_URL=$(curl -s "https://tinyurl.com/api-create.php?url=$ORIGINAL_URL")
echo "[*] URL Original: $ORIGINAL_URL"
echo "[*] URL Encurtada: $SHORT_URL"

ENCODED_SHORT=$(echo "$SHORT_URL" | sed 's/:/%3A/g;s/\//%2F/g')
curl -s "https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=$ENCODED_SHORT" -o qrcode_encurtado.png
echo "[OK] Salvo em qrcode_encurtado.png"
