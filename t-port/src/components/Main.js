import React, { Component } from 'react';
import FilterByType from './page_components/FilterByType';
import TransportTable from './page_components/TransportTable';
import Pagination from './page_components/Pagination';
import Card from './page_components/Card';

class Main extends Component {
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <TransportTable />
                <Pagination />
                <Card />
            </div>
        </main>
    );
  }
}

export default Main;
