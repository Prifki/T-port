import React, { Component } from 'react';
import FindARouteMenu from './presentational/FindARouteMenu';
import FoundRouteMenu from './presentational/FoundRouteMenu';
import GoogleMap from './presentational/GoogleMap';

class FindRouteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FindARouteMenuOpened: true,
      FoundRouteMenuOpened: true
    }
  }
  render() {
    return (
        <main>
            <div className="index-google-map"><GoogleMap/></div>
            <FindARouteMenu FindARouteMenuOpened={this.state.FindARouteMenuOpened} toggleFindARouteMenu={this.toggleFindARouteMenu}/>
            {this.state.FoundRouteMenuOpened ? <FoundRouteMenu closeFoundRouteMenu={this.closeFoundRouteMenu} /> : null }
        </main>
    );
  }
  toggleFindARouteMenu = () => {
    this.setState( prevState => {
      return {
        FindARouteMenuOpened: !prevState.FindARouteMenuOpened
      }
    })
  }
  closeFoundRouteMenu = () => {
    this.setState( () => {return {closeFoundRouteMenu: false}})
  }
}

export default FindRouteContainer;
