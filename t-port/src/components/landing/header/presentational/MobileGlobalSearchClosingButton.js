import React, { Component } from 'react';

class MobileGlobalSearchClosingButton extends Component {
  render() {
    return (
        <div className="mobile-global-search__button--close" onClick={this.props.onClick}>
            <i className="material-icons icon--closing">close</i>
        </div>
    );
  }
}

export default MobileGlobalSearchClosingButton;
