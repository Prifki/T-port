import React, { Component } from 'react';
import FindARouteMenu from './../landing/header/presentational/FindARouteMenu';
import FoundRouteMenu from './../landing/header/presentational/FoundRouteMenu';

class FindRouteContainer extends Component {
  render() {
    return (
        <main>
            <FindARouteMenu />
            <FoundRouteMenu />
        </main>
    );
  }
}

export default FindRouteContainer;
