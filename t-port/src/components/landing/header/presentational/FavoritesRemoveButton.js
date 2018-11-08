import React from 'react';

function FavoritesRemoveButton (props) {
    return (
        <div className="menu__button--remove-favorites" onClick={props.onClick}><i className="material-icons">remove</i></div>
    );
}

export default FavoritesRemoveButton;
