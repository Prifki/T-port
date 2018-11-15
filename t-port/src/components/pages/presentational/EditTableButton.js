import React from 'react';

function EditTableButton(props) {
    return (
        <div className="table-editor-buttons" onClick={props.onClick}><i className="pictorams">{props.type}</i></div>
    )
}

export default EditTableButton;
