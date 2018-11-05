import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  state = {
    isCardShowen: false,
    transport: JSONdata.transport,
    transportTableTitles: <tr>
                            <th>Type</th>
                            <th>Nunber</th>
                            <th>Route</th>
                            <th>Seats</th>
                          </tr>,
    transportCardTableTitles: <tr>
                                <th>Stop</th>
                                <th>Time</th>
                              </tr>
  };
  render() {
    const transportTableRows = this.state.transport.map((row, index) => {
      return (
        <tr key={index}>
            <td><i className="material-icons">{row.type}</i></td>
            <td onClick={this.showCard}><a>{row.number}</a></td>
            <td>{row.route}</td>
            <td>{row.seats}</td>
        </tr>
      );
    });
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table rows = { transportTableRows } header = { this.state.transportTableTitles } />
                <Pagination />
                {this.state.isCardShowen ? <Card tableHeader = { this.state.transportCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  showCard = (props) => {
    this.setState({
      isCardShowen: true
    })
  }
}

export default TransportsContainer;
