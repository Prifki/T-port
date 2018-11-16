import React from 'react';
import CloseButton from './CloseButton';
import SubmitButton from './SubmitButton';

function FindARouteMenu(props) {
    return (
        <div className="menu menu--find-a-route">
            <CloseButton onClick={props.toggleFindARouteMenu}/>
            <div className="menu--find-a-route-content">
                <h2 className="menu__title">Find a route</h2>

                <input className={props.stopAFieldClassName} type="text" placeholder="From" list="stopsA" onChange={props.stopAAutoComplete} onFocus={props.stopAAutoComplete} />

                <datalist id="stopsA">
                    {props.stopAAutoCompleteItems}
                </datalist>

                <input className={props.stopBFieldClassName} type="text" placeholder="To" list="stopsB" onChange={props.stopBAutoComplete} onFocus={props.stopBAutoComplete} />

                <datalist id="stopsB">
                    {props.stopBAutoCompleteItems}
                </datalist>

                <input type="time" className="menu__input" name="from_time" onChange={props.updateStartTime} value={props.startTime} />
                <SubmitButton onClick={props.findARoute} id="find-a-route-button" text="Find"/>
            </div>
        </div>
    );
}

export default FindARouteMenu;
