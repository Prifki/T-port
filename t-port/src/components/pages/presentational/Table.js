import React, { Component } from 'react';
import TableEditButton from './TableEditButton';

class Table extends Component {
  render() {
    return (
        <div className="table-wrapper">
            <TableEditButton />
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

export default Table;
