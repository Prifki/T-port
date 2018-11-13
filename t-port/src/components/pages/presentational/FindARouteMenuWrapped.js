import React from 'react';

function FindARouteMenuWrapped(props) {
    return (
        <div className="menu menu--find-a-route find-a-route-wrapped"  onClick={props.toggleFindARouteMenu}>
          <div className="menu--find-a-route__button--wrapped"><i className="pictorams">zoom_out_map</i></div>
        </div>
    );
}

export default FindARouteMenuWrapped;
