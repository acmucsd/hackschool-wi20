# Hack School Winter 2020
Branch containing the code for the final meme generator.

- [Hack School Winter 2020](#hack-school-winter-2020)
  - [Steps to Take](#steps-to-take)
  - [Heroku Explained](#heroku-explained)
    - [Environment and Configuration Variables](#environment-and-configuration-variables)
    - [Procfile and Scripting](#procfile-and-scripting)
    - [MLab Database](#mlab-database)

## Steps to Take
- Type the following commands in the terminal:
```s
heroku login
heroku create
heroku config:set IMGFLIP_USERNAME=<your username>
heroku config:set IMGFLIP_PASSWORD=<your password>
heroku addons:create mongolab:sandbox
heroku buildpacks:set heroku/nodejs
```
<!-- Explain what this does -->
- Put ```"homepage":"./"``` in the package.json in "meme-gen"
- run ```npm run build``` in the meme-gen
- Move the **build** folder to the **server** directory.
- In the **package.json** file of the **server** diretory, we will add a few scripts:
```js
"build": "cd server && npm install",
"server": "cd server && node server.js",
"deploy": "npm run build && npm run server"
```
- Next, make a "Procfile" in the main directory with the following line:
```
web: npm run deploy
```
- In the **server** directory, make a new variable called **config** that is equal to process.env, and change all instances of config to point to a variable in the environment:
```js
// const config = require("../config.json");
const config = process.env;
...
const url = config.MONGODB_URI;
// do same thing for username and password
```
- Go to your Heroku Dashboard and click on the mlab add-on. Then, copy the database name and set the database name in **server.js** to that:
```js
if (err) throw err;
const dbo = db.db("heroku_srf37p9d");
```
- To deploy the app, run the commands:
```
git add -A 
git commit -m "<commit message>"
git push heroku <your branch name>:<master>
```
- Now, click on the URL and your app should work!

## Heroku Explained
Heroku is a platform that allows you to deploy apps to the web. There are many other services that allow you to do this, however Heroku is a common one.

### Environment and Configuration Variables
Environment variables can be set within a product environment, which could be accessed anywhere in the codebase. This is useful for setting configuration and credentials, as we don't want credentials to be a part of code.

### Procfile and Scripting
Procfile indicates to the server what script command to run when the URL gets loaded. We set npm scripts to run the applications which we want.

### MLab Database
Previously, our database was set and utilized locally. However, when the app is deployed to the web, the database we use must also be on the web. MLab is essentially the "cloud" version of MongoDB.
