import React from 'react';
import './style.css';

import aight from '../../images/aight-imma-out.png';
import badMeme from '../../images/badmeme.jpeg';
import MemeCard from '../../components/MemeCard';

const MemeGallery = (props) => {
    return (
        <div id="content">
            <h2>Meme Gallery</h2>
            <div className="memes">
                <MemeCard image={aight} creator="Daniel Truong" likes={1} likedStatus={false}/>
                <MemeCard image={badMeme} creator="ur mom" likes={0} likedStatus={false} />
            </div>
        </div>
    );
}

export default MemeGallery;