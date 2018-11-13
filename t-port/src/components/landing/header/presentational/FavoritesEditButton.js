import React from 'react';

function FavoritesEditButton (props) {
    const dotsView = props.favoritesEditingMode ? 'more_horiz' : 'more_vert';
    return (
      <div className="menu__button--edit-favorites" onClick={props.onClick}>
        <i className="pictorams">{dotsView}</i>
      </div>
    );
}

export default FavoritesEditButton;
