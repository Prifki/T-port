import React, { Component } from 'react';

class TransportTable extends Component {
  render() {
    return (
        <div className="table-wrapper">
            <div className="table__editor-tools-button"><i className="material-icons">settings</i></div>
            <table id="transport-table">
                <tbody>		
                    <tr>
                        <th>Type</th>
                        <th>Number</th>
                        <th>Route</th>
                        <th>Seats <i className="material-icons">arrow_drop_up</i></th>
                    </tr>			
                    <tr>
                        <td>erfefddffdfd</td>
                        <td>erfefddffdfd</td>
                        <td>erfefddffdfd</td>
                        <td>erfefddffdfd</td>
                    </tr>	
                        <tr>
                            <td>erfefddffdfd</td>
                            <td>erfefddffdfd</td>
                            <td>erfefddffdfd</td>
                            <td>erfefddffdfd</td>
                        </tr>
                </tbody>		
            </table>
        </div>
    );
  }
}

export default TransportTable;
