#!/bin/bash
set -e

echo "========================================================="
echo "   Interview Prep Engine - Full Stack Heroku Deployment"
echo "========================================================="
echo ""

# 1. Login verification
echo "Step 1: Checking Heroku CLI Authentication..."
if ! command -v heroku &> /dev/null; then
    echo "ERROR: Heroku CLI is not installed. Please install it."
    exit 1
fi

heroku auth:whoami || heroku login

# 2. Compile React App
echo ""
echo "Step 2: Compiling React Frontend natively..."
cd frontend
npm run build
cd ..

# 3. Mount React App into Python Static Engine
echo ""
echo "Step 3: Mounting React bundle securely into FastAPI..."
rm -rf temp_fastapi_backend/static
cp -r frontend/dist temp_fastapi_backend/static

# 4. App Creation
echo ""
echo "Step 4: Provisioning App Environment..."
DEFAULT_NAME="skillom-latest"
read -p "Enter a unique Heroku app name (or press enter to use default: $DEFAULT_NAME): " APP_NAME

if [ -z "$APP_NAME" ]; then
    APP_NAME=$DEFAULT_NAME
fi

heroku create $APP_NAME || true
echo "Deploying to: $APP_NAME"

# 5. Add-ons (PostgreSQL)
echo ""
echo "Step 5: Spinning up PostgreSQL Database..."
heroku addons:create heroku-postgresql:essential-0 -a $APP_NAME || true

# 6. Buildpacks
echo ""
echo "Step 6: Compiling Linux FFmpeg and Python Buildpacks..."
heroku buildpacks:add --index 1 https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git -a $APP_NAME || true
heroku buildpacks:add --index 2 heroku/python -a $APP_NAME || true

# 7. Git Subtree Deployment
echo ""
echo "Step 7: Firing Codebase into the Cloud..."
# Note: Because the FastAPI app is nested in a subdirectory, we push just that exact subtree
echo "Binding Heroku Git Remotes..."
heroku git:remote -a $APP_NAME

echo "Committing any trailing local state..."
git add .
git commit -m "chore: Automated full-stack static React + FastAPI compile" || true

echo "Pushing natively up to Heroku Dynos..."
git subtree push --prefix temp_fastapi_backend heroku main

echo ""
echo "========================================================="
echo "✅ DEPLOYMENT SUCCESSFUL!"
echo "Your entire platform is now functioning as a single high-speed full-stack cloud instance!"
echo "App URL: $(heroku info -s | grep web_url | cut -d= -f2)"
echo "========================================================="
