import React from 'react';
import './style.css';

import aight from '../../images/aight-imma-out.png';
import badMeme from '../../images/badmeme.jpeg';
import MemeCard from '../../components/MemeCard';

class MemeGallery extends React.Component {
    constructor() {
        super();
        this.state = {
            memeArray: null
        };
        fetch("/getmeme")
            .then(response => response.json())
            .then(response => {
                this.setState({
                    memeArray: response
                });
            });
    }
    
    render() {
        if (!this.state.memeArray) {
            return <div/>
        }
        const memes = this.state.memeArray.map((meme) => 
            <MemeCard key={meme._id} id={meme._id} image={meme.image} creator={meme.creator} likes={meme.likes} likedStatus={meme.isLiked} />
        )
        return (
            <div id="content">
                <h2>Meme Gallery</h2>
                <div className="memes">
                    {memes}
                </div>
            </div>
        );
    }
}

// const MemeGallery = () => {
//     return (
//         <div id="content">
//             <h2>Meme Gallery</h2>
//             <div className="memes">
//                 {memes}
//             </div>
//         </div>
//     );
// }

export default MemeGallery;