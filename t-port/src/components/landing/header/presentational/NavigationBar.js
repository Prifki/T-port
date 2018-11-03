import React, { Component } from 'react';

class NavigationBar extends Component {
  render() {
    return (
      <div className="navigation-bar">
        <nav>
            <a href="#" className="navigation-bar__item">transport</a>
            <a href="#" className="navigation-bar__item">stops</a>
            <a href="#" className="navigation-bar__item">routes</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
