// TODO: Define a Meme class that contians the following: image, textArr, creator.
class Meme{
    constructor(image, creator, memedb){
        this.image = image;
        this.creator = creator;
        this.likes = 0;
        // TODO: Put the memedb insertion in here in order to make code more efficient.
        memedb.insertOne({
            "image": this.image,
            "creator": this.creator,
            "likes": this.likes,
            "isLiked": false
        }, (err, res) => {
            if (err) throw err;
            console.log("inserted");
        });
    }
}

module.exports = Meme;