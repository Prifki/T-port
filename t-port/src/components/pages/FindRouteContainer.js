import React, { Component } from 'react';
import FindARouteMenu from './presentational/FindARouteMenu';
import FindARouteMenuWrapped from './presentational/FindARouteMenuWrapped';
import FoundRouteMenu from './presentational/FoundRouteMenu';
import GoogleMap from './presentational/GoogleMap';

class FindRouteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFindARouteMenuOpened: true,
      isFoundRouteMenuOpened: false,
      isRouteFound: false
    }
  }
  render() {
    return (
        <main>
            <div className="google-map--index"><GoogleMap/></div>
            {this.state.isFindARouteMenuOpened ? <FindARouteMenu isFindARouteMenuOpened={this.state.isFindARouteMenuOpened} toggleFindARouteMenu={this.toggleFindARouteMenu} findARoute={this.findARoute}/> : <FindARouteMenuWrapped toggleFindARouteMenu={this.toggleFindARouteMenu} />}
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

  findARoute = () => {
    this.setState( () => {return {isFoundRouteMenuOpened: true}})
  }
}

export default FindRouteContainer;
