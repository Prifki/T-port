import React, { Component } from 'react';
import FilterByType from './presentational/FilterByType';
import Table from './presentational/Table';
import Pagination from './presentational/Pagination';
import Card from './presentational/Card';
import EditingColumnTitles from './presentational/EditingColumnTitles';
import EditTableButton from './presentational/EditTableButton';
import JSONdata from './../../data/data.json';

class TransportsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      transport: JSONdata.transport,
      isEditingMode: true,
      isCardShowen: false
    }
  }
  render() {
    const rows = this.generateTransportTableRow(),
    transportTableTitles = this.transportTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Transport</h2>
                <FilterByType />
                <Table header = {transportTableTitles} rows = {rows} isAdmin={this.props.isAdmin} toggleEditingMode={this.toggleEditingMode}/>
                <Pagination />
                {this.state.isCardShowen ? <Card tableHeader = { this.state.transportCardTableTitles } /> : null}
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
        <td>{rowData.number}</td>
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

  toggleEditingMode = () => {
    this.setState( prevState => {
      return {
        isEditingMode: !prevState.isEditingMode
      }
    })
  }

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }
}

export default TransportsContainer;
