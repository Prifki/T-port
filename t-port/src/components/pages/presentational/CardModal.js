import React, { Component } from 'react';

import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

class CardModal extends Component {
  constructor(props){
    super(props);
    this.modalCardRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToModalCardRef();
  }
  componentDidUpdate() {
    this.scrollToModalCardRef();
  }

  render() {
    return (
      <>
        <div className="blur"></div>
        <div className="card card--modal" ref={this.modalCardRef} >
            <CloseButton onClick={this.props.closeModalCard} />
            <h3 className="card__title">{this.props.title}</h3>
            <Table header = {this.props.header} rows = {this.props.rows} isAdmin={this.props.isAdmin} addItem={this.props.addItem} isEditingMode={this.props.isEditingMode} toggleEditingMode={this.props.toggleEditingMode}/>
            {this.props.isMapNeededOnModalCard ? 
            <div className="google-map--small"><GoogleMap markers={this.props.modalCardMarkers} polyline={this.props.polyline} /></div>
            : null}
        </div>
      </>
    );
  }

  scrollToModalCardRef = () => {
    window.scrollTo({
        top: this.modalCardRef.current.offsetTop-20, 
        behavior: "smooth"
    })
  }

}

export default CardModal;
