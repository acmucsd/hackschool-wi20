import React from 'react';
import './style.css';

/* Class Component */
class NavBar extends React.Component {
    constructor(props) {
        super(props); // this part of the code runs the default version of the constructor
        this.state = {
            genActive: this.props["page"]==="" ? "current" : "",
            galleryActive: this.props["page"]==="gallery" ? "current" : ""
        }
    }

    /* Same as in the functional component.*/
    render() {
      return (
        <div id="navbar">
            <h1>ACM UCSD Meme Gen</h1>
            <div id="navlinks">
                <a className="links" id={this.state.genActive} href="/">Generator</a>
                <a className="links" id={this.state.galleryActive} href="/gallery">Gallery</a>
            </div>
        </div>
      ); 
    }
}

/* Functional Component */
// const NavBar = (props) => {
//     return (
//         <div id="navbar">
//             <h1>ACM UCSD Meme Gen</h1>
//             <div id="navlinks">
//                 <a className="links" href="index.html">Generator</a>
//                 <a className="links" href="gallery.html">Gallery</a>
//             </div>
//         </div>
//     )
// };

export default NavBar;