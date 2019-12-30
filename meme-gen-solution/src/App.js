import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  const pageName = String(window.location).split("/")[3];
  return (
    <Router>
       <NavBar page={pageName} />
       <Switch>
         <Route path="/">
           {/* <MemeGenerator/> */}
         </Route>
         <Route path="/gallery">
           {/* <MemeGallery/> */}
         </Route>
       </Switch>
    </Router>
  );
}

export default App;
