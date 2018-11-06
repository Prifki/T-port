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
  constructor(props) {
    super(props);
    this.state = {
      isLoginMenuOpen: false,
      isFavoritesMenuOpen: false,
      isBurgerNavBarOpen: false,
      isMobileGlobalSearchOpen: false,
      isBurgerButtonActive: false
    };
  }
  
  render() {
    const burgerNavBarClassName = this.state.isBurgerNavBarOpen ? 'burger-navigation-bar burger-navigation-bar--active' : 'burger-navigation-bar';
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
          <FavoritesButton onClick={this.toggleFavoritesMenu} />
          <LoginButton onClick={this.toggleLoginMenu}/>
          <MobileGlobalSearchButton onClick={this.toggleMobileGlobalSearch}/>
        </div>
        <GlobalSearch />
      </header>
      <MobileGlobalSearch isMobileGlobalSearchOpen={this.state.isMobileGlobalSearchOpen} toggleMobileGlobalSearch={this.toggleMobileGlobalSearch}/>
      <div className={burgerNavBarClassName}><NavBar /></div>
      <LoginMenu isLoginMenuOpen={this.state.isLoginMenuOpen} toggleLoginMenu={this.toggleLoginMenu}/>
      <FavoritesMenu isFavoritesMenuOpen={this.state.isFavoritesMenuOpen} toggleFavoritesMenu={this.toggleFavoritesMenu} favorites={this.props.favorites} removeFromFavorites={this.props.removeFromFavorites} />
      </>
    );
  }
  toggleMobileGlobalSearch = () => {
    this.setState( prevState => {
      return {
        isMobileGlobalSearchOpen: !prevState.isMobileGlobalSearchOpen,
        isLoginMenuOpen: false,
        isFavoritesMenuOpen: false,
        isBurgerNavBarOpen: false,
        isBurgerButtonActive: false
      }
    })
  }
  toggleLoginMenu = () => {
    this.setState( prevState => {
      return {
        isLoginMenuOpen: !prevState.isLoginMenuOpen,
        isFavoritesMenuOpen: false,
        isBurgerNavBarOpen: false,
        isMobileGlobalSearchOpen: false,
        isBurgerButtonActive: false
      }
    })
  }
  toggleFavoritesMenu = () => {
    this.setState( prevState => {
      return {
        isFavoritesMenuOpen: !prevState.isFavoritesMenuOpen,
        isLoginMenuOpen: false,
        isBurgerNavBarOpen: false,
        isMobileGlobalSearchOpen: false,
        isBurgerButtonActive: false
      }
    })
  }
  toggleBurgerNavBar = () => {
    this.setState( prevState => {
      return {
        isBurgerNavBarOpen: !prevState.isBurgerNavBarOpen,
        isLoginMenuOpen: false,
        isFavoritesMenuOpen: false,
        isMobileGlobalSearchOpen: false,
        isBurgerButtonActive: !prevState.isBurgerButtonActive
      }
    })
  }
}
export default Header;
