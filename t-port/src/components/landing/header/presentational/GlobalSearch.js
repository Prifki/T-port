import React, { Component } from 'react';

class GlobalSearch extends Component {
  render() {
    return (
        <div className="global-search">
            <input type="text" className="global-search__input" placeholder="Search..." list="global-search-results__items" onChange={this.props.globalAutoComplete} onTransitionEnd={this.props.hideGlobalAutoComplete} onFocus={this.props.globalAutoComplete} />
            {this.props.isGlobalAutoCompleteShown ?
            <div className="global-search-results">
                <ul className="global-search-results__items">
                    {this.props.globalAutoCompleteItems}
                </ul>
            </div>
            : null}
            <span className="global-search__button">
                <i className="pictorams">search</i>
            </span>
        </div>
    );
  }
}

export default GlobalSearch;
