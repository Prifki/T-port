import React, { Component } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import Main from '../pages/Main';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}

export default App;
