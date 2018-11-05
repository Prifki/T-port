import React, { Component } from 'react';
import BurgerButton from './presentational/BurgerButton';
import NavBar from './presentational/NavBar';
import GlobalSearch from './presentational/GlobalSearch';
import FavoritesButton from './presentational/FavoritesButton';
import LoginButton from './presentational/LoginButton';
import MobileGlobalSearchButton from './presentational/MobileGlobalSearchButton';
import LoginMenu from './presentational/LoginMenu';
import FavoritesMenu from './presentational/FavoritesMenu';
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
        <div className="navigation-bar">
          <NavBar />
        </div>
        <div className="header-buttons">
          <FavoritesButton onClick={this.toggleFavoritesMenu}/>
          <LoginButton onClick={this.toggleLoginMenu}/>
          <MobileGlobalSearchButton onClick={this.toggleMobileGlobalSearch}/>
        </div>
        <GlobalSearch />
      </header>
  
      {this.state.isMobileGlobalSearchOpen ? <MobileGlobalSearch /> : null}
      {this.state.isBurgerNavBarOpen ? <div className="burger-navigation-bar"><NavBar /></div> : null}
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
