# VidhiDiya Academy — install script (uses D: drive cache to avoid C: disk full errors)
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

Write-Host "Node: $(node -v)" -ForegroundColor Cyan
Write-Host "npm:  $(npm -v)" -ForegroundColor Cyan

# Use project-local cache on D: (not C: AppData)
$env:npm_config_cache = "$PSScriptRoot\.npm-cache"
$env:TEMP = "$PSScriptRoot\.tmp"
$env:TMP = "$PSScriptRoot\.tmp"

New-Item -ItemType Directory -Force -Path $env:npm_config_cache | Out-Null
New-Item -ItemType Directory -Force -Path $env:TEMP | Out-Null

Write-Host "`nClearing npm cache (project folder only)..." -ForegroundColor Yellow
npm cache clean --force 2>$null

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install --legacy-peer-deps --no-fund --no-audit

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSuccess! Run: npm run dev" -ForegroundColor Green
} else {
    Write-Host "`nInstall failed. Common fixes:" -ForegroundColor Red
    Write-Host "  1. Free space on C: drive (npm still needs some temp space)"
    Write-Host "  2. Run: npm cache clean --force"
    Write-Host "  3. Use Node 20 LTS if Node 24 causes issues: https://nodejs.org"
    exit 1
}
