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
    }

    // We make an arrow function to show that this method is part of this class. 
    toggleLikes = (event) => {
        event.preventDefault();
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
          .then(response => {
            this.setState({
                likedStatus: response.isLiked,
                likes: response.likes
            });
        })
    }
    
    render() {
        const likedOrNot = this.state.likedStatus ? "liked" : "unliked";
        return (
            <button type="button" className={likedOrNot} onClick={this.toggleLikes}>
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
            <LikeButton likes={props["likes"]} likedStatus={props["likedStatus"]} id={props["id"]}/>
        </div>
    )
}

export default MemeCard;