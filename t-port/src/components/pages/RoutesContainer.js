import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';
import GoogleMap from './presentational/GoogleMap';

class RoutesContainer extends Component {
    constructor(props){
        super(props);
        const routes = JSONdata.routes, stops = JSONdata.stops;
        this.state = {
            routesTableRows: this.createRoutesTable(routes, stops),
            isCardShowen: false,
            routesTableTitles: this.routesTableTitles(),
            routesCardTableTitles: this.routesCardTableTitles()
        }
    }
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Routes</h2>
                <Table rows = { this.state.routesTableRows } header = { this.state.routesTableTitles }/>
                <div className="google-map--small"><GoogleMap/></div>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.routesCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
  
  createRoutesTable = (routes, stops) => {
    let name = [], from = [], to = [], routesData = [];
    for (let route in routes){
        for (let stop in stops){
            if (parseInt(routes[route].stops[0]) == parseInt(stops[stop].number)){
                from.push(stops[stop].name);
            }
            if (routes[route].stops[routes[route].stops.length-1] == parseInt(stops[stop].number)){
                to.push(stops[stop].name);
            }
        }
        name.push(routes[route].name);
    }
    for (let each in name){
        routesData[each] = {name: name[each], from: from[each], to: to[each]}
    }
    let routesTableRows = routesData.map((row, index) => {
        return (
          <tr key={index}>
              <td onClick={this.showCard}><a>{row.name}</a></td>
              <td>{row.from}</td>
              <td>{row.to}</td>
          </tr>
        );
    });
    return routesTableRows;
  }
  routesTableTitles = () => {
    return (
        <tr>
            <th>Route name</th>
            <th>From</th>
            <th>To</th>
        </tr>
    );
  }
  routesCardTableTitles = () => {
    return (
      <tr>
        <th>Stop</th>
        <th>Time</th>
      </tr>
    );
  }
}

export default RoutesContainer;
