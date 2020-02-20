import React from 'react';
import './style.css';
import badMeme from '../../images/badmeme.jpeg';
import TextBox from '../../components/TextBox';
import TemplateSelect from '../../components/TemplateSelect'

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            memeArray: null, // Used to load selection of meme templates for the user
            currentMeme: null, // Current meme displayed for the user to input a meme
            numOfTexts: 0, // Number of textboxes the current meme needs
            textArray: [], // Array of strings corresponding to the text to be inputted into the meme
            createdBy: "" // String indicating who the meme is created by
        };
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

    reselectMeme = (meme) => {
        this.setState({
            currentMeme: meme, 
            numOfTexts: meme.box_count,
        });
    };

    handleMemeText = (index, text) => {
        this.state.textArray[index] = text;
    };
    
    handleCreatedBy = (index, text) => {
        this.setState({
            createdBy: text
        });
    };

    uploadMeme = () => {
        // TODO 
        fetch('/sendmeme', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Figure out what you want to send here. Have the following keys: 
                //   meme, textArray, numOfTexts, createdBy
                // with data from the state
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
        if (!this.state.memeArray) {
            return <div></div>
        }

        const memeSelects = this.state.memeArray.map((meme) => {
            return (
                <TemplateSelect 
                    key={meme.id}
                    meme={meme}
                    reselectMeme={() => this.reselectMeme(meme)}
                />
            )
        });

        // Dynamically set the number of TextBoxes based on the meme.
        let numList = [];
        for (let i = 1; i <= this.state["numOfTexts"]; i++) {
            numList.push(i);
        }
        const textboxes = numList.map((num) => 
            <TextBox text={"Text " + num} key={num} index={num-1} handleText={this.handleMemeText}/>
        );

        return (
            <div id="content">
                <h2>Meme Generator</h2>
                <img className="memeImg" src={this.state.currentMeme.url} alt="meme template"/>
                <div className="textboxes">
                    {textboxes}
                    <TextBox text="Created By?" index={0} handleText={this.handleCreatedBy} />
                </div>
                <button className="button" type="button">Submit meme!</button>
                <div className="memeTemplates">
                    {memeSelects}
                </div>
            </div>     
        )
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