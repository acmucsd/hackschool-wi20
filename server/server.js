const express = require('express');
// Let's add a body-parser module.
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/** 
 * Let's outline the API calls that we will need.
 * 1) /sendmeme - POST request when the user finishes their meme and wants to upload it to the database.
 * 2) /getmeme - GET request that sends JSON of all the memes in the database.
 * 3) /likememe - POST request which increments the amount of likes user receives.
 */

 app.post("/sendmeme", (req, res) => {

 });

 app.get("/getmeme", (req, res) => {

 });

 app.post("/likememe", (req, res) => {

 });
