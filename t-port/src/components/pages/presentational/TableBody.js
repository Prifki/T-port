import React, { Component } from 'react';

class TableBody extends Component { 
    render(){
        const transport = this.props
        console.log(transport);
        const rows = Array.from(transport).map((row, index) => {
            return (
                <tr key={index}>
                    <td>{row.type}</td>
                    <td>{row.number}</td>
                    <td>{row.route}</td>
                    <td>{row.seats}</td>
                </tr>
            );
        });
        return <tbody>{rows}</tbody>;
    }
}
export default TableBody;