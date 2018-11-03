import React, { Component } from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';

class Card extends Component {
  render() {
    return (
        <div className="card">
            <BookmarkButton />
            <CloseButton />
            <h3 className="card__title">Card Title</h3>
            <Table />
        </div>
    );
  }
}

export default Card;
