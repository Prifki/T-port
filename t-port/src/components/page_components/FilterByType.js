import React, { Component } from 'react';

class FilterByType extends Component {
  render() {
    return (
      <div className="filters">
        <div className="filters--by-type">
            <input type="checkbox" name="bus" />
            <label htmlFor="bus" className="filters--by-type__item filters--by-type__item--first"><i className="material-icons">directions_bus</i> Bus</label>

            <input type="checkbox" name="train" />
            <label htmlFor="train" className="filters--by-type__item"><i className="material-icons">train</i> Trolley</label>

            <input type="checkbox" name="tram" />
            <label htmlFor="tram" className="filters--by-type__item filters--by-type__item--last"><i className="material-icons">tram</i> Tram</label>
        </div>
      </div>
    );
  }
}

export default FilterByType;
