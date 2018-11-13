import React from 'react';

function BookmarkButton(props) {
    return (
        <div className="card__button--bookmark" onClick={props.onClick}>
            <i className="pictorams">{props.type}</i>
        </div>
    );
}

export default BookmarkButton;
