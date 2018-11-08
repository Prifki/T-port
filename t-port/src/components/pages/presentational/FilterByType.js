import React, { Component } from 'react';

class FilterByType extends Component {
  render() {
    //console.log('this.props.isFilteredByBus: '+this.props.isFilteredByBus+'\nthis.props.isFilteredByTram: '+this.props.isFilteredByTram+'\nthis.props.isFilteredByTroll: '+this.props.isFilteredByTroll);
    return (
      <div className="filters">
        <div className="filters--by-type">
            <input type="checkbox" name="bus" checked={this.props.isFilteredByBus} onChange={()=>{}} />
            <label htmlFor="bus" className="filters--by-type__item filters--by-type__item--first" onClick={()=> this.props.filterByType('directions_bus')} ><i className="material-icons">directions_bus</i> Bus</label>

            <input type="checkbox" name="troll" checked={this.props.isFilteredByTroll} onChange={()=>{}} />
            <label htmlFor="train" className="filters--by-type__item" onClick={()=> this.props.filterByType('train')} ><i className="material-icons">train</i> Trolley</label>

            <input type="checkbox" name="tram" checked={this.props.isFilteredByTram} onChange={()=>{}} />
            <label htmlFor="tram" className="filters--by-type__item filters--by-type__item--last" onClick={()=> this.props.filterByType('tram')} ><i className="material-icons">tram</i> Tram</label>
        </div>
      </div>
    );
  }
}

export default FilterByType;
