
## Steps to run

cd D:\project\nishify\nishify.io
heroku login
heroku create nishify-frontend-app
git init
git add .
git commit -m "Deploy frontend to Heroku"


heroku git:remote -a nishify-frontend-app
git remote -v
heroku repo:purge_cache -a nishify-frontend-app
heroku plugins:install heroku-repo
git push heroku master:main

https://nishify-frontend-app-30e3369751db.herokuapp.com/


## Troubleshoot

Set environment variables on Heroku

Once deployed, configure your environment:

heroku config:set NEXT_PUBLIC_CLIENT_NAME=pioneer_wholesale_inc
heroku config:set NEXT_PUBLIC_TEMPLATE_NAME=blueberry
heroku config:set NEXT_PUBLIC_USE_MOCK=false
heroku config:set NEXT_PUBLIC_KC_BASE=https://nishify-keycloak-app-ca1bd1ba8892.herokuapp.com
heroku config:set NEXT_PUBLIC_CLIENT_ID=react-spa
heroku config:set NEXT_PUBLIC_API_BASE=https://nishify-backend-app-0026e681a363.herokuapp.com

✅ 7️⃣ Open and Verify

Launch your deployed site:

heroku open


It should open your production frontend 🎉
If you see “Application Error,” check logs via:

heroku logs --tail

✅ 8️⃣ Update Keycloak Client (react-spa)

In Keycloak:

Go to Clients → react-spa

Update:

Field	Value
Valid redirect URIs	https://nishify-frontend-app.herokuapp.com/*
Web origins	https://nishify-frontend-app.herokuapp.com
Home URL	https://nishify-frontend-app.herokuapp.com

Save it ✅

🎯 Final Summary
File	Path	Content
Procfile	D:\project\nishify\nishify.io\Procfile	web: npm run start
package.json	same	"start": "next start -p $PORT"
.gitignore	same	node_modules, .next, .env


git push heroku master:main

