import React, { Component } from 'react';
import CloseButton from './CloseButton';
import NothingFoundText from './NothingFoundText';

class FoundRouteMenu extends Component {
  render() {

    return (
		<div className="menu menu--found-route">
			<div className="menu--found-route-content">
				<h2 className="menu__title">Your route</h2>
				<CloseButton onClick={this.props.closeFoundRouteMenu}/>
        {this.contentManager()}
			</div>
		</div>
    );
  }

  contentManager = () => {
    if (!this.props.isRouteFound) {
      return (<NothingFoundText />);
    }
    else {
      return (<ul className="bar" id="route-list">
        {this.props.foundRoute.map( (item, index) => 
          <li key={index} >{item[1]+'min'}<div><i className="material-icons">place</i>{item[0]}</div></li>
        )}
      </ul>);
    }
  }
}

export default FoundRouteMenu;
