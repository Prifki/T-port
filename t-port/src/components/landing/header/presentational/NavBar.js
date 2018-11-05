import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
        <nav>
            <Link to="/transports"><a href="#" className="navigation-bar__item">transport</a></Link>
            <Link to="/stops"><a href="#" className="navigation-bar__item">stops</a></Link>
            <Link to="/routes"><a href="#" className="navigation-bar__item">routes</a></Link>
        </nav>
    );
  }
}

export default NavBar;
