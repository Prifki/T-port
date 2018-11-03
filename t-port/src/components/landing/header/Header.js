import React, { Component } from 'react';
import BurgerButton from './presentational/BurgerButton';
import NavigationBar from './presentational/NavigationBar';
import GlobalSearch from './presentational/GlobalSearch';
import FavoritesButton from './presentational/FavoritesButton';
import LoginButton from './presentational/LoginButton';
import MobileGlobalSearchButton from './presentational/MobileGlobalSearchButton';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header__main-section">
          <BurgerButton />
          <h1 className="header__title"><a href="/">T-port</a></h1>
        </div>
        <NavigationBar />
        <div className="header-buttons">
          <FavoritesButton />
          <LoginButton />
          <MobileGlobalSearchButton />
        </div>
        <GlobalSearch />
      </header>
    );
  }
}

export default Header;
