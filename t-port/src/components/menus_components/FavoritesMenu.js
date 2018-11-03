import React, { Component } from 'react';
import CloseButton from './CloseButton';
import EditFavoritesButton from './EditFavoritesButton';
import RemoveFavoritesButton from './RemoveFavoritesButton';

class FavoritesMenu extends Component {
  render() {
    return (
        <div className="menu menu--favorites">
            <CloseButton />
            <EditFavoritesButton />
            <h3 className="menu__title">Favorites</h3>
            <ul className="menu--favorites-list">
                <li><a href="#">
                    <i className="material-icons">directions_bus</i>
                    Bus AB01</a>
                    <RemoveFavoritesButton />
                </li>
                <li><a href="#">
                    <i className="material-icons">place</i>
                    Nevsky pr.</a>
                    <RemoveFavoritesButton />
                </li>
                <li><a href="#">
                    <i className="material-icons">tram</i>
                    Tram TL09</a>
                    <RemoveFavoritesButton />
                </li>
                <li><a href="#">
                    <i className="material-icons">place</i>
                    Gorkovskaya</a>
                    <RemoveFavoritesButton />
                </li>
            </ul>
        </div>
    );
  }
}

export default FavoritesMenu;
