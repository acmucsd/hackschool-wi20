# Hack School Winter 2020
This workshop will focus on setting up our Mongo Database and receiving the information to display to our meme Gallery.

Steps:
- Initialize the MongoDB
- Define the API requests to use MongoDB (/sendmeme, /getmeme, /delete)
- Turn MemeGallery's functional component into a class component
- Set it up similar to MemeGenerator where the state has a memeArray originally set to null, followed by a fetch of the '/getmeme' API, which populates the memeArray field.
```js
if (!this.state.memeArray) {
    return <div/>
}
```
- Map each meme in memeArray to a MemeCard component, with the new parameters *key* and *id*.
- Move the logic from the *toggleLikes* method to the server. 
- In *toggleLikes*, fetch the response from the "/likememe" endpoint.
```js
fetch("/likememe", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.id,
                likedStatus: this.state.likedStatus,
                likes: this.state.likes
            })
        }).then(response => response.json())
```
- Follow up the above lines with the following:
```js
.then(response => {
    this.setState({
        likedStatus: response.isLiked,
        likes: response.likes
    });
```
- In the server, we will define the "/likememe" API, using the *findOneAndUpdate* mongoDB method.
```js
app.post("/likememe", (req, res) => {
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
```

Should work now.