import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

import Table from './presentational/Table';
import Card from './presentational/Card';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';

class StopsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            stops: this.props.data.stops,
            isCardShown: false,
            isCardInFavorites: false,
            isEditingMode: false,
            isSortedAscending: false,
            addStopsTableItem: this.createAddItemRow(),
            isMapNeededOnCard: true,
            markers: null,
            cardTitle: null,
            addItemNameValue: '',
            addItemRoutesValue: '',
            editTableNameItem: ''
        }
    }
  render() {
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

                <Table addItemNameValue={this.state.addItemNameValue} addItemRoutesValue={this.state.addItemRoutesValue} header = {stopsTableTitles} rows = {rows} isAdmin={this.props.isAdmin} toggleEditingMode={this.toggleEditingMode} addItem={this.state.addStopsTableItem} isEditingMode={this.state.isEditingMode} />

                {this.state.isCardShown ? <Card isLogged={this.props.isLogged} addToFavorites={this.props.addToFavorites} favorites={this.props.favorites} markers={this.state.markers} closeCard={this.closeCard} header={cardTableTitles} rows={this.state.cardTableRows} title={this.state.cardTitle} isMapNeededOnCard={this.state.isMapNeededOnCard} isCardInFavorites={this.state.isCardInFavorites} bookmark={this.bookmark} removeFromFavoritesByCard={this.props.removeFromFavoritesByCard} unBookmark={this.unBookmark} /> : null}
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
    for (let stop in this.props.data.stops) {
      for (let route in this.props.data.stops[stop].routes)
        if (~this.props.data.stops[stop].routes[route].indexOf(e.target.value.toUpperCase())){
          filteredArray.push(this.props.data.stops[stop]);
          break;
        }
    }
    this.setState({stops: filteredArray});
  }

  stopsTableTitles = () => {
      const arrow = this.state.isSortedAscending ? 'arrow_drop_up' : 'arrow_drop_down';
      return (
        <thead>
        <tr>
          <th onClick={() => this.sortBy('name')} className="table__column-title--sortable" >Name <i className="material-icons">{arrow}</i></th>
          <th>Routes</th>
          {(this.state.isEditingMode && this.props.isAdmin) ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
      );
  }

  generateStopTableRow = () => {
    return this.state.stops.map( (rowData, index) => 
      <tr key={index}>
        <td className="table__link" onClick={() => this.showCard(rowData.name, rowData.routes)}>{rowData.name}</td>
        <td>{rowData.routes.join(', ')}</td> 
        {(this.state.isEditingMode && this.props.isAdmin) ? <>
        <EditTableButton type={rowData.isEditing} onClick={() => this.editTableItem(index)} />
        <EditTableButton type={'remove'} onClick={() => this.removeTableItem(index)} /></> : null}  
      </tr>
    )
  }

  editTableItem = (index) => {
    if (this.state.stops[index].isEditing === 'edit') {
      const newData = this.state.stops;
      newData[index] = {number: this.state.stops[index].number, letter: this.state.stops[index].letter, name: <input type="text" className="table-edit-input" placeholder="Name" name="name" value={this.props.editTableNameItem} onChange={this.updateEditItemNameValue} />, lat: "59.95", long: "30.284", routes: this.state.stops[index].routes, isEditing: "done"}
      this.setState({stops: newData});
    }
    else {
      const newData = this.state.stops;
      newData[index] = {number: this.state.stops[index].number, letter: this.state.stops[index].letter, name: this.state.editTableNameItem, lat: "59.95", long: "30.284", routes: this.state.stops[index].routes, isEditing: "edit"}
      this.setState({stops: newData});
    }
  }
  updateEditItemNameValue = (e) => {
    this.setState({editTableNameItem: e.target.value});
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
        <td><input type="text" className="table-edit-input" placeholder="Name" name="name" value={this.props.addItemNameValue} onChange={this.updateAddItemNameValue} /></td>
        <td><input type="text" className="table-edit-input" placeholder="Routes" name="routes" value={this.props.addItemRoutesValue} onChange={this.updateAddItemRoutesValue} /></td>
        <td onClick={this.addTableItem}><i className="material-icons table-editor-buttons">add_circle_outline</i></td>
        <td></td>
      </tr>
    )
  }

  addTableItem = () => {
    let stopsArrayCopy = this.state.stops;
    stopsArrayCopy.push({number: stopsArrayCopy.length, name: this.state.addItemNameValue, routes: [this.state.addItemRoutesValue], lat: "59.9500", long: "30.359400", letter: "X", isEditing: 'edit'});
    this.setState({stops: stopsArrayCopy});
  }

  updateAddItemNameValue = (e) => {
    this.setState({addItemNameValue: e.target.value});
  }
  updateAddItemRoutesValue = (e) => {
    this.setState({addItemRoutesValue: e.target.value});
  }

  showCard = (stopName,routesList) => {
    const ROUTES = this.props.data.routes, TRANSPORTS = this.props.data.transport, STOPS = this.props.data.stops;
    let cardTitle = stopName, location, isCardInFavorites = this.checkCardForFavorites(stopName);
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
        isCardInFavorites: isCardInFavorites,
        markers: this.generateMarkers(location)
      })
  }

  generateStopCardTableRow = (arr) => {
    return arr.map( (rowData, index) => 
      <tr key={index}>
        <td className="table__link" onClick={() => this.props.openModalCard("Route "+rowData.route)} >{rowData.route}</td>
        <td>{rowData.times.join(', ')}</td>
      </tr>
    )
  }

  cardTableTitles = () => {
    return (
      <thead>
        <tr>
          <th>Route</th>
          <th>Time</th>
        </tr>
      </thead>
    );
  }

  closeCard = () => {
    this.setState({ 
      isCardShown: false
    });
  }

  checkCardForFavorites = (cardTitle) => {
    for (let each in this.props.favorites) {
      if (this.props.favorites[each].title === cardTitle) {
        return true;
      }
    }
    return false;
  }

  bookmark = () => {
    console.log(this.props.favorites.length)
    if (this.props.favorites.length < 5)
      this.setState({isCardInFavorites: true});
    else
      this.setState({isCardInFavorites: false});
  }

  unBookmark = () => {
    this.setState({isCardInFavorites: false});
  }

  generateMarkers = (loc) => {
    try{
      return <Marker title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />
    }
    catch (err) {console.log('Without markers for today :(');}
  }
}

export default StopsContainer;
