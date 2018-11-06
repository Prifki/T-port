import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  constructor(props){
    super(props);
    const transport = JSONdata.transport;
    this.state = {
      isCardShowen: false,
      transportTableRows: this.createTransportTable(transport),
      transportTableTitles: this.transportTableTitles(),
      transportCardTableTitles: this.transportCardTableTitles()
    }
    console.log(this.state.transportTableRows);
  }
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table rows = { this.state.transportTableRows } header = { this.state.transportTableTitles } />
                <Pagination />
                {this.state.isCardShowen ? <Card tableHeader = { this.state.transportCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
  createTransportTable = (transport) => {
    return transport.map((row, index) => {
      return (
        <tr key={index}>
            <td><i className="material-icons">{row.type}</i></td>
            <td onClick={this.showCard}><a>{row.number}</a></td>
            <td>{row.route}</td>
            <td>{row.seats}</td>
        </tr>
      );
    });
  }
  transportTableTitles = () => {
    return (
      <tr>
        <th>Type</th>
        <th>Number</th>
        <th>Route</th>
        <th>Seats</th>
      </tr>
    );
  }
  transportCardTableTitles = () => {
    return (
      <tr>
        <th>Stop</th>
        <th>Time</th>
      </tr>
    );
  }
}

export default TransportsContainer;
