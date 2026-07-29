Write-Host "=== Disk Space Cleanup for npm install ===" -ForegroundColor Cyan
Write-Host ""

# Show drive space
Get-PSDrive C, D -PSProvider FileSystem -ErrorAction SilentlyContinue | ForEach-Object {
    $freeGB = [math]::Round($_.Free / 1GB, 2)
    $usedGB = [math]::Round($_.Used / 1GB, 2)
    Write-Host "Drive $($_.Name):  Free $freeGB GB / Used $usedGB GB" -ForegroundColor $(if ($freeGB -lt 2) { "Red" } else { "Green" })
}

Write-Host ""
Write-Host "Cleaning npm cache on C:..." -ForegroundColor Yellow
npm cache clean --force 2>$null

$npmCache = "$env:LOCALAPPDATA\npm-cache"
if (Test-Path $npmCache) {
    $size = (Get-ChildItem $npmCache -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "npm-cache folder size: $([math]::Round($size, 0)) MB at $npmCache"
    $ans = Read-Host "Delete npm-cache folder? (y/n)"
    if ($ans -eq 'y') {
        Remove-Item $npmCache -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Deleted npm-cache" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Cleaning Windows Temp..." -ForegroundColor Yellow
Remove-Item "$env:TEMP\*" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "C:\Windows\Temp\*" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "Emptying Recycle Bin..." -ForegroundColor Yellow
Clear-RecycleBin -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== After cleanup ===" -ForegroundColor Cyan
Get-PSDrive C -PSProvider FileSystem -ErrorAction SilentlyContinue | ForEach-Object {
    Write-Host "Drive C: Free $([math]::Round($_.Free / 1GB, 2)) GB"
}

Write-Host ""
Write-Host "You need at least 2 GB free on C: for npm install." -ForegroundColor Yellow
Write-Host "OR use the website without npm: double-click OPEN-WEBSITE.bat" -ForegroundColor Green
Read-Host "Press Enter to close"
