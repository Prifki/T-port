import React from 'react';
import TableEditingModeButton from './TableEditingModeButton';

function Table(props) {
    return (
      <div className="table-wrapper">
      { props.isAdmin ? <TableEditingModeButton onClick={props.toggleEditingMode} /> : null }
        <table>
            {props.header}
            <tbody>
            {props.rows}
            {props.isEditingMode ? props.addItem : null}
            </tbody>
        </table>
      </div>
    );
}

export default Table;
