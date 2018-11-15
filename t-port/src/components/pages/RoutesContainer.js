import React, { Component } from 'react';
import { Marker } from 'google-maps-react';

import Table from './presentational/Table';
import Card from './presentational/Card';
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
            isSortedAscending: true,
            isMapNeededOnCard: false,
            isCardInFavorites: false,
            markers: null,
            polyline: null,
            cardTableRows: null,
            cardTableTitles: null,
            addItemNameValue: '',
            addItemFromValue: '',
            addItemToValue: '',
            editTableNameItem: '',
            editTableFromItem: '',
            editTableToItem: ''
        }
    }
  render() {
    const rows = this.generateRoutesTableRow(),
    routesTableTitles = this.routesTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Routes</h2>

                <Table addItemNameValue={this.state.addItemNameValue} addItemFromValue={this.state.addItemFromValue} addItemToValue={this.state.addItemToValue} header = {routesTableTitles} rows = {rows} isAdmin={this.props.isAdmin} toggleEditingMode={this.toggleEditingMode} addItem={this.state.addRoutesTableItem} isEditingMode={this.state.isEditingMode}/>
                <div className="google-map--small">
                
                <GoogleMap markers={this.state.markers} polyline={this.state.polyline} /></div>

                {this.state.isCardShown ? <Card isLogged={this.props.isLogged} addToFavorites={this.props.addToFavorites} favorites={this.props.favorites} closeCard={this.closeCard} header={this.state.cardTableTitles} rows={this.state.cardTableRows} title={this.state.cardTitle} isMapNeededOnCard={this.state.isMapNeededOnCard} isCardInFavorites={this.state.isCardInFavorites} bookmark={this.bookmark} removeFromFavoritesByCard={this.props.removeFromFavoritesByCard} unBookmark={this.unBookmark} /> : null}
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
        <tr key={index} className={rowData.isHighlited}>
          <td className="table__link" onClick={() => this.showCard(rowData.name, index)}>{rowData.name}</td>
          <td>{rowData.from}</td>
          <td>{rowData.to}</td>   
          {(this.state.isEditingMode && this.props.isAdmin) ? 
            <td className="table-editor-buttons__td"> 
              <EditTableButton type={rowData.isEditing} onClick={() => this.editTableItem(index)} />
              <EditTableButton type={'close'} onClick={() => this.removeTableItem(index)} />
            </td> : null}  
        </tr>
    )
  }

  editTableItem = (index) => {
    if (this.state.tableData[index].isEditing === 'edit') {
      const newData = this.state.tableData;
      newData[index] = {name: <input type="text" className="table-edit-input" placeholder="Name" name="name" value={this.props.editTableNameItem} onChange={this.updateEditItemNameValue} />, from: <input type="text" className="table-edit-input" placeholder="From" name="from" value={this.props.editTableFromItem} onChange={this.updateEditItemFromValue} />, to: <input type="text" className="table-edit-input" placeholder="To" name="to" value={this.props.editTableToItem} onChange={this.updateEditItemToValue} />, isEditing: "done"}
      this.setState({tableData: newData});
    }
    else {
      const newData = this.state.tableData;
      newData[index] = {name: this.state.editTableNameItem, from: this.state.editTableFromItem, to: this.state.editTableToItem, isEditing: "edit"}
      this.setState({tableData: newData});
    }
  }
  updateEditItemNameValue = (e) => {
    this.setState({editTableNameItem: e.target.value});
  }
  updateEditItemFromValue = (e) => {
    this.setState({editTableFromItem: e.target.value});
  }
  updateEditItemToValue = (e) => {
    this.setState({editTableToItem: e.target.value});
  }

  handleData = () => {
    const stops = this.props.data.stops, routes = this.props.data.routes;
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
        routesData[each] = {id: each, name: name[each], from: from[each], to: to[each], isEditing: "edit"};
    }
    return routesData;
  }
  routesTableTitles = () => {
    const arrow = this.state.isSortedAscending ? 'arrow_drop_up' : 'arrow_drop_down';
    return (
        <thead>
          <tr>
            <th onClick={() => this.sortBy('name')} className="table__column-title--sortable" >Route name <i className="pictorams">{arrow}</i></th>
            <th>From</th>
            <th>To</th>
            {(this.state.isEditingMode && this.props.isAdmin) ? <EditingColumnTitles /> : null}
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
        <td><input type="text" className="table-edit-input" placeholder="Name" name="name" value={this.props.addItemNameValue} onChange={this.updateAddItemNameValue} /></td>
        <td><input type="text" className="table-edit-input" placeholder="From" name="from" value={this.props.addItemFromValue} onChange={this.updateAddItemFromValue} /></td>
        <td><input type="text" className="table-edit-input" placeholder="To" name="to" value={this.props.addItemToValue} onChange={this.updateAddItemToValue} /></td>
        <td onClick={this.addTableItem} className="centered"><i className="pictorams table-editor-buttons">add_circle_outline</i></td>
      </tr>
    )
  }

  addTableItem = () => {
    let routeArrayCopy = this.state.tableData;
    routeArrayCopy.push({name: this.state.addItemNameValue, from: this.state.addItemFromValue, to: this.state.addItemToValue, isEditing: 'edit'});
    this.setState({tableData: routeArrayCopy});
  }

  updateAddItemNameValue = (e) => {
    this.setState({addItemNameValue: e.target.value});
  }
  updateAddItemFromValue = (e) => {
    this.setState({addItemFromValue: e.target.value});
  }
  updateAddItemToValue = (e) => {
    this.setState({addItemToValue: e.target.value});
  }

  showCard = (name, index) => {
      let locations = [], cardData = [], polyline = [], stops = [], stopNames = [], isCardInFavorites = this.checkCardForFavorites('Route ' + name);
      const ROUTES = this.props.data.routes, TRANSPORTS = this.props.data.transport, STOPS = this.props.data.stops;
      for (let ROUTE in ROUTES){
        if (name === ROUTES[ROUTE].name) {
          stops.push(ROUTES[ROUTE].stops);
        }
      }
      for (let stop in stops){
        for (let each in stops[stop]) {
          for (let STOP in STOPS) {
            if (stops[stop][each] === STOPS[STOP].number){
              stopNames.push(STOPS[STOP].name);
              locations.push({lat: STOPS[STOP].lat, long: STOPS[STOP].long, name: STOPS[STOP].name});
              polyline.push({lat: parseFloat(STOPS[STOP].lat), lng: parseFloat(STOPS[STOP].long)});
            }
          }
        }
      }
      console.log(stopNames)
      for (let i = 0; i < stopNames.length; i++) {
        let times = [];
        for (let TRANSPORT in TRANSPORTS){
            if (name === TRANSPORTS[TRANSPORT].route){
              times.push(TRANSPORTS[TRANSPORT].time[i]);
            }
        }
        cardData.push({id: i, stops: stopNames[i], times: times});
      }
      let newArray = this.state.tableData;
      for (let each in newArray) {
        newArray[each].isHighlited = '';
      }
      newArray[index].isHighlited = 'highlited';
    this.setState({
      tableData: newArray,
      isCardShown: true,
      cardTableRows: this.generateRoutesCardTableRow(cardData),
      cardTableTitles: this.cardTableTitles(),
      cardTitle: 'Route ' + name,
      isCardInFavorites: isCardInFavorites,
      markers: this.generateMarkers(locations),
      polyline: polyline
    })
  }
  
  generateRoutesCardTableRow = (arr) => {
    return arr.map( (rowData, index) => 
      <tr key={index}>
        <td className="table__link" onClick={() => this.props.openModalCard(rowData.stops)} >{rowData.stops}</td>
        <td>{rowData.times.join(', ')}</td>  
      </tr>
    )
  }

  cardTableTitles = () => {
    return (
      <thead>
        <tr>
          <th>Stop</th>
          <th>Time</th>
        </tr>
      </thead>
    );
  }

  closeCard = () => {
    let newArray = this.state.tableData;
    for (let each in newArray) {
      newArray[each].isHighlited = '';
    }
    this.setState({ 
      tableData: newArray,
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
    if (this.props.favorites.length < 5)
      this.setState({isCardInFavorites: true});
    else
      this.setState({isCardInFavorites: false});
  }

  unBookmark = () => {
    this.setState({isCardInFavorites: false});
  }

  generateMarkers = (locations) => {
    return locations.map((loc, index) => 
      <Marker key={index} title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />
    )
  }

}

export default RoutesContainer;
