import React, { Component } from 'react';
import TableEditButton from './TableEditButton';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {
  render() {
    const { rows, header } = this.props
    return (
        <div className="table-wrapper">
            <TableEditButton />
            <table id="transport-table">
                <TableHeader header = { header } />
                <TableBody rows={ rows }/>
            </table>
        </div>
    );
  }
}

export default Table;
