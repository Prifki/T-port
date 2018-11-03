import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';

class RoutesContainer extends Component {
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Routes</h2>
                <Table />
                <Card />
            </div>
        </main>
    );
  }
}

export default RoutesContainer;
