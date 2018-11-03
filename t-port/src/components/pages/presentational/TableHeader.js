import React, { Component } from 'react';

class TableHeader extends Component {
  render() {
    return (
      <tr>
        <th>Header</th>
        <th>Header</th>
        <th>Header</th>
        <th>Header <i className="material-icons">arrow_drop_up</i></th>
      </tr>	
    );
  }
}

export default TableHeader;
