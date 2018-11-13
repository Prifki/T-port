import React from 'react';

function QuitButton (props) {
    return (
            <div className="header-buttons__button--login" onClick={props.onClick}>
                <i className="pictorams">exit_to_app</i>
            </div>
    );
}

export default QuitButton;
