import React, { Component } from 'react';
import TableEditingModeButton from './TableEditingModeButton';

class Table extends Component {
  render() {
    return (
      <div className="table-wrapper">
      { this.props.isAdmin ? <TableEditingModeButton onClick={this.props.toggleEditingMode} /> : null }
        <table>
            {this.props.header}
            <tbody>
            {this.props.rows}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
