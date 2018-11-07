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
                <Table header = {this.state.stopsTableTitles} rows = {rows} />
                {this.state.isCardShowen ? <Card tableHeader = { this.state.stopsCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  
  stopsTableTitles = () => {
      return (
        <thead>
        <tr>
          <th>Name</th>
          <th>Routes</th>
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

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }

}

export default StopsContainer;
