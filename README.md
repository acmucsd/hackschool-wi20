# Hack School Part 2 - Intro to Javascript (node.js)

Welcome to our 3rd workshop where we will go over the React front-end framework.

Taught by: Daniel Truong

# Important Links
[ACM UCSD Portal](https://acmucsd.com/)  
[Slides](http://acmurl.com/hackschoolpt2/)

# Resources
[Converting Functional Components to Class Components](https://reactjs.org/docs/state-and-lifecycle.html)  

# What is React?

# Making Our React Application
We will now be constructing the layout we created in workshop 1 (in the *htmlStructure/* folder) but in React code.
In the terminal, let's run the following commands in the Hack School folder. 
### `npx create-react-app meme-gen` 

Next, go into the *src/* folder. Make a *components/* folder and a *pages/* folder. 
-  Delete *logo.svg*
-  Delete *index.css*
-  Delete *App.test.js*

In the *components/* folder, create the following folders with a *index.jsx* and *style.css* files.
-  Footer
-  MemeCard
-  NavBar
-  TextBox

In the *pages/* folder, create the following folders with a *index.jsx* and *style.css* files.
-  MemeGallery
-  MemeGenerator

For each of the *index.jsx* files, copy the following code, replacing "<component_name>" with the name of the component.

```
import React from 'react';
import './style.css';

const <component_name> = (props) => {

};

export default <component_name>;
```

Run the following command:
### `npm install react-router-dom --save`  

In the *App.js* file, replace the code with the following code:
```
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import MemeGallery from './pages/MemeGallery';
import MemeGenerator from './pages/MemeGenerator';
import NavBar from './components/NavBar';

function App() {
  const pageName = String(window.location).split("/")[3];
  return (
    <Router>
       <NavBar page={pageName} />
       <Switch>
         <Route path="/gallery">
           <MemeGallery/>
         </Route>
         <Route path="/">
           <MemeGenerator/>
         </Route>
       </Switch>
       <Footer />
    </Router>
  );
}

export default App;
```

In the *App.css* file, copy the following code into the file (same from the HTML code in Workshop 1)
```
@import url('https://fonts.googleapis.com/css?family=Nunito');

* {
    font-family: Nunito, "sans-serif";
}

body {
    margin: 0;
    padding: 0;
}
```

At a high level, the code we just pasted into the file essentially uses the "Switch" component to determine which components to load based on the endpoint of our URL. [More information found here.](https://reacttraining.com/react-router/core/api/Router)  
  
Let's go through an example of making a component. We will start by making the NavBar component. 

In *src/components/NavBar/index.jsx*, we will be defining our component by copying the navbar portion of the HTML workshop into this file, as a functional component. Then, copy the css styling from the HTML workshop which relates to the navbar into the *src/components/NavBar/style.css* file. Solution code can be found in the folder. 

Once that works, we will be replacing our functional component with a **class** component. 

...

When copying the HTML from workshop 1, make sure to change all instances of "class" to "className".  
Also, in every img tag, define a "alt" attribute and make a description for the image. The alt attribute is used for accessibility reasons. React will give warnings when an alt attribute is not found.  