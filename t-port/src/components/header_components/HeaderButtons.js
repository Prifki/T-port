import React, { Component } from 'react';

class HeaderButtons extends Component {
  render() {
    return (
        <div className="header-buttons">
            <div className="header-buttons__button--favorites">
                <i className="material-icons">star_border</i>
            </div>
            <div className="header-buttons__button--login">
                <i className="material-icons">lock_open</i>
            </div>
            <div className="header-buttons__button--find-pic">
                <i className="material-icons">search</i>
            </div>
        </div>
    );
  }
}

export default HeaderButtons;
