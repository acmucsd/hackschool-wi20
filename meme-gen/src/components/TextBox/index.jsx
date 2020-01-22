import React from 'react';
import './style.css';

const TextBox = (props) => {
    return (
      <div className="textbox">
        <h3>{props["text"]}</h3>
        <textarea className="textbox" name={props["text"]} cols="50" rows="2"></textarea>
      </div>
    );
};

export default TextBox;