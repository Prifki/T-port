import React, { Component } from 'react';

class EditTableButton extends Component {
  render() {
    return (
        <td className="table-editor-buttons"><i className="material-icons">{this.props.type}</i></td>
    )
  }
}

export default EditTableButton;
