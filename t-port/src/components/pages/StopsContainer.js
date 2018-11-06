import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class StopsContainer extends Component {
    constructor(props){
        super(props);
        const stops = JSONdata.stops;
        this.state = {
            isCardShowen: false,
            stopsTableRows: this.createStopsTable(stops),
            stopsTableTitles: this.stopsTableTitles(),
            stopsCardTableTitles: this.stopsCardTableTitles()
        };
    }
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Stops</h2>
                <Table rows = { this.state.stopsTableRows } header = { this.state.stopsTableTitles }/>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.stopsCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
  stopsTableTitles = () => {
      return (
        <tr>
            <th>Name</th>
            <th>Routes</th>
        </tr>
      );
  }
  stopsCardTableTitles = () => {
      return (
        <tr>
            <th>Route</th>
            <th>Time</th>
        </tr>
      );
  }
  createStopsTable = (stops) => {
    let stopsData = [];
    for (let each in stops){
        stopsData[each] = {name: stops[each].name, routes: stops[each].routes.join(', ')}
    }
    return stopsData.map((row, index) => {
        return (
          <tr key={index}>
              <td onClick={this.showCard}><a>{row.name}</a></td>
              <td>{row.routes}</td>
          </tr>
        );
    });
  }
}

export default StopsContainer;
