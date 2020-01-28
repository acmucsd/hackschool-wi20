# Hack School Winter 2020
Branch containing the code for the final meme generator.

Steps

- heroku login
- heroku create
- heroku config:set IMGFLIP_USERNAME=<your username>
- heroku config:set IMGFLIP_PASSWORD=<your password>
- heroku addons:create mongolab:sandbox
- heroku buildpacks:set heroku/nodejs
- Put ```"homepage":"./"``` in the package.json in "meme-gen"
- run ```npm run build``` in the meme-gen
- Move the **build** folder to the **server** directory.
- In the **package.json** file of the **server** diretory, we will add a few scripts:
```
"build": "cd server && npm install",
"server": "cd server && node server.js",
"deploy": "npm run build && npm run server"
```
- Next, make a "Procfile" in the main directory with the following line:
```
web: npm run deploy
```