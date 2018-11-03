import React, { Component } from 'react';
import TransportTable from './TransportTable';

class Card extends Component {
  render() {
    return (
        <div className="card">
            <div className="card__button--bookmark">
                <i className="material-icons">bookmark_border</i>
            </div>
            <div className="card__button--closing">
                <i className="material-icons">close</i>
            </div>
            <h3 className="card__title">Transport name</h3>
            <TransportTable />
        </div>
    );
  }
}

export default Card;
