import React, { Component } from 'react';

class GlobalSearch extends Component {
  render() {
    return (
        <div className="global-search">
            <input type="text" className="global-search__input" placeholder="Search..." list="global-search-results__items"/>
            <div className="global-search-results">
                <ul className="global-search-results__items"></ul>
            </div>
            <span className="global-search__button">
                <i className="material-icons">search</i>
            </span>
        </div>
    );
  }
}

export default GlobalSearch;
