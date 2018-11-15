import React, { Component } from 'react';

import FilterByType from './presentational/FilterByType';
import AddTransportTypeButtons from './presentational/AddTransportTypeButtons';
import FilterField from './presentational/FilterField';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';

class TransportsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      transport: this.props.data.transport,
      isEditingMode: false,
      isCardShown: false,

      isFilteredByBus: false,
      isFilteredByTram: false,
      isFilteredByTroll: false,

      isAddBusChecked: false,
      isAddTrainChecked: false,
      isAddTramChecked: false,
      checkedType: '',

      filterByRouteValue: '',
      isMapNeededOnCard: false,
      isCardInFavorites: false,
      isSortedAscending: false,

      addItemNumberValue: '',
      addItemRouteValue: '',
      addItemSeatsValue: '',

      editTableRouteItem: '',
      editTableSeatsItem: '',
      editTableNumberItem: '',
      currentPage: 1
    }
  }
  render() {
    const rows = this.generateTransportTableRow(),
    transportTableTitles = this.transportTableTitles(),
    cardTableTitles = this.cardTableTitles(),
    pagination = this.generatePagination(),
    addTransportTableItem =  this.createAddItemRow();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>

                {/* FILTERING*/}
                <FilterByType filterByType={this.filterByType} isFilteredByBus={this.state.isFilteredByBus} isFilteredByTram={this.state.isFilteredByTram} isFilteredByTroll={this.state.isFilteredByTroll} />

                <FilterField filterBy={this.filterByRoute} filterByValue={this.state.filterByRouteValue} filterPlaceholder="Filter By Route" />

                {/* TABLE */}
                <Table addItemNumberValue={this.state.addItemNumberValue} addItemRouteValue={this.state.addItemRouteValue} addItemSeatsValue={this.state.addItemSeatsValue} header = {transportTableTitles} rows = {rows} isAdmin={this.props.isAdmin} addItem={addTransportTableItem} isEditingMode={this.state.isEditingMode} toggleEditingMode={this.toggleEditingMode} addTableItem={this.addTableItem} />

                <Pagination pagination={pagination} />

                {/* CARD */}
                {this.state.isCardShown ? <Card isLogged={this.props.isLogged} addToFavorites={this.props.addToFavorites} closeCard={this.closeCard} header={cardTableTitles} rows={this.state.cardTableRows} title={this.state.cardTitle} isMapNeededOnCard={this.state.isMapNeededOnCard} isCardInFavorites={this.state.isCardInFavorites} bookmark={this.bookmark} removeFromFavoritesByCard={this.props.removeFromFavoritesByCard} unBookmark={this.unBookmark} />: null}
            </div>
        </main>
    );
  }

  generatePagination = () => {
    const data = this.state.transport; 
    let pagination=[], current = this.state.currentPage;
    for (let i = 1; i <= Math.ceil(data.length / 15); i++) {
      if (i === current)
        pagination.push([i, 'pagination--active']);
      else
        pagination.push([i, ''])
    }
    return pagination.map((page,index)=>
      <div key={index} className={page[1]} onClick={() => this.changePage(index+1)}>{index+1}</div>
    );
  }

  changePage = (page) => {
    this.setState({currentPage: page});
  }

  filterByRoute = (e) => {
    let filteredArray = this.props.data.transport.filter(transport => ~transport.route.indexOf(e.target.value.toUpperCase()));
    this.setState({
      transport: filteredArray, 
      currentPage: 1,
      filterByRouteValue: e.target.value,
      isFilteredByBus: false,
      isFilteredByTram: false,
      isFilteredByTroll: false
    });
  }

  transportTableTitles = () => {
    const arrow = this.state.isSortedAscending ? 'arrow_drop_up' : 'arrow_drop_down';
    return (
      <thead>
        <tr>
          <th>Type</th>
          <th>Number</th>
          <th>Route</th>
          <th onClick={() => this.sortBy('seats')} className="table__column-title--sortable" >Seats <i className="pictorams">{arrow}</i></th>
          {(this.state.isEditingMode && this.props.isAdmin) ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
    );
  }

  generateTransportTableRow = () => {
    return this.state.transport.map( (rowData, index) => 
      <tr key={index} className={rowData.isHighlited}>
        <td><i className="pictorams">{rowData.type}</i></td>
        <td className="table__link" onClick={() => this.showCard(rowData.number, rowData.type, index)}>{rowData.number}</td>
        <td>{rowData.route}</td>
        <td>{rowData.seats}</td>
        {(this.state.isEditingMode && this.props.isAdmin) ? 
          <td className="table-editor-buttons__td">
            <EditTableButton type={rowData.isEditing} onClick={() => this.editTableItem(index)} />
            <EditTableButton type={'close'} onClick={() => this.removeTableItem(index)}/>
          </td> : null}
      </tr>
    ).filter((rowData, index) => { 
      return (index >= (this.state.currentPage-1)*15 && index < (this.state.currentPage)*15)});
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

  removeTableItem = (index) => {
    const newTransportData = this.state.transport.filter((trans, i) => { 
      return i !== index;
    });
    this.setState({transport: newTransportData});
  }

  editTableItem = (index) => {
    if (this.state.transport[index].isEditing === 'edit') {
      const newTransportData = this.state.transport;
      newTransportData[index] = {id: this.state.transport[index].id, type: this.state.transport[index].type, number: <input type="text" className="table-edit-input" placeholder="Number" name="number" value={this.props.editTableNumberItem} onChange={this.updateEditItemNumberValue} />, seats: <input type="text" className="table-edit-input" placeholder="Seats" name="seats" value={this.props.editTableSeatsItem} onChange={this.updateEditItemSeatsValue} />, route: <input type="text" className="table-edit-input" placeholder="Route" name="route" value={this.props.editTableRouteItem} onChange={this.updateEditItemRouteValue} />, time: ["00:00","00:00","00:00"], isEditing: "done"}
      this.setState({transport: newTransportData});
    }
    else {
      const newTransportData = this.state.transport;
      newTransportData[index] = {id: this.state.transport[index].id, type: this.state.transport[index].type, number: this.state.editTableNumberItem, seats: this.state.editTableSeatsItem, route: this.state.editTableRouteItem, time: ["00:00","00:00","00:00"], isEditing: "edit"}
      this.setState({transport: newTransportData});
    }
  }
  updateEditItemNumberValue = (e) => {
    this.setState({editTableNumberItem: e.target.value});
  }
  updateEditItemRouteValue = (e) => {
    this.setState({editTableRouteItem: e.target.value});
  }
  updateEditItemSeatsValue = (e) => {
    this.setState({editTableSeatsItem: e.target.value});
  }

  sortBy = (key) => {
    let arrayCopy = [...this.state.transport];
    arrayCopy.sort(this.compareBy(key));
    this.setState({transport: arrayCopy});
  }

  filterByType = (type) => {
    let arrayCopy = this.props.data.transport,
    tempBus = this.state.isFilteredByBus,
    tempTram = this.state.isFilteredByTram,
    tempTroll = this.state.isFilteredByTroll;
      if (type === 'directions_bus')
        tempBus = !tempBus;
      if (type === 'tram')
        tempTram = !tempTram;
      if (type === 'train')
        tempTroll = !tempTroll;
      if (tempBus)
        arrayCopy = arrayCopy.filter(transport => !(transport.type === 'directions_bus'));
      if (tempTram)
        arrayCopy = arrayCopy.filter(transport => !(transport.type === 'tram'));
      if (tempTroll)
        arrayCopy = arrayCopy.filter(transport => !(transport.type === 'train'));
      if (tempBus && tempTram && tempTroll) {
        arrayCopy = this.props.data.transport;
        this.setState({
          transport: arrayCopy,
          isFilteredByBus: false,
          isFilteredByTram: false,
          isFilteredByTroll: false,
          currentPage: 1,
          filterByRouteValue: ''
        });
      }
      else 
        this.setState({
          transport: arrayCopy,
          isFilteredByBus: tempBus,
          isFilteredByTram: tempTram,
          isFilteredByTroll: tempTroll,
          currentPage: 1,
          filterByRouteValue: ''
        });
  }

  toggleEditingMode = () => {
    this.setState( prevState => {
      return {
        isEditingMode: !prevState.isEditingMode
      }
    })
  }

  checkAddTransportButton = (type) => {
    let isBusChecked = false, isTramChecked = false, isTrollChecked = false, checkedType;
    if (type === 'directions_bus'){
      checkedType = 'directions_bus'
      isBusChecked = true;
    }
    if (type === 'tram') {
      checkedType = 'tram'
      isTramChecked = true;
    }
    if (type === 'train') {
      checkedType = 'train'
      isTrollChecked = true;
    }
    this.setState({
      isAddBusChecked: isBusChecked,
      isAddTramChecked: isTramChecked,
      isAddTrollChecked: isTrollChecked,
      checkedType: checkedType
    });
  }

  createAddItemRow = () => {
    return(
      <tr>
        <td><AddTransportTypeButtons checkAddTransportButton={this.checkAddTransportButton} isAddBusChecked={this.state.isAddBusChecked} isAddTramChecked={this.state.isAddTramChecked} isAddTrollChecked={this.state.isAddTrollChecked} /></td>
        <td><input type="text" className="table-edit-input" placeholder="Number" name="number" value={this.props.addItemNumberValue} onChange={this.updateAddItemNumberValue} /></td>
        <td><input type="text" className="table-edit-input" placeholder="Route" name="route" value={this.props.addItemRoutesValue} onChange={this.updateAddItemRouteValue} /></td>
        <td><input type="text" className="table-edit-input" placeholder="Seats" name="seats" value={this.props.addItemSeatsValue} onChange={this.updateAddItemSeatsValue} /></td>
        <td onClick={this.addTableItem} className="centered"><i className="pictorams table-editor-buttons">add_circle_outline</i></td>
      </tr>
    )
  }

  addTableItem = () => {
    let transportArrayCopy = this.state.transport;
    transportArrayCopy.push({id: transportArrayCopy.length, type: <i className="pictorams">{this.state.checkedType}</i>, number: this.state.addItemNumberValue, seats: this.state.addItemSeatsValue, route: this.state.addItemRouteValue, time: ["00:00","00:00","00:00"], isEditing: 'edit'});
    this.setState({transport: transportArrayCopy, currentPage: Math.ceil(transportArrayCopy.length / 15)});
  }

  updateAddItemNumberValue = (e) => {
    this.setState({addItemNumberValue: e.target.value});
  }
  updateAddItemRouteValue = (e) => {
    this.setState({addItemRouteValue: e.target.value});
  }
  updateAddItemSeatsValue = (e) => {
    this.setState({addItemSeatsValue: e.target.value});
  }

  showCard = (number, type, index) => {
      let cardTitle;
      switch(type) {
        case 'directions_bus':
          cardTitle = 'Bus ' + number;
          break;
        case 'tram':
          cardTitle = 'Tram ' + number;
          break;
        case 'train':
          cardTitle = 'Trolleybus ' + number;
          break;
        default:
          break;
      }
      const TRANSPORTS = this.props.data.transport,
      ROUTES = this.props.data.routes,
      STOPS = this.props.data.stops;
      let schedule, routeNum, stops, stopNames = [], cardTableData = [], isCardInFavorites = this.checkCardForFavorites(cardTitle);
      for (let transport in TRANSPORTS){
        if(Object.entries(TRANSPORTS[transport])[1][1]===number){
          schedule = TRANSPORTS[transport].time;
          routeNum = TRANSPORTS[transport].route;
          for (let route in ROUTES){
            if (Object.entries(ROUTES[route])[0][1]===routeNum){
              stops = ROUTES[route].stops;
            }
          }
        }
      }
      for (let stop in stops){
        for (let STOP in STOPS){
          if (stops[stop] === STOPS[STOP].number)
            stopNames.push(STOPS[STOP].name);
        }
      }
      for (let each in stopNames){
        cardTableData.push({id: each, stopName: stopNames[each], time: schedule[each]});
      }
      let newArray = this.state.transport;
      for (let each in newArray) {
        newArray[each].isHighlited = '';
      }
      newArray[index].isHighlited = 'highlited';
		  this.setState({ 
        transport: newArray,
        cardTableRows: this.generateTransportCardTableRow(cardTableData),
        isCardShown: true,
        cardTitle: cardTitle,
        isCardInFavorites: isCardInFavorites
      });
  }

  closeCard = () => {
    let newArray = this.state.transport;
    for (let each in newArray) {
      newArray[each].isHighlited = '';
    }
    this.setState({ 
      transport: newArray,
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

  generateTransportCardTableRow = (arr) => {
    return arr.map( (rowData, index) => 
      <tr key={index}>
        <td className="table__link" onClick={() => this.props.openModalCard(rowData.stopName)} >{rowData.stopName}</td>
        <td>{rowData.time}</td> 
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
}

export default TransportsContainer;
