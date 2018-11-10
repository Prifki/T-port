import React, { Component } from 'react';
import {Marker} from 'google-maps-react';

import Table from './presentational/Table';
import Card from './presentational/Card';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';
import JSONdata from './../../data/data.json';

class StopsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            stops: JSONdata.stops,
            isCardShown: false,
            isEditingMode: false,
            isSortedAscending: false,
            addStopsTableItem: this.createAddItemRow(),
            addCardTableItem: this.createAddCardItemRow(),
            isMapNeededOnCard: true,
            markers: null
        }
    }
  render() {
    console.log(this.props.favorites);
    const rows = this.generateStopTableRow(),
    stopsTableTitles = this.stopsTableTitles(),
    cardTableTitles = this.cardTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Stops</h2>

                <div className="filter-wrapper">
                  <input type="text" className="filter__input" placeholder="Filter by route" onChange={this.filterByRoute} />
                </div>

                <Table header = {stopsTableTitles} rows = {rows} isAdmin={this.props.isAdmin} toggleEditingMode={this.toggleEditingMode} addItem={this.state.addStopsTableItem} />

                {this.state.isCardShown ? <Card addToFavorites={this.props.addToFavorites} favorites={this.props.favorites} markers={this.state.markers} closeCard={this.closeCard} header={cardTableTitles} rows={this.state.cardTableRows} isAdmin={this.props.isAdmin} addItem={this.state.addCardTableItem} isEditingMode={this.state.isEditingMode} toggleEditingMode={this.toggleEditingMode} title={this.state.cardTitle} isMapNeededOnCard={this.state.isMapNeededOnCard} /> : null}
            </div>
        </main>
    );
  }

  removeTableItem = (index) => {
    const newRouteData = this.state.stops.filter((route, i) => { 
      return i !== index;
    });
    this.setState({stops: newRouteData});
  }

  filterByRoute = (e) => {
    let filteredArray = [];
    for (let stop in JSONdata.stops) {
      for (let route in JSONdata.stops[stop].routes)
        if (~JSONdata.stops[stop].routes[route].indexOf(e.target.value.toUpperCase())){
          filteredArray.push(JSONdata.stops[stop]);
          break;
        }
    }
    this.setState({stops: filteredArray});
  }

  stopsTableTitles = () => {
      return (
        <thead>
        <tr>
          <th onClick={() => this.sortBy('name')} className="table__column-title" >Name</th>
          <th>Routes</th>
          {this.state.isEditingMode ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
      );
  }

  generateStopTableRow = () => {
    return this.state.stops.map( (rowData, index) => 
      <tr key={index}>
        <td className="table__link" onClick={() => this.showCard(rowData.name, rowData.routes)}>{rowData.name}</td>
        <td>{rowData.routes.join(', ')}</td> 
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'} onClick={() => this.removeTableItem(index)} /></> : null}  
      </tr>
    )
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
    let arrayCopy = [...this.state.stops];
    arrayCopy.sort(this.compareBy(key));
    this.setState({stops: arrayCopy});
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

  showCard = (stopName,routesList) => {
    const ROUTES = JSONdata.routes, TRANSPORTS = JSONdata.transport, STOPS = JSONdata.stops;
    let cardTitle = stopName, location;
    for (let STOP in STOPS){
      if (stopName === STOPS[STOP].name){
				location = {name: stopName, lat: parseFloat(STOPS[STOP].lat), long: parseFloat(STOPS[STOP].long)};
        stopName = STOPS[STOP].number;
      }
    }
    let cardData = [];
      for (let route in routesList){
        for (let ROUTE in ROUTES){
          if (ROUTES[ROUTE].name === routesList[route]){
            let times = [];
            for (let stop in ROUTES[ROUTE].stops){
              if (stopName === ROUTES[ROUTE].stops[stop]){
                for (let TRANSPORT in TRANSPORTS){
                  if (TRANSPORTS[TRANSPORT].route === routesList[route]){
                    times.push(TRANSPORTS[TRANSPORT].time[stop]);
                  }
                }
              }
            }
            cardData.push({route: routesList[route], times: times});
          }
        }
      }
      for (let each in cardData){
        cardData[each].id = each;
      }
      this.setState({
        isCardShown: true,
        cardTableRows: this.generateStopCardTableRow(cardData),
        cardTitle: cardTitle,
        markers: this.generateMarkers(location)
      })
  }

  generateStopCardTableRow = (arr) => {
    return arr.map( (rowData, index) => 
      <tr key={index}>
        <td>{rowData.route}</td>
        <td>{rowData.times.join(', ')}</td>
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'} onClick={() => this.removeCardTableItem(index)} /></> : null}   
      </tr>
    )
  }

  removeCardTableItem = (index) => {
    const newStopData = this.state.cardTableRows.filter((stop, i) => { 
      return i !== index;
    });
    this.setState({cardTableRows: newStopData});
  }

  cardTableTitles = () => {
    return (
      <thead>
        <tr>
          <th>Route</th>
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
  generateMarkers = (loc) => {
    console.log(loc);
    return <Marker title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />
  }
}

export default StopsContainer;
