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

// Connect to MongoDB database
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/mydb";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
let database;
let memedb;

MongoClient.connect(url, options, (err, db) => {
    if (err) throw err;
    const dbo = db.db("memedb");
    dbo.createCollection("memes", (err, res) => {
        if (err) throw err;
        console.log("Meme Collection created.");
    });
    database = dbo;
    memedb = database.collection("memes");
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
                const meme = new Meme(finalURL, params.creator, memedb);
                res.status(200).send("Successful request.");
            } else {
                res.status(500).send("API call to caption the image failed.");
            }
        });
});    

app.get("/getmeme", (req, res) => {
    // The {} is the query portion.
    memedb.find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

/*
 * TODO: This endpoint will get the meme from the database, and update the document to either increase by one like 
 *       or decrease by one like. 
 * 
 * Parameters given (as strings):
 *      1) "id": id of the meme or document
 *      2) "likedStatus": boolean value indicating whether the document has been liked or not
 *      3) "likes": number of likes the meme currently has
 * 
 * Use this link for documentation: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
 */
app.post("/likememe", (req, res) => {
    // Workshop 5: Databases. F

});

/*
 * TODO: This endpoint will delete a meme from the database with the given queries in the param.
 * 
 * Parameters can be anything. 
 * Use this link for documentation: https://docs.mongodb.com/manual/reference/method/db.collection.deleteOne/
 */
app.post("/delete", (req, res) => {
    // Workshop 5: Databases. 
});