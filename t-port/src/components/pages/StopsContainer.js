import React, { Component } from 'react';
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
            isCardShowen: false,
            isEditingMode: false,
            isSortedAscending: false
        }
    }
  render() {
    const rows = this.generateStopTableRow(),
    stopsTableTitles = this.stopsTableTitles();
    return (
        <main>
            <div className="substrate">
                <h2 className="page-name">Stops</h2>
                <Table header = {stopsTableTitles} rows = {rows} isAdmin={this.props.isAdmin} toggleEditingMode={this.toggleEditingMode}/>
                {this.state.isCardShowen ? <Card tableHeader = { this.state.stopsCardTableTitles } /> : null}
            </div>
        </main>
    );
  }
  
  stopsTableTitles = () => {
      return (
        <thead>
        <tr>
          <th onClick={() => this.sortBy('name')}>Name</th>
          <th onClick={() => this.sortBy('routes')}>Routes</th>
          {this.state.isEditingMode ? <EditingColumnTitles /> : null}
        </tr>
      </thead>
      );
  }

  generateStopTableRow = () => {
    return this.state.stops.map( (rowData) => 
      <tr key={rowData.number}>
        <td>{rowData.name}</td>
        <td>{rowData.routes}</td> 
        {this.state.isEditingMode ? <>
        <EditTableButton type={'edit'}/>
        <EditTableButton type={'remove'}/></> : null}  
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

  showCard = () => {
    this.setState({
      isCardShowen: true
    })
  }

}

export default StopsContainer;
