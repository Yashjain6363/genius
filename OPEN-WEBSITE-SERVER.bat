@echo off
cd /d "%~dp0\standalone"
echo Starting local server at http://localhost:8080
echo Press Ctrl+C to stop
echo.
python -m http.server 8080 2>nul
if errorlevel 1 (
    echo Python not found. Opening file directly instead...
    start "" index.html
)
pause
