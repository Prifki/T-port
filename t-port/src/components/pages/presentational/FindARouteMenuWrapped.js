import React, { Component } from 'react';

class FindARouteMenuWrapped extends Component {
  render() {
    return (
        <div className="menu menu--find-a-route find-a-route-wrapped"  onClick={this.props.toggleFindARouteMenu}>
        <div className="menu--find-a-route__button--wrapped"><i className="material-icons">zoom_out_map</i></div>
        </div>
    );
  }
}

export default FindARouteMenuWrapped;
