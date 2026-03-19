@echo off
echo ================================
echo Deploying Nishify Admin Frontend
echo ================================

cd /d D:\project\nishify\nishify.io

git checkout skill_om

heroku git:remote -a nishify-frontend-skill-om

git add .
git commit -m "Auto deploy frontend"

git push heroku master:main

echo.
echo Deployment Finished!
pause