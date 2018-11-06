import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    const row = this.generateRow;
    return (		
        <tr>{row}</tr>
    );
  }
  generateRow = () => {
    console.log(this.props.columns);
    let rowContent;
    for (let each in this.props.columns){
      rowContent+=<td>{this.props.columns[each]}</td>
    }
    return rowContent;
  }
}

export default TableRow;