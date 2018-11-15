import React from 'react';

function FavoritesRemoveButton (props) {
    return (
        <div className="menu__button--remove-favorites" onClick={props.onClick}><i className="pictorams">close</i></div>
    );
}

export default FavoritesRemoveButton;
