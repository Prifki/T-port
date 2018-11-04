import React, { Component } from 'react';
import TableEditButton from './TableEditButton';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {
  render() {
    const { transport, tableTitles } = this.props
    return (
        <div className="table-wrapper">
            <TableEditButton />
            <table id="transport-table">
                <TableBody transport={transport}/>
            </table>
        </div>
    );
  }
}

export default Table;
