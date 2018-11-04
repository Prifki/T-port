import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class RoutesContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCardShowen: false,
            routes: JSONdata.routes,
            routesTableTitles: <tr>
                                 <th>Route name</th>
                                 <th>From</th>
                                 <th>To</th>
                               </tr>,
            routesCardTableTitles: <tr>
                                     <th>Stop</th>
                                     <th>Time</th>
                                   </tr>
        };
        const routes = JSONdata.routes,
		stops = JSONdata.stops;
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
        this.routesTableRows = routesData.map((row, index) => {
            return (
              <tr key={index}>
                  <td onClick={this.showCard}><a>{row.name}</a></td>
                  <td>{row.from}</td>
                  <td>{row.to}</td>
              </tr>
            );
        });
    }
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Routes</h2>
                <Table rows = { this.routesTableRows } header = { this.state.routesTableTitles }/>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.routesCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  showCard = (props) => {
    console.log(props);
    this.setState({
      isCardShowen: true
    })
  }
}

export default RoutesContainer;
