# Git Setup Instructions

Follow these steps to push your code to GitHub:

## Step 1: Open PowerShell or Git Bash
Navigate to your project directory:
```powershell
cd C:\Users\anirb\OneDrive\Desktop\GKK\GYM
```

## Step 2: Initialize Git Repository
```powershell
git init
```

## Step 3: Add Remote Repository
```powershell
git remote add origin https://github.com/Helix-1716/Elite-Fit.git
```

## Step 4: Add All Files
```powershell
git add .
```

## Step 5: Commit Changes
```powershell
git commit -m "Initial commit: EliteFit Gym Website with Member Dashboard"
```

## Step 6: Set Main Branch
```powershell
git branch -M main
```

## Step 7: Push to GitHub
```powershell
git push -u origin main
```

**Note:** You may be prompted to authenticate with GitHub. If you haven't set up authentication:
- Use a Personal Access Token (PAT) instead of password
- Or use GitHub Desktop or GitHub CLI for easier authentication

## Alternative: Run the PowerShell Script
You can also run the provided script:
```powershell
.\push-to-github.ps1
```

## If Remote Already Exists
If you get an error that the remote already exists, use:
```powershell
git remote set-url origin https://github.com/Helix-1716/Elite-Fit.git
```

## Troubleshooting

### Authentication Issues
If you encounter authentication issues:
1. Generate a Personal Access Token: https://github.com/settings/tokens
2. Use the token as your password when prompted
3. Or use SSH: `git remote set-url origin git@github.com:Helix-1716/Elite-Fit.git`

### Permission Denied
If you get permission errors:
- Make sure you have write access to the directory
- Close any programs that might be locking files (VS Code, etc.)
- Run PowerShell as Administrator if needed
