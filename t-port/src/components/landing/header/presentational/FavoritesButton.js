import React from 'react';

function FavoritesButton (props) {
    return (
        <div className="header-buttons__button--favorites" onClick={props.onClick}>
            <i className="pictorams">star_border</i>
        </div>
    );
}

export default FavoritesButton;
