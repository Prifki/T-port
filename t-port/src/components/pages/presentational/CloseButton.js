import React, { Component } from 'react';

class CloseButton extends Component {
  render() {
    return (
        <div className="menu__button--closing" onClick={this.props.onClick}>
            <i className="material-icons icon--closing">close</i>
        </div>
    );
  }
}

export default CloseButton;
