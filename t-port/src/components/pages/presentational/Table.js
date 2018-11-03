import React, { Component } from 'react';
import TableEditButton from './TableEditButton';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

class Table extends Component {
  render() {
    return (
        <div className="table-wrapper">
            <TableEditButton />
            <table id="transport-table">
                <tbody>	
                    <TableHeader />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                    <TableRow />
                </tbody>		
            </table>
        </div>
    );
  }
}

export default Table;
