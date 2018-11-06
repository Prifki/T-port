import React, { Component } from 'react';
import CloseButton from './CloseButton';

class FindARouteMenu extends Component {
  render() {
    return (
        <div className="menu menu--find-a-route">
            <div className="menu--find-a-route__button--wrapped"><i className="fas fa-route"></i></div>
            <CloseButton onClick={this.props.toggleFindARouteMenu}/>
            <div className="menu--find-a-route-content">
                <h2 className="menu__title">Find a route</h2>
                <input className="menu__input" type="text" placeholder="From" id="stopA" list="stopsA" />
                <datalist id="stopsA"></datalist>
                <input className="menu__input" type="text" placeholder="To" id="stopB" list="stopsB" />
                <datalist id="stopsB"></datalist>
                <input type="time" className="menu__input" name="from_time" />
                <span className="menu__button--submit" id="find-a-route-button">Find</span>
            </div>
        </div>
    );
  }
}

export default FindARouteMenu;
