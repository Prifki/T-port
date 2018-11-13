import React from 'react';

function FilterByType(props) {
    return (
      <div className="filters">
        <div className="filters--by-type">
            <input type="checkbox" name="bus" checked={props.isFilteredByBus} onChange={()=>{}} />
            <label htmlFor="bus" className="filters--by-type__item filters--by-type__item--first" onClick={()=> props.filterByType('directions_bus')} ><i className="pictorams">directions_bus</i> Bus</label>

            <input type="checkbox" name="troll" checked={props.isFilteredByTroll} onChange={()=>{}} />
            <label htmlFor="train" className="filters--by-type__item" onClick={()=> props.filterByType('train')} ><i className="pictorams">train</i> Trolley</label>

            <input type="checkbox" name="tram" checked={props.isFilteredByTram} onChange={()=>{}} />
            <label htmlFor="tram" className="filters--by-type__item filters--by-type__item--last" onClick={()=> props.filterByType('tram')} ><i className="pictorams">tram</i> Tram</label>
        </div>
      </div>
    );
}

export default FilterByType;
