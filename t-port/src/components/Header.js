import React, { Component } from 'react';
import BurgerButton from './header_components/BurgerButton';
import NavigationBar from './header_components/NavigationBar';
import GlobalSearch from './header_components/GlobalSearch';
import FavoritesButton from './header_components/FavoritesButton';
import LoginButton from './header_components/LoginButton';
import MobileGlobalSearchButton from './header_components/MobileGlobalSearchButton';

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
