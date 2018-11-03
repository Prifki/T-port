import React, { Component } from 'react';
import CloseButton from './CloseButton';
import NothingFoundText from './NothingFoundText';
import FoundRouteItem from './FoundRouteItem';

class FoundRouteMenu extends Component {
  render() {
    return (
		<div className="menu menu--found-route">
			<div className="menu--found-route-content">
				<h2 className="menu__title">Your route</h2>
				<CloseButton />
                <NothingFoundText />
				<ul className="bar" id="route-list">
                    <FoundRouteItem />
                    <FoundRouteItem />
                    <FoundRouteItem />
                    <FoundRouteItem />
                    <FoundRouteItem />
                    <FoundRouteItem />
				</ul>
			</div>
		</div>
    );
  }
}

export default FoundRouteMenu;
