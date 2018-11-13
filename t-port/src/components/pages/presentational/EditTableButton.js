import React from 'react';

function EditTableButton(props) {
    return (
        <td className="table-editor-buttons" onClick={props.onClick}><i className="pictorams">{props.type}</i></td>
    )
}

export default EditTableButton;
