import React, { Component } from 'react';
import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';

class StopsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCardShowen: false,
            stopsTableTitles: <tr>
                                 <th>Name</th>
                                 <th>Routes</th>
                               </tr>,
            stopsCardTableTitles: <tr>
                                     <th>Route</th>
                                     <th>Time</th>
                                   </tr>
        };
        const stops = JSONdata.stops;
        let stopsData = [];
		for (let each in stops){
            stopsData[each] = {name: stops[each].name, routes: stops[each].routes.join(', ')}
		}
        this.stopsTableRows = stopsData.map((row, index) => {
            return (
              <tr key={index}>
                  <td onClick={this.showCard}><a>{row.name}</a></td>
                  <td>{row.routes}</td>
              </tr>
            );
        });
    }
  render() {
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Stops</h2>
                <Table rows = { this.stopsTableRows } header = { this.state.stopsTableTitles }/>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.stopsCardTableTitles } /> : null}
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

export default StopsContainer;
