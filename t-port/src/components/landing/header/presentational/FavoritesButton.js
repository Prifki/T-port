import React from 'react';

function FavoritesButton (props) {
    return (
        <div className="header-buttons__button--favorites" onClick={props.onClick}>
            <i className="material-icons">star_border</i>
        </div>
    );
}

export default FavoritesButton;
