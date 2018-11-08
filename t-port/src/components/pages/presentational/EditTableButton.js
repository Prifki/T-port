import React from 'react';

function EditTableButton(props) {
    return (
        <td className="table-editor-buttons"><i className="material-icons">{props.type}</i></td>
    )
}

export default EditTableButton;
