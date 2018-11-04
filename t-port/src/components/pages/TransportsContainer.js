import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  state = {
    transport: JSONdata.transport,
    transportTableTitles: <tr>
                            <th>Type</th>
                            <th>Nunber</th>
                            <th>Route</th>
                            <th>Seats</th>
                          </tr>
  };
  render() {
    const rows = this.state.transport.map((row, index) => {
      return (
        <tr key={index}>
            <td><i className="material-icons">{row.type}</i></td>
            <td>{row.number}</td>
            <td>{row.seats}</td>
            <td>{row.route}</td>
        </tr>
      );
    });
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table rows = { rows } header = {this.state.transportTableTitles}/>
                <Pagination />
                <Card />
            </div>
        </main>
    );
  }
}

export default TransportsContainer;
