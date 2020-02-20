const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const Meme = require('../meme');

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

/** 
 * Let's outline the API calls that we will need.
 * 1) /sendmeme - POST request when the user finishes their meme and wants to upload it to the database.
 * 2) /getmeme - GET request that sends JSON of all the memes in the database. Used in the meme gallery.
 * 3) /likememe - POST request which increments the amount of likes user receives.
 * 4) /delete - POST request which deletes a meme given a query. Will not be implemented to front-end.
 */

let tempData = [];
app.post("/sendmeme", (req, res) => {
    // TODO: In this API, create a captioned image from the imgflip API, and append it to the 
    //       tempData list.
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
                // TODO: Make an instance of Meme and add this instance to the tempData array. 
                //       Then, send a status code of 200.
            } else {
                // TODO: Send a status code of 500 to indicate that the request to caption the image failed.
                res.status(500).send("API call to caption the image failed.");
            }
        });
});

app.get("/getmeme", (req, res) => {
    // TODO: Respond with a status code of 200 and return the tempData.
});

app.post("/likememe", (req, res) => {
    // Next time in Workshop 5: Databases. 
});

app.post("/delete", (req, res) => {
    // Next time in Workshop 5: Databases. 
});