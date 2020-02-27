class Meme{
    constructor(image, creator, memedb){
        this.image = image;
        this.creator = creator;
        this.likes = 0;
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