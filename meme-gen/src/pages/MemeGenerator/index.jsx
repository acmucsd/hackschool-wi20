import React from 'react';
import './style.css';
import badMeme from '../../images/badmeme.jpeg';
import TextBox from '../../components/TextBox';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            memeArray: null,
            currentMeme: null,
            numOfTexts: 0
        };
        // Grabs memes from imgflip
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    const memes = response.data.memes;
                    this.setState({
                        memeArray: memes,
                        currentMeme: memes[0],
                        numOfTexts: memes[0].box_count
                    });
                }

            });
    }

    render() {
        // Considers case when memeArray is null --> state when waiting for API fetch to finish
        if (!this.state.memeArray) {
            return <div> </div>
        }
        // Dynamically set the number of TextBoxes based on the meme.
        let numList = [];
        for (let i = 1; i <= this.state["numOfTexts"]; i++) {
            numList.push(i);
        }
        const textboxes = numList.map((num) => 
            <TextBox text={"Text " + num} key={num} />
        );
        return (
            <div id="content">
            <h2>Meme Generator</h2>
            <img className="memeImg" src={this.state.currentMeme.url} alt="meme template"/>
            <div className="textboxes">
                {textboxes}
            </div>
            <button className="button" type="button">Submit meme!</button>
            </div>
        );
    }
}

// const MemeGenerator = (props) => {
//     return (
//         <div id="content">
//         <h2>Meme Generator</h2>
//         <img className="memeImg" src={badMeme} alt="meme template"/>
//         <div className="textboxes">
//             <TextBox text="Text 1" />
//             <TextBox text="Text 2" />
//             <TextBox text="Text 3" />
//             <TextBox text="Created By?" />
//         </div>
//         <button className="button" type="button">Submit meme!</button>
//         </div>
//     );
// }

export default MemeGenerator;