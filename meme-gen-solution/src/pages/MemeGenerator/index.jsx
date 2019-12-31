import React from 'react';
import './style.css';
import badMeme from '../../images/badmeme.jpeg';
import TextBox from '../../components/TextBox';

const MemeGenerator = (props) => {
    return (
        <div id="content">
        <h2>Meme Generator</h2>
        <img className="memeImg" src={badMeme} alt="meme template"/>
        <div className="textboxes">
            <TextBox text="Text 1" />
            <TextBox text="Text 2" />
            <TextBox text="Text 3" />
            <TextBox text="Created By?" />
        </div>
        <button className="button" type="button">Submit meme!</button>
        </div>
    );
}

export default MemeGenerator;