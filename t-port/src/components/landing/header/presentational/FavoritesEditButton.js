import React, { Component } from 'react';

class FavoritesEditButton extends Component {
  render() {
    const dotsView = this.props.favoritesEditingMode ? 'more_horiz' : 'more_vert';
    return (
      <div className="menu__button--edit-favorites" onClick={this.props.onClick}>
        <i className="material-icons">{dotsView}</i>
      </div>
    );
  }
}

export default FavoritesEditButton;
