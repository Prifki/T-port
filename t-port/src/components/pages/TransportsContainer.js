import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      transport: JSONdata.transport,
      isEditingMode: true,
      isCardShowen: false,
      addItem: this.createAddItemRow(),
      isFilteredByBus: false,
      isFilteredByTram: false,
      isFilteredByTroll: false
    }
  }
  render() {
    const rows = this.generateTransportTableRow(),
    transportTableTitles = this.transportTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType filterByBus={this.filterByBus} filterByTram={this.filterByTram} filterByTroll={this.filterByTroll} isFilteredByBus={this.state.isFilteredByBus} isFilteredByTram={this.state.isFilteredByTram} isFilteredByTroll={this.state.isFilteredByTroll} />
                <Table header = {transportTableTitles} rows = {rows} isAdmin={this.props.isAdmin} addItem={this.state.addItem} isEditingMode={this.state.isEditingMode} toggleEditingMode={this.toggleEditingMode}/>
                <Pagination />
                {this.state.isCardShowen ? <Router><Card/></Router>: null}
            </div>
        </main>
    );
  }
  transportTableTitles = () => {
    return (
      <thead>
        <tr>
          <th onClick={() => this.sortBy('type')} >Type</th>
          <th onClick={() => this.sortBy('number')} >Number</th>
          <th onClick={() => this.sortBy('route')} >Route</th>
          <th onClick={() => this.sortBy('seats')} >Seats</th>
          {this.state.isEditingMode ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
    );
  }

  generateTransportTableRow = () => {
    return this.state.transport.map( (rowData) => 
      <tr key={rowData.id}>
        <td><i className="material-icons">{rowData.type}</i></td>
        <td onClick={this.showCard}>{rowData.number}</td>
        <td>{rowData.route}</td>
        <td>{rowData.seats}</td>
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'}/></> : null}  
      </tr>
    )
  }

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy = (key) => {
    let arrayCopy = [...this.state.transport];
    arrayCopy.sort(this.compareBy(key));
    this.setState({transport: arrayCopy});
  }

  filterByType = () => {
    let arrayCopy = JSONdata.transport;
    console.log('isFilteredByBus: '+this.state.isFilteredByBus+'\nisFilteredByTroll: '+this.state.isFilteredByTroll+'\nisFilteredByTram: '+this.state.isFilteredByTram);
        if (this.state.isFilteredByBus)
          arrayCopy = arrayCopy.filter(transport => !(transport.type === 'directions_bus'));
        if (this.state.isFilteredByTram)
          arrayCopy =  arrayCopy.filter(transport => !(transport.type === 'tram'));
        if (this.state.isFilteredByTroll) 
          arrayCopy = arrayCopy.filter(transport => !(transport.type === 'train'));
        this.setState({transport: arrayCopy});
        console.log(arrayCopy);
  }

  filterByBus = () => {
    this.setState(prevState => { return {isFilteredByBus: !prevState.isFilteredByBus}});
    this.filterByType();
  }
  filterByTram = () => {
    this.setState(prevState => { return {isFilteredByTram: !prevState.isFilteredByTram}});
    this.filterByType();
  }
  filterByTroll = () => {
    this.setState(prevState => { return {isFilteredByTroll: !prevState.isFilteredByTroll}});
    this.filterByType();
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
        <td><input type="text" className="table-edit-input" /></td>
        <td><input type="text" className="table-edit-input" /></td>
        <td><i className="material-icons table-editor-buttons">add_circle_outline</i></td>
        <td></td>
      </tr>
    )
  }

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
}

export default TransportsContainer;
