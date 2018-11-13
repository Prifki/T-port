import React from 'react';

function FilterField(props) {
    return (
      <div className="filter-wrapper">
        <input type="text" className="filter__input" placeholder={props.filterPlaceholder} onChange={props.filterBy} value={props.filterByValue} />
      </div>
    );
}

export default FilterField;
