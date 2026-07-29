@echo off
REM Opens the website WITHOUT npm install
cd /d "%~dp0\standalone"
start "" "%~dp0standalone\index.html"
echo.
echo Website opened in your browser!
echo.
echo If images or 3D don't load, run: OPEN-WEBSITE-SERVER.bat
echo.
pause
