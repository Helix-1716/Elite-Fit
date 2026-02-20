# Git commands to push code to GitHub
# Run this script in PowerShell from the project directory

Write-Host "Initializing Git repository..." -ForegroundColor Green
git init

Write-Host "Adding remote repository..." -ForegroundColor Green
git remote add origin https://github.com/Helix-1716/Elite-Fit.git

Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Initial commit: EliteFit Gym Website with Member Dashboard"

Write-Host "Setting main branch..." -ForegroundColor Green
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host "Done! Your code has been pushed to GitHub." -ForegroundColor Green
