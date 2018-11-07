import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';



class TransportsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      transport: JSONdata.transport,
      isCardShowen: false,
      transportTableTitles: this.transportTableTitles()
    }
  }
  render() {
    const rows = this.generateTransportTableRow();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <table>
                  {this.state.transportTableTitles}
                  <tbody>
                    {rows}
                  </tbody>
                </table>
                <Pagination />
                {this.state.isCardShowen ? <Card tableHeader = { this.state.transportCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  transportTableTitles = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => this.sortBy('type')} >Type</th>
          <th onClick={() => this.sortBy('number')} >Number</th>
          <th onClick={() => this.sortBy('route')} >Route</th>
          <th onClick={() => this.sortBy('seats')} >Seats</th>
        </tr>
      </thead>
    );
  }

  generateTransportTableRow = () => {
    return this.state.transport.map( (rowData) => 
      <tr key={rowData.id}>
        <td><i className="material-icons">{rowData.type}</i></td>
        <td>{rowData.number}</td>
        <td>{rowData.route}</td>
        <td>{rowData.seats}</td>   
      </tr>
    )
  }

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy = (key) => {
    let arrayCopy = [...this.state.transport];
    arrayCopy.sort(this.compareBy(key));
    this.setState({transport: arrayCopy});
  }

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
}

export default TransportsContainer;
