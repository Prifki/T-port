import React, { Component } from 'react';

class TableHeader extends Component { 
  render(){
      const tableTitles = this.props
      console.log(tableTitles);
      let titles;
      for (let each in tableTitles){
        titles+=<td>{tableTitles[each]}</td>
      }
      return <tr>{titles}</tr>;
  }
}
export default TableHeader;
