import React, { Component } from 'react';

class FavoritesRemoveButton extends Component {
  render() {
    return (
        <div className="menu__button--remove-favorites" onClick={this.props.onClick}><i className="material-icons">remove</i></div>
    );
  }
}

export default FavoritesRemoveButton;
