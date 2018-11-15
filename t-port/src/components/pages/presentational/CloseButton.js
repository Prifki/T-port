import React from 'react';

function CloseButton(props) {
    return (
        <div className="menu__button--closing menu__button--closing-card" onClick={props.onClick}>
            <i className="pictorams icon--closing">close</i>
        </div>
    );
}

export default CloseButton;
