import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';
import GoogleMap from './presentational/GoogleMap';

class RoutesContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCardShowen: false,
            routesTableTitles: this.routesTableTitles(),
            tableData: this.handleData(),
        }
    }
  render() {
    const rows = this.generateRoutesTableRow();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Routes</h2>
                <Table header = {this.state.routesTableTitles} rows = {rows} />
                <div className="google-map--small"><GoogleMap/></div>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.routesCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  
  generateRoutesTableRow = () => {
    return this.state.tableData.map( (rowData) => 
        <tr key={rowData.id}>
          <td>{rowData.name}</td>
          <td>{rowData.from}</td>
          <td>{rowData.to}</td>   
        </tr>
    )
  }
  handleData = () => {
    const stops = JSONdata.stops, routes = JSONdata.routes;
    let name = [], from = [], to = [], routesData = [];
    for (let route in routes){
        for (let stop in stops){
            if (parseInt(routes[route].stops[0]) === parseInt(stops[stop].number)){
                from.push(stops[stop].name);
            }
            if (routes[route].stops[routes[route].stops.length-1] === parseInt(stops[stop].number)){
                to.push(stops[stop].name);
            }
        }
        name.push(routes[route].name);
    }
    for (let each in name){
        routesData[each] = {id: each, name: name[each], from: from[each], to: to[each]}
    }
    return routesData;
  }
  routesTableTitles = () => {
    return (
        <thead>
          <tr>
            <th onClick={() => this.sortBy('name')} >Route name</th>
            <th onClick={() => this.sortBy('from')} >From</th>
            <th onClick={() => this.sortBy('to')} >To</th>
          </tr>
        </thead>
    );
  }

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy = (key) => {
    let arrayCopy = [...this.state.tableData];
    arrayCopy.sort(this.compareBy(key));
    this.setState({tableData: arrayCopy});
  }

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
}

export default RoutesContainer;
