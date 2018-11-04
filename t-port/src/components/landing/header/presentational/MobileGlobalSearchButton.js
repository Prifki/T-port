import React, { Component } from 'react';

class MobileGlobalSearchButton extends Component {
  render() {
    return (
        <div className="header-buttons__button--find-pic" onClick={this.props.onClick}>
            <i className="material-icons">search</i>
        </div>
    );
  }
}

export default MobileGlobalSearchButton;
