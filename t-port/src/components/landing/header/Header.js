import React, { Component } from 'react';
import BurgerButton from './presentational/BurgerButton';
import NavigationBar from './presentational/NavigationBar';
import GlobalSearch from './presentational/GlobalSearch';
import FavoritesButton from './presentational/FavoritesButton';
import LoginButton from './presentational/LoginButton';
import MobileGlobalSearchButton from './presentational/MobileGlobalSearchButton';
import LoginMenu from './presentational/LoginMenu';
import FavoritesMenu from './presentational/FavoritesMenu';
import BurgerNavBar from './presentational/BurgerNavBar';
import MobileGlobalSearch from './presentational/MobileGlobalSearch';

class Header extends Component {
  state = {
    isLoginMenuOpen: false,
    isFavoritesMenuOpen: false,
    isBurgerNavBarOpen: false,
    isMobileGlobalSearchOpen: false,
    isBurgerButtonActive: false
  }
  render() {
    return (
      <>
      <header>
        <div className="header__main-section">
          <BurgerButton onClick={this.toggleBurgerNavBar} isBurgerButtonActive={this.state.isBurgerButtonActive}/>
          <h1 className="header__title"><a href="/">T-port</a></h1>
        </div>
        <NavigationBar />
        <div className="header-buttons">
          <FavoritesButton onClick={this.toggleFavoritesMenu}/>
          <LoginButton onClick={this.toggleLoginMenu}/>
          <MobileGlobalSearchButton onClick={this.toggleMobileGlobalSearch}/>
        </div>
        <GlobalSearch />
      </header>
  
      {this.state.isMobileGlobalSearchOpen ? <MobileGlobalSearch /> : null}
      {this.state.isBurgerNavBarOpen ? <BurgerNavBar /> : null}
      {this.state.isLoginMenuOpen ? <LoginMenu /> : null}
      {this.state.isFavoritesMenuOpen ? <FavoritesMenu /> : null}
      </>
    );
  }
  toggleMobileGlobalSearch = () => {
    this.setState({
      isMobileGlobalSearchOpen: !this.state.isMobileGlobalSearchOpen,
      isLoginMenuOpen: false,
      isFavoritesMenuOpen: false,
      isBurgerNavBarOpen: false,
      isBurgerButtonActive: false
    })
  }
  toggleLoginMenu = () => {
    this.setState({
      isLoginMenuOpen: !this.state.isLoginMenuOpen,
      isFavoritesMenuOpen: false,
      isBurgerNavBarOpen: false,
      isMobileGlobalSearchOpen: false,
      isBurgerButtonActive: false
    })
  }
  toggleFavoritesMenu = () => {
    this.setState({
      isFavoritesMenuOpen: !this.state.isFavoritesMenuOpen,
      isLoginMenuOpen: false,
      isBurgerNavBarOpen: false,
      isMobileGlobalSearchOpen: false,
      isBurgerButtonActive: false
    })
  }  
  toggleBurgerNavBar = () => {
    this.setState({
      isBurgerNavBarOpen: !this.state.isBurgerNavBarOpen,
      isLoginMenuOpen: false,
      isFavoritesMenuOpen: false,
      isMobileGlobalSearchOpen: false,
      isBurgerButtonActive: !this.state.isBurgerButtonActive
    });
  }
}

export default Header;
