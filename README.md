# Hack School Winter 2020
This workshop will focus on making an API as well as linking the API with the front-end.

Install fetch using `npm i node-fetch --save`. Then at the top of server.js, put `const fetch = require("node-fetch");`.

React Review & Additions
    -  MemeGenerator page:
       -  Turns component into a class based component
       -  Sets state to the following three properties: memeArray, current Meme, and numOfTexts
       -  fetches the get_memes API from imgflip and sets the state to be those memes
       -  in the render function, adds a check to make sure memeArray key is not null and if so, dynamically sets the number of textboxes
       -  adds a textArray property in the state
       -  creates a new TemplateSelect Component (3 main props: key, meme, reselectMeme)
       -  defines a new function called reselectMeme, which is used as an onclick 
       -  defines a new function called handleMemeText, with params (index, text) and sets the textArray's index to the text (used as an onChange for the TextBox)
       -  defines a new function called uploadMeme which sends a POST request to the server 
       -  defines a new function called handleCreatedBy, with params (text) and sets the state's createdBy field to be the new text
       -  calls '/sendmeme' with the submit button
       -  uses '/getmeme' to just send the tempData array


Steps:
- 