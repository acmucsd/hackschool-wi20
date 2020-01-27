import React from 'react';
import './style.css';

const TemplateSelect = (props) => {
    return (
        <img
            key={props.meme.id}
            src={props.meme.url}
            width='50'
            height='50'
            onClick={props.reselectMeme}
        />
    )
}

export default TemplateSelect