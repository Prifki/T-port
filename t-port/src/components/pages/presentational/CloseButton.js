import React from 'react';

function CloseButton(props) {
    return (
        <div className="menu__button--closing" onClick={props.onClick}>
            <i className="material-icons icon--closing">close</i>
        </div>
    );
}

export default CloseButton;
