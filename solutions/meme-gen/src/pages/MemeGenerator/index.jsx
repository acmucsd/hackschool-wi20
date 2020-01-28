import React from 'react';
import './style.css';
import TextBox from '../../components/TextBox';
import TemplateSelect from '../../components/TemplateSelect'

import {reselectMeme} from '../../utils';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            memeArray: null,
            currentMeme: null,
            numOfTexts: 0,
            textArray: [],
            createdBy: ""
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
                        numOfTexts: memes[0].box_count,
                        textArray: [],
                        createdBy: ""
                    });
                }
            });
    }

    handleMemeText = (index, text) => {
        this.state.textArray[index] = text;
    };

    handleCreatedBy = (index, text) => {
        this.setState({
            createdBy: text
        });
    }

    reselectMeme = (meme) => {
        this.setState({
            currentMeme: meme, 
            numOfTexts: meme.box_count,
        });
    };

    uploadMeme = () => {
        fetch('/sendmeme', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meme: this.state.currentMeme,
                textArray: this.state.textArray,
                numOfTexts: this.state.numOfTexts,
                createdBy: this.state.createdBy
            })
        }).then(response => {
            if (response.status == 200) { 
                window.location.href = "/gallery"; 
            }
            else {
                console.log(response);
            }
        })
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
            <TextBox text={"Text " + num} key={num} index={num-1} handleText={this.handleMemeText}/>
        );
        const memeSelects = this.state.memeArray.map((meme) => 
            <TemplateSelect
                key={meme.id}
                meme={meme}
                reselectMeme={() => this.reselectMeme(meme)}
            />
        );

        return (
            <div id="content">
            <h2>Meme Generator</h2>
            <img className="memeImg" src={this.state.currentMeme.url} alt="meme template"/>
            <div className="textboxes">
                {textboxes}
                <TextBox text="Created By?" index={0} handleText={this.handleCreatedBy}/>
            </div>
            <button className="button" type="submit" onClick={() => this.uploadMeme()}>Submit meme!</button>
            <div className="memeTemplates"></div>
                {memeSelects}
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