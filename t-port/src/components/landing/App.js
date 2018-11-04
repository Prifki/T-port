import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import RoutesContainer from '../pages/RoutesContainer';
import TransportsContainer from '../pages/TransportsContainer';
import StopsContainer from '../pages/StopsContainer';
import FindRouteContainer from '../pages/FindRouteContainer';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <StopsContainer />
        {/*<FindRouteContainer />
        <TransportsContainer />
        <RoutesContainer />
        <StopsContainer />
        */}
        <Footer />
      </>
    );
  }
}

export default App;
