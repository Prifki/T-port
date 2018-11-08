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
            <h3 className="card__title">{this.props.title}</h3>
            <Table header = {this.props.header} rows = {this.props.rows} isAdmin={this.props.isAdmin} addItem={this.props.addItem} isEditingMode={this.props.isEditingMode} toggleEditingMode={this.props.toggleEditingMode}/>
        </div>
    );
  }
}

export default Card;
