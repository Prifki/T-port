import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
        <nav>
            <Link to="/transports" className="navigation-bar__item">transport</Link>
            <Link to="/stops" className="navigation-bar__item">stops</Link>
            <Link to="/routes" className="navigation-bar__item">routes</Link>
        </nav>
    );
  }
}

export default NavBar;
