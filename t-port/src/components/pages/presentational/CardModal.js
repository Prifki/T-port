import React, { Component } from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

class CardModal extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
        <div className="card card--modal">
            <BookmarkButton onClick={() => this.props.addToFavorites(this.props.title)}/>
            <CloseButton onClick={this.props.closeModalCard} />
            <h3 className="card__title">{this.props.title}</h3>
            <Table header = {this.props.header} rows = {this.props.rows} isAdmin={this.props.isAdmin} addItem={this.props.addItem} isEditingMode={this.props.isEditingMode} toggleEditingMode={this.props.toggleEditingMode}/>
            {this.props.isMapNeededOnModalCard ? 
            <div className="google-map--small"><GoogleMap markers={this.props.modalCardMarkers}/></div>
            : null}
        </div>
    );
  }
}

export default CardModal;
