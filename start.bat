@echo off
setlocal
title Olivelas QR Code Studio
echo ===================================================
echo        Olivelas QR Code Studio - Inicializador
echo ===================================================
echo.

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python detectado. Iniciando servidor local em http://localhost:8000...
    start "" http://localhost:8000
    python -m http.server 8000
    goto end
)

where npx >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node/npx detectado. Iniciando servidor local com npx serve em http://localhost:3000...
    start "" http://localhost:3000
    call npx serve -l 3000 .
    goto end
)

echo [INFO] Servidor local nao detectado. Abrindo index.html diretamente no navegador...
start "" index.html

:end
endlocal
