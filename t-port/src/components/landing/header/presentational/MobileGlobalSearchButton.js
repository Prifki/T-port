import React from 'react';

function MobileGlobalSearchButton (props) {
    return (
        <div className="header-buttons__button--find-pic" onClick={props.onClick}>
            <i className="material-icons">search</i>
        </div>
    );
}

export default MobileGlobalSearchButton;
