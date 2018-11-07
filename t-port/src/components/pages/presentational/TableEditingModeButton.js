import React, { Component } from 'react';

class TableEditingModeButton extends Component {
  render() {
    return (
        <div className="table__editor-tools-button" onClick={this.props.onClick}><i className="material-icons">settings</i></div>
    );
  }
}

export default TableEditingModeButton;
