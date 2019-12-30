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
We will now be constructing the layout we created in workshop 1 (in the *htmlStructure/* folder).  
In the terminal, let's run the following commands in the Hack School folder. 
### `npx create-react-app meme-gen` 

Next, go into the *src/* folder. Make a *components/* folder and a *pages/* folder. 
-  Delete *logo.svg*
-  Delete *index.css*

In the *components/* folder, create the following folders with a *index.jsx* and *style.css* files.
-  MemeCard
-  NavBar

In the *pages/* folder, create the following folders with a *index.jsx* and *style.css* files.
-  MemeGallery
-  MemeGenerator

Run the following command:
### `npm install react-router-dom --save`  

When copying the HTML from workshop 1, make sure to change all instances of "class" to "className".