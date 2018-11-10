import React, { Component } from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import BurgerButton from './presentational/BurgerButton';
import NavBar from './presentational/NavBar';
import GlobalSearch from './presentational/GlobalSearch';
import FavoritesButton from './presentational/FavoritesButton';
import LoginButton from './presentational/LoginButton';
import MobileGlobalSearchButton from './presentational/MobileGlobalSearchButton';
import LoginMenu from './presentational/LoginMenu';
import FavoritesMenu from './presentational/FavoritesMenu';
import MobileGlobalSearch from './presentational/MobileGlobalSearch';
import JSONdata from './../../../data/data.json';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginMenuOpen: false,
      isFavoritesMenuOpen: false,
      isBurgerNavBarOpen: false,
      isMobileGlobalSearchOpen: false,
      isBurgerButtonActive: false,
      isGlobalAutoCompleteShown: false,
      globalAutoCompleteItems: []
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
          {this.props.isLogged ? <FavoritesButton onClick={this.toggleFavoritesMenu} /> : null}
          <LoginButton onClick={this.toggleLoginMenu}/>
          <MobileGlobalSearchButton onClick={this.toggleMobileGlobalSearch}/>
        </div>
        <GlobalSearch isGlobalAutoCompleteShown={this.state.isGlobalAutoCompleteShown} globalAutoComplete={this.globalAutoComplete} globalAutoCompleteItems={this.state.globalAutoCompleteItems} hideGlobalAutoComplete={this.hideGlobalAutoComplete} chooseFromAutoComplete={this.chooseFromAutoComplete}/>
      </header>

      <MobileGlobalSearch isGlobalAutoCompleteShown={this.state.isGlobalAutoCompleteShown} isMobileGlobalSearchOpen={this.state.isMobileGlobalSearchOpen} toggleMobileGlobalSearch={this.toggleMobileGlobalSearch} globalAutoComplete={this.globalAutoComplete} globalAutoCompleteItems={this.state.globalAutoCompleteItems} chooseFromAutoComplete={this.chooseFromAutoComplete}/>
      <div className={burgerNavBarClassName}>
      
      <NavBar /></div>

      <LoginMenu isLoginMenuOpen={this.state.isLoginMenuOpen} toggleLoginMenu={this.toggleLoginMenu}/>

      <FavoritesMenu openModalCard={this.props.openModalCard} isFavoritesMenuOpen={this.state.isFavoritesMenuOpen} toggleFavoritesMenu={this.toggleFavoritesMenu} favorites={this.props.favorites} removeFromFavorites={this.props.removeFromFavorites} />
      </>
    );
  }

  globalAutoComplete = (e) => {
    if (e.target.value) {
      let foundEntities = [];
      for (let stop in JSONdata.stops){
        if (~JSONdata.stops[stop].name.toUpperCase().indexOf(e.target.value.toUpperCase()))
          foundEntities.push({name: JSONdata.stops[stop].name, type: ''});
      }
      for (let route in JSONdata.routes){
        if (~JSONdata.routes[route].name.toUpperCase().indexOf(e.target.value.toUpperCase()))
          foundEntities.push({name: JSONdata.routes[route].name, type: 'Route '});
      }
      for (let trans in JSONdata.transport){
        if (~JSONdata.transport[trans].number.toUpperCase().indexOf(e.target.value.toUpperCase())){
          let type;
          switch(JSONdata.transport[trans].type) {
            case 'directions_bus':
              type = 'Bus ';
              break;
            case 'tram':
              type = 'Tram ';
              break;
            case 'train':
              type = 'Trolleybus ';
              break;
            default:
              break;
          }
          foundEntities.push({name: JSONdata.transport[trans].number, type: type});
        }
      }
      foundEntities = foundEntities.map( (item, index) => 
      <li key={index} onClick={() => this.props.openModalCard(item.type+item.name)}>{item.name}</li>
      )
      if (foundEntities.length) {
        this.setState({
          globalAutoCompleteItems: foundEntities,
          isGlobalAutoCompleteShown: true
        });
      }
      else
        this.setState({isGlobalAutoCompleteShown: false});
    }
    else
      this.setState({isGlobalAutoCompleteShown: false});
  }

  hideGlobalAutoComplete = () => {
    this.setState({isGlobalAutoCompleteShown: false});
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
