import React, { Component } from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

class Card extends Component {
  render() {
    return (
        <div className="card">
            <BookmarkButton />
            <CloseButton onClick={this.props.closeCard} />
            <h3 className="card__title">{this.props.title}</h3>
            <Table header = {this.props.header} rows = {this.props.rows} isAdmin={this.props.isAdmin} addItem={this.props.addItem} isEditingMode={this.props.isEditingMode} toggleEditingMode={this.props.toggleEditingMode}/>
            {(this.props.isMapNeededOnCard) ? 
            <div className="google-map--small"><GoogleMap/></div>
            : null}
        </div>
    );
  }
}

export default Card;
