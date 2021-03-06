import React from 'react';

function MobileGlobalSearchResults (props) {
    return (
        <div className="mobile-global-search-results">
            <ul id="mobile-global-search-results__items">
                {props.globalAutoCompleteItems}
            </ul>
        </div>
    );
}

export default MobileGlobalSearchResults;
