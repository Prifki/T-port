import React, { Component } from 'react';
import {Marker} from 'google-maps-react';

import Table from './presentational/Table';
import Card from './presentational/Card';
import JSONdata from './../../data/data.json';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';
import GoogleMap from './presentational/GoogleMap';

class RoutesContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCardShown: false,
            isEditingMode: false,
            tableData: this.handleData(),
            addRoutesTableItem: this.createAddItemRow(),
            addCardTableItem: this.createAddCardItemRow(),
            isSortedAscending: false,
            isMapNeededOnCard: false,
            markers: null,
            cardTableRows: null,
            cardTableTitles: null
        }
    }
  render() {
    const rows = this.generateRoutesTableRow(),
    routesTableTitles = this.routesTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Routes</h2>

                <Table header = {routesTableTitles} rows = {rows} isAdmin={this.props.isAdmin} toggleEditingMode={this.toggleEditingMode} addItem={this.state.addRoutesTableItem} />
                <div className="google-map--small">
                
                <GoogleMap markers={this.state.markers} /></div>


                {this.state.isCardShown ? <Card addToFavorites={this.props.addToFavorites} favorites={this.props.favorites} closeCard={this.closeCard} header={this.state.cardTableTitles} rows={this.state.cardTableRows} isAdmin={this.props.isAdmin} addItem={this.state.addCardTableItem} isEditingMode={this.state.isEditingMode} toggleEditingMode={this.toggleEditingMode} title={this.state.cardTitle} isMapNeededOnCard={this.state.isMapNeededOnCard} /> : null}
            </div>
        </main>
    );
  }
  
  removeTableItem = (index) => {
    const newRouteData = this.state.tableData.filter((route, i) => { 
      return i !== index;
    });
    this.setState({tableData: newRouteData});
  }

  generateRoutesTableRow = () => {
    return this.state.tableData.map( (rowData, index) => 
        <tr key={index}>
          <td className="table__link" onClick={() => this.showCard(rowData.name)}>{rowData.name}</td>
          <td>{rowData.from}</td>
          <td>{rowData.to}</td>   
          {this.state.isEditingMode ? <>
          <EditTableButton type={'edit'}/>
          <EditTableButton type={'remove'} onClick={() => this.removeTableItem(index)} /></> : null}  
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
            {this.state.isEditingMode ? <EditingColumnTitles /> : null}
          </tr>
        </thead>
    );
  }

  compareBy = (key) => {
    if (this.state.isSortedAscending) {
      this.setState(prevState => { return {isSortedAscending: !prevState.isSortedAscending}});
      return function (a, b) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      };
    }
    if (!this.state.isSortedAscending) {
      this.setState(prevState => { return {isSortedAscending: !prevState.isSortedAscending}});
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    }
  }
 
  sortBy = (key) => {
    let arrayCopy = [...this.state.tableData];
    arrayCopy.sort(this.compareBy(key));
    this.setState({tableData: arrayCopy});
  }

  toggleEditingMode = () => {
    this.setState( prevState => {
      return {
        isEditingMode: !prevState.isEditingMode
      }
    })
  }

  createAddItemRow = () => {
    return(
      <tr>
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><i className="material-icons table-editor-buttons">add_circle_outline</i></td>
        <td></td>
      </tr>
    )
  }
  createAddCardItemRow = () => {
    return(
      <tr>
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><i className="material-icons table-editor-buttons">add_circle_outline</i></td>
        <td></td>
      </tr>
    )
  }
  showCard = (name) => {
    let locations = [];
    let cardData = [];
      const ROUTES = JSONdata.routes, TRANSPORTS = JSONdata.transport, STOPS = JSONdata.stops;
      let stops = [];
      for (let ROUTE in ROUTES){
        if (name === ROUTES[ROUTE].name)
          stops = ROUTES[ROUTE].stops;
      }
      for (let STOP in STOPS){
        for (let stop in stops){
          if (stops[stop] === STOPS[STOP].number){
            stops[stop] = STOPS[STOP].name;
            locations[stop] = ({lat: STOPS[STOP].lat, long: STOPS[STOP].long, name: STOPS[STOP].name});
          }
        }
      }
      for (let i = 0; i < stops.length; i++) {
        let times = [];
        for (let TRANSPORT in TRANSPORTS){
            if (name === TRANSPORTS[TRANSPORT].route){
              times.push(TRANSPORTS[TRANSPORT].time[i]);
            }
        }
        cardData.push({id: i, stops: stops[i], times: times});
      }
    this.setState({
      isCardShown: true,
      cardTableRows: this.generateRoutesCardTableRow(cardData),
      cardTableTitles: this.cardTableTitles(),
      cardTitle: 'Route ' + name,
      markers: this.generateMarkers(locations)
    })
  }
  
  generateRoutesCardTableRow = (arr) => {
    return arr.map( (rowData, index) => 
      <tr key={index}>
        <td>{rowData.stops}</td>
        <td>{rowData.times.join(', ')}</td>
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'} onClick={() => this.removeCardTableItem(index)} /></> : null}   
      </tr>
    )
  }

  removeCardTableItem = (index) => {
    const newRouteData = this.state.cardTableRows.filter((stop, i) => { 
      return i !== index;
    });
    this.setState({cardTableRows: newRouteData});
  }

  cardTableTitles = () => {
    return (
      <thead>
        <tr>
          <th>Stop</th>
          <th>Time</th>
          {this.state.isEditingMode ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
    );
  }

  closeCard = () => {
    this.setState({ 
      isCardShown: false
    });
  }

  generateMarkers = (locations) => {
    console.log(locations);
    return locations.map((loc, index) => 
    <Marker key={index} title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />
    )
  }
}

export default RoutesContainer;
