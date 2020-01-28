const Meme = require('../meme');
// const config = require("../config.json");
const config = process.env;
const express = require('express');
const fetch = require("node-fetch");
const qs = require('qs');
// Let's add a body-parser module.
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB database
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = config.MONGODB_URI;
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

app.post("/sendmeme", (req, res) => {
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
            if (data.success) {
                const finalURL = data.data.url;
                const meme = new Meme(finalURL, params.createdBy, memedb);
                res.status(200).send("Successful request.");
            } else {
                res.status(500).send("API call to caption the image failed.");
            }
        });
});

app.get("/getmeme", (req, res) => {
    // TODO
    memedb.find({}).toArray((err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.post("/likememe", (req, res) => {
    // TODO
    const query = {
        "_id": new mongo.ObjectID(req.body.id)
    };
    const subOrAdd = req.body.likedStatus ? -1 : 1;
    const newLikeTotal = req.body.likes + subOrAdd;
    memedb.findOneAndUpdate(query, {$set: {likes: newLikeTotal, isLiked: !req.body.likedStatus }}, {returnOriginal:false}, (err, result) => {
        if (err) throw err;
        res.json(result.value);
    });
});

app.post("/delete", (req, res) => {
    // TODO
    memedb.deleteOne(req.body, (err, obj) => {
        if (err) throw err;
        res.send(obj);
    });
});