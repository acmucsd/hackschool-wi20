# Hack School Winter 2020
This workshop will focus on making an API as well as linking the API with the front-end.

React Review & Additions
    -  MemeGenerator page:
       -  Turns component into a class based component
       -  Sets state to the following three properties: memeArray, current Meme, and numOfTexts
       -  fetches the get_memes API from imgflip and sets the state to be those memes
       -  in the render function, adds a check to make sure memeArray key is not null and if so, dynamically sets the number of textboxes