import React, { Component } from 'react';
import TableEditButton from './TableEditButton';

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditingMode: false
        }
    }
  render() {
    return (
      <div className="table-wrapper">
      <TableEditButton />
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
