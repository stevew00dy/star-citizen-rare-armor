# Deploy rare-armor-guide to GitHub Pages
# Run from: Star Citizen\02-research\rare-armor-guide
#
# 1. Build (creates dist/ with new armor data)
# 2. Sync dist output to repo root
# 3. Commit and push

$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot

Push-Location $repoRoot

try {
    Write-Host "Building..." -ForegroundColor Cyan
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }

    Write-Host "Syncing dist to repo root..." -ForegroundColor Cyan
    # Copy built output (index, assets). armor-images stays from repo root (dist may have stale copy)
    Copy-Item -Path "dist\index.html" -Destination "index.html" -Force
    Copy-Item -Path "dist\vite.svg" -Destination "vite.svg" -Force
    Remove-Item -Path "assets\*" -Recurse -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "dist\assets\*" -Destination "assets\" -Recurse -Force

    Write-Host "Staging changes..." -ForegroundColor Cyan
    git add index.html vite.svg assets/
    # Stage armor-images if modified (e.g. overlord-gilded.png deleted)
    git add -u armor-images/
    git status --short

    $msg = "Fix: Overlord Gilded image (was duplicate of Carnifex); show no image until proper asset"
    if ($args.Count -gt 0) { $msg = $args[0] }
    git commit -m $msg

    Write-Host "Pushing to origin..." -ForegroundColor Cyan
    git push origin main
    Write-Host "Done. Site: https://stevew00dy.github.io/star-citizen-rare-armor/" -ForegroundColor Green
} finally {
    Pop-Location
}
