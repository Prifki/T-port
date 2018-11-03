import React, { Component } from 'react';
import MainSection from './header_components/MainSection';
import NavigationBar from './header_components/NavigationBar';
import HeaderButtons from './header_components/HeaderButtons';
import GlobalSearch from './header_components/GlobalSearch';

class Header extends Component {
  render() {
    return (
        <header>
          <MainSection />
          <NavigationBar />
          <HeaderButtons />
          <GlobalSearch />
        </header>
    );
  }
}

export default Header;
