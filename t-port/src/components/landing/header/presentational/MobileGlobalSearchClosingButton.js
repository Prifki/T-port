import React from 'react';

function MobileGlobalSearchClosingButton (props) {
    return (
        <div className="mobile-global-search__button--close" onClick={props.onClick}>
            <i className="material-icons icon--closing">close</i>
        </div>
    );
}

export default MobileGlobalSearchClosingButton;
