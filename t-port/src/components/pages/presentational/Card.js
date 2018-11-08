import React, { Component } from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';

class Card extends Component {
  render() {
    const tNumber = this.find(this.props.match.params.number);
    console.log(this.props)
    console.log(tNumber)
    return (
        <div className="card">
            <BookmarkButton />
            <CloseButton />
            <h3 className="card__title">Card Title</h3>
            <Table />
        </div>
    );
  }

  find = (number) => {
    return this.props.data.find(t => t.number == number);
  }
}

export default Card;
