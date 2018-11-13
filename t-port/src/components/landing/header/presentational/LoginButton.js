import React from 'react';

function LoginButton (props) {
    return (
        <div className="header-buttons__button--login" onClick={props.onClick}>
            <i className="pictorams">lock_open</i>
        </div>
    );
}

export default LoginButton;
