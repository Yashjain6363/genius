@echo off
cd /d "%~dp0"

echo Node version:
node -v
echo npm version:
npm -v
echo.

REM Use D: drive for npm cache and temp (fixes C: disk full / ENOSPC)
set npm_config_cache=%~dp0.npm-cache
set TEMP=%~dp0.tmp
set TMP=%~dp0.tmp

if not exist "%npm_config_cache%" mkdir "%npm_config_cache%"
if not exist "%TEMP%" mkdir "%TEMP%"

echo Installing to: %CD%
echo Cache folder: %npm_config_cache%
echo.

npm cache clean --force
npm install --legacy-peer-deps --no-fund --no-audit

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Run: npm run dev
) else (
    echo.
    echo INSTALL FAILED - see errors above.
    echo.
    echo Fix 1: Free at least 2 GB on C: drive ^(Windows temp still uses C:^)
    echo Fix 2: Install Node 20 LTS from https://nodejs.org
    echo Fix 3: Try: npm cache clean --force
    echo Fix 4: Try pnpm: npm i -g pnpm ^&^& pnpm install
)

pause
