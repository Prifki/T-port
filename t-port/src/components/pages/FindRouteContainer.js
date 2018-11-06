import React, { Component } from 'react';
import FindARouteMenu from './presentational/FindARouteMenu';
import FoundRouteMenu from './presentational/FoundRouteMenu';
import GoogleMap from './presentational/GoogleMap';

class FindRouteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFindARouteMenuOpened: true,
      isFoundRouteMenuOpened: true,
      isRouteFound: false
    }
  }
  render() {
    return (
        <main>
            <div className="index-google-map"><GoogleMap/></div>
            <FindARouteMenu isFindARouteMenuOpened={this.state.isFindARouteMenuOpened} toggleFindARouteMenu={this.toggleFindARouteMenu}/>
            {this.state.isFoundRouteMenuOpened ? <FoundRouteMenu closeFoundRouteMenu={this.closeFoundRouteMenu} isRouteFound={this.state.isRouteFound}/> : null }
        </main>
    );
  }
  toggleFindARouteMenu = () => {
    this.setState( prevState => {
      return {
        isFindARouteMenuOpened: !prevState.isFindARouteMenuOpened
      }
    })
  }
  closeFoundRouteMenu = () => {
    this.setState( () => {return {isFoundRouteMenuOpened: false}})
  }
}

export default FindRouteContainer;
