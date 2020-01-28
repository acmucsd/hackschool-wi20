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
