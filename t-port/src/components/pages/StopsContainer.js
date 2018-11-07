import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class StopsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            stops: JSONdata.stops,
            isCardShowen: false,
            stopsTableTitles: this.stopsTableTitles()
        }
    }
  render() {
    const rows = this.generateStopTableRow();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Stops</h2>
                <Table header = {this.state.stopsTableTitles} rows = {rows} isAdmin={this.props.isAdmin}/>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.stopsCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  
  stopsTableTitles = () => {
      return (
        <thead>
        <tr>
          <th onClick={() => this.sortBy('name')}>Name</th>
          <th onClick={() => this.sortBy('routes')}>Routes</th>
        </tr>
      </thead>
      );
  }

  generateStopTableRow = () => {
    return this.state.stops.map( (rowData) => 
      <tr key={rowData.number}>
        <td>{rowData.name}</td>
        <td>{rowData.routes}</td> 
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
    let arrayCopy = [...this.state.stops];
    arrayCopy.sort(this.compareBy(key));
    this.setState({stops: arrayCopy});
  }

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }

}

export default StopsContainer;
