import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
        <nav>
            <Link to="/transports" className="navigation-bar__item" onClick={this.props.onClick} >transport</Link>
            <Link to="/stops" className="navigation-bar__item" onClick={this.props.onClick} >stops</Link>
            <Link to="/routes" className="navigation-bar__item" onClick={this.props.onClick} >routes</Link>
        </nav>
    );
  }
}

export default NavBar;
