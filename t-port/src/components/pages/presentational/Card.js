import React, { Component } from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';

class Card extends Component {
  render() {
    const { tableHeader } = this.props
    console.log(this.props)
    return (
        <div className="card">
            <BookmarkButton />
            <CloseButton />
            <h3 className="card__title">Card Title</h3>
            <Table header = { tableHeader }/>
        </div>
    );
  }
}

export default Card;
