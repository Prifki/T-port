import React, { Component } from 'react';

class SubmitButton extends Component {
  render() {
    return (
      <span className="menu__button--submit" onClick={this.props.onClick}>{this.props.text}</span>
    );
  }
}

export default SubmitButton;