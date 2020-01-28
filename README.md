# Hack School Winter 2020
This workshop will focus on making an API as well as linking the API with the front-end.

- [Hack School Winter 2020](#hack-school-winter-2020)
  - [Steps to Follow:](#steps-to-follow)
    - [React - MemeGenerator Page](#react---memegenerator-page)
    - [Server](#server)
    - [Linking the Front-End and Back-end](#linking-the-front-end-and-back-end)

## Steps to Follow:
### React - MemeGenerator Page
- Turn the MemeGenerator Page from a functional component to a class component
- In the Constructor, set the state to contain the following 5 states: 
```javascript
this.setState({
    memeArray: null, // Used to load selection of meme templates for the user
    currentMeme: null, // Current meme displayed for the user to input a meme
    numOfTexts: 0, // Number of textboxes the current meme needs
    textArray: [], // Array of strings corresponding to the text to be inputted into the meme
    createdBy: "" // String indicating who the meme is created by
});
```
- Then, after setting the state, write the following lines to fetch memes from this API.
```javascript
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
```
<!-- Explain what fetch is and the whole idea of APIs. -->
- In the top of the render() function, lets check that the memeArray exists before loading the rest of the page:
```javascript
// Considers case when memeArray is null --> state when waiting for API fetch to finish
if (!this.state.memeArray) {
    return <div> </div>
}
```
- Next, change the *src* attribute in the *img* tag to say `src={this.state.currentMeme.url}`
- Create a new TemplateSelect Component which returns the following tags. (no states needed so functional works)
```html
<img
    key={props.meme.id}
    src={props.meme.url}
    width='50'
    height='50'
    onClick={props.reselectMeme}
/>
```
- Dynamically render a TemplateSelect Component for every meme in the meme array. In the render() function, before the return statement, input the following line:
```javascript
const memeSelects = this.state.memeArray.map((meme) => 
    <TemplateSelect
        key={meme.id}
        meme={meme}
        reselectMeme={() => this.reselectMeme(meme)}
    />
);
```
<!-- Explain what map does and how these lines in particular works. -->
- Then, in the return statement, put the following set of lines after the submit button.
```html
<div className="memeTemplates"></div>
    {memeSelects}
</div>
```
<!-- Explain what we just did. At this point, run React and check everything works. -->
- Then, in the class component, define a function called **reselectMeme(meme)** that will change the state of the meme to the one selected.
```javascript
reselectMeme = (meme) => {
    this.setState({
        currentMeme: meme, 
        numOfTexts: meme.box_count,
    });
};
```
<!-- Explain how functions work with react. -->
- **TODO:** Now, we will dynamically load text boxes equal to the number that the current meme requires. Similar to how mapped each meme in the memeArray to a component, we will do the same with the text boxes. (make an array from 1...n, then perform the mapping). In the render() function: 
```javascript
// Dynamically set the number of TextBoxes based on the meme.
let numList = [];
for (let i = 1; i <= this.state["numOfTexts"]; i++) {
    numList.push(i);
}
const textboxes = numList.map((num) => 
    <TextBox text={"Text " + num} key={num} index={num-1} handleText={this.handleMemeText}/>
);
```
*Notice that we have added an index prop and handleText prop to TextBox.*

- In the div with the className="textboxes", delete the first 3 textboxes and replace with {textboxes}:
```javascript
<div className="textboxes">
    {textboxes}
    <TextBox text="Created By?" index={0} handleText={this.handleCreatedBy}/>
</div>
```
- In the TextBox component, we will make some modifications to include the index and handleText props.
```js
return (
  <div className="textbox">
    <h3>{props["text"]}</h3>
    <textarea className="textbox" 
              name={props["text"]} 
              cols="50" 
              rows="2" 
              onChange={(event) => props.handleText(props.index, e.target.value)}/> 
  </div>
);
```
*Identifying the onCHange function as (e) => ... means that we are creating a callback function that executes the handleText function. The e parameter represents the event of that is taking place and causing the onChange to happen.*

- **TODO:** We must define the *handleCreatedBy* and *handleMemeText* functions, each taking in 2 params: index and value. Here is how these functions would be defined:
```js
handleMemeText = (index, text) => {
    this.state.textArray[index] = text;
};

handleCreatedBy = (index, text) => {
    this.setState({
        createdBy: text
    });
}
```
- Lets add an *onClick* attribute to the submit button, which points to a callback function that executes a function called *uploadMeme*, which we will define. 
```js
<button className="button" type="submit" onClick={() => this.uploadMeme()}>Submit meme!</button>
```
- Since our uploadMeme function will be calling onto our server to send the meme to, let's go to the server and write some code that allows us to do this.

### Server
- Let's make a Meme class in *meme.js* so that it is easier to store the final meme. Our constructor will contain 2 params (imageURL, creator) and instantiates 3 properties (image, creator, likes). 
- Paste the following dependencies to *server.js*: 
```js
const Meme = require('../meme');
const config = require("../config.json");
const fetch = require("node-fetch");
const qs = require('qs');
```
- Install the following dependencies: "node-fetch" and "qs". 
- Fill in the *config.json* file to put your *imgflip* API credentials.
- Paste the following into *server.js* since:
```js
/** 
 * Let's outline the API calls that we will need.
 * 1) /sendmeme - POST request when the user finishes their meme and wants to upload it to the database.
 * 2) /getmeme - GET request that sends JSON of all the memes in the database. Used in the meme gallery.
 * 3) /likememe - POST request which increments the amount of likes user receives.
 * 4) /delete - POST request which deletes a meme given a query. Will not be implemented to front-end.
 */

let tempData = [];
app.post("/sendmeme", (req, res) => {
    // TODO
});

app.get("/getmeme", (req, res) => {
    // TODO
});

app.post("/likememe", (req, res) => {
    // Next time in Workshop 5: Databases. 
});

app.post("/delete", (req, res) => {
    // Next time in Workshop 5: Databases. 
});
```
<!-- Explain these APIs. -->
- Let's make the "/sendMeme" API to fetch the "https://api.imgflip.com/caption_image" API. 
```js
const params = req.body;
fetch("https://api.imgflip.com/caption_image", {
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify({
        template_id: params.meme.id,
        username: config.username,
        password: config.password,
        boxes: params.textArray.map((text) => {
            return { "text": text };
        })
    })
}).then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            const finalURL = data.data.url;
            const meme = new Meme(finalURL, params.creator);            
            // Add the meme to the database
            tempData.push(meme);
            res.status(200).send("Successful request.");
        } else {
            res.status(500).send("API call to caption the image failed.");
        }
    });
```
<!-- Explain each chunk of code at a time. -->
- In the "/getmeme" API, we will be sending back the tempData array.
```
res.send(tempData);
```

### Linking the Front-End and Back-end
- There are a few things we need to do in order to link the server with the back-end. 
  - In the main directory, run *npm init* --> creates a *package.json*
  - In this *package.json*, paste the following into the *"scripts"* object:
```js
  "scripts": {
    "watch": "concurrently --kill-others-on-fail \"cd meme-gen && npm start\" \"cd server && npm start\" "
  },
```
  - In the *meme-gen* directory, in the *package.json*, type the following line:
```js
"proxy": "http://localhost:3001/"
```
  - (optional) To make development more efficient, let's install nodemon (a package that runs node as code is changed). Run  t he command `npm install nodemon -g`. Then, go into the `package.json` in the *server* directory, in the  "start" script, change *node* to  *nodemon*. 
  - Now, running the command `npm run watch` will run both the front-end and the back-end at the same time.