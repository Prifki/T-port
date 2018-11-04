import React, { Component } from 'react';

class LoginButton extends Component {
  render() {
    return (
        <div className="header-buttons__button--login" onClick={this.props.onClick}>
            <i className="material-icons">lock_open</i>
        </div>
    );
  }
}

export default LoginButton;
