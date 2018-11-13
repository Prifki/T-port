import React from 'react';

function TableEditingModeButton(props) {
    return (
        <div className="table__editor-tools-button" onClick={props.onClick}><i className="pictorams">settings</i></div>
    );
}

export default TableEditingModeButton;
