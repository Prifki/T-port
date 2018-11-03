import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';

class TransportsContainer extends Component {
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table />
                <Pagination />
                <Card />
            </div>
        </main>
    );
  }
}

export default TransportsContainer;
