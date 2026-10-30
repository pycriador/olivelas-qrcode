Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "       Olivelas QR Code Studio - Inicializador     " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$port = 8000
$hasPython = Get-Command python -ErrorAction SilentlyContinue
$hasNode = Get-Command npx -ErrorAction SilentlyContinue

if ($hasPython) {
    Write-Host "[OK] Python detectado. Iniciando servidor em http://localhost:$port..." -ForegroundColor Green
    Start-Process "http://localhost:$port"
    python -m http.server $port
} elseif ($hasNode) {
    Write-Host "[OK] Node/npx detectado. Iniciando servidor em http://localhost:3000..." -ForegroundColor Green
    Start-Process "http://localhost:3000"
    npx serve -l 3000 .
} else {
    Write-Host "[INFO] Abrindo index.html diretamente no navegador padrao..." -ForegroundColor Yellow
    Start-Process "index.html"
}
