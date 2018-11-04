import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  state = {
    transport: JSONdata.transport,
    tableTitles: ['Type', 'Number', 'Route', 'Seats']
  }
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table transport={this.state.transport} tableTitles={this.state.tableTitles}/>
                <Pagination />
                <Card />
            </div>
        </main>
    );
  }
}

export default TransportsContainer;
