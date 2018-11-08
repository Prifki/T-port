import React from 'react';

function BookmarkButton(props) {
    return (
        <div className="card__button--bookmark" onClick={props.onClick}>
            <i className="material-icons">bookmark_border</i>
        </div>
    );
}

export default BookmarkButton;
