const Meme = require('../meme');
const config = require("../config.json");
const express = require('express');
const fetch = require("node-fetch");
const qs = require('qs');
// Let's add a body-parser module.
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/** 
 * Let's outline the API calls that we will need.
 * 1) /sendmeme - POST request when the user finishes their meme and wants to upload it to the database.
 * 2) /getmeme - GET request that sends JSON of all the memes in the database. Used in the meme gallery.
 * 3) /likememe - POST request which increments the amount of likes user receives.
 * 4) /delete - POST request which deletes a meme given a query. Will not be implemented to front-end.
 */

let tempData = [];
app.post("/sendmeme", (req, res) => {
    // TODO
    const params = req.body;
    fetch("https://api.imgflip.com/caption_image", {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
            template_id: params.meme.id,
            username: config.username,
            password: config.password,
            boxes: params.textArray.map((text) => {
                return { "text": text };
            })
        })
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                const finalURL = data.data.url;
                const meme = new Meme(finalURL, params.creator);
                
                // Add the meme to the database
                tempData.push(meme);
                res.status(200).send("Successful request.");
            } else {
                res.status(500).send("API call to caption the image failed.");
            }
        });
});    

app.get("/getmeme", (req, res) => {
    // TODO
    res.send(tempData);
});

app.post("/likememe", (req, res) => {
    // Next time in Workshop 5: Databases. 
});

app.post("/delete", (req, res) => {
    // Next time in Workshop 5: Databases. 
});