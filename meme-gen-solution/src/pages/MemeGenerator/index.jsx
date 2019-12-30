import React from 'react';
import './style.css';

const MemeGenerator = (props) => {
    return (
        <div id="content">
        <h2>Meme Generator</h2>
        <img className="memeImg" src="../assets/images/badmeme.jpeg" />
        <div className="textboxes">
            <h3>Text1</h3>
            <textarea className="textbox" name="text1" cols="50" rows="2"></textarea>
            <h3>Text2</h3>
            <textarea className="textbox" name="text2" cols="50" rows="2"></textarea>
            <h3>Text3</h3>
            <textarea className="textbox" name="text3" cols="50" rows="2"></textarea>
            <h3>Created by?</h3>
            <textarea className="textbox" name="name" cols="50" rows="2"></textarea>
        </div>
        <button className="button" type="button">Submit meme!</button>
        </div>
        <div id="footer">

        </div>
    );
}



