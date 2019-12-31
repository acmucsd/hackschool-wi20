import React from 'react';
import './style.css';

/* Each LikeButton needs two aspects: the number of likes the meme currently has and whether the meme was already liked. */
class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likedStatus: props["likedStatus"],
            likes: props["likes"]
        };
        console.log(this.state.likedStatus);
    }

    // We make an arrow function to show that this method is part of this class. 
    toggleLikes = (event) => {
        event.preventDefault();
        // Sets a increment value to be 1 or -1. so that we either increase the number of likes or decrease the number of likes.
        console.log(this);
        const subOrAdd = this.state.likedStatus ? -1 : 1;
        this.setState({
            likedStatus: !this.state.likedStatus,
            likes: this.state.likes + subOrAdd
        });
    }
    
    render() {
        return (
            <button type="button" onClick={this.toggleLikes}>
                <span role="img" alt="like">👍</span>
                {this.state.likes}
            </button>
        ); 
    }
}

/** Think about what are arguments we need to pass into this component. This would be found in the props object. */
const MemeCard = (props) => {
    return (
        <div className="meme-card" alt="meme">
            <img src={props["image"]}/>
            <p>{props["creator"]}</p>
            <LikeButton likes={props["likes"]} likedStatus={props["likedStatus"]}/>
        </div>
    )
}

export default MemeCard;