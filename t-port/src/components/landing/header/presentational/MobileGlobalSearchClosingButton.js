import React from 'react';

function MobileGlobalSearchClosingButton (props) {
    return (
        <div className="mobile-global-search__button--close" onClick={props.onClick}>
            <i className="pictorams icon--closing">close</i>
        </div>
    );
}

export default MobileGlobalSearchClosingButton;
