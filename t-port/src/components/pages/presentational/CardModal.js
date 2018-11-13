import React from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

function CardModal(props) {
    return (
      <>
        <div className="blur"></div>
        <div className="card card--modal">
            <BookmarkButton onClick={() => props.addToFavorites(props.title)}/>
            <CloseButton onClick={props.closeModalCard} />
            <h3 className="card__title">{props.title}</h3>
            <Table header = {props.header} rows = {props.rows} isAdmin={props.isAdmin} addItem={props.addItem} isEditingMode={props.isEditingMode} toggleEditingMode={props.toggleEditingMode}/>
            {props.isMapNeededOnModalCard ? 
            <div className="google-map--small"><GoogleMap markers={props.modalCardMarkers} polyline={props.polyline} /></div>
            : null}
        </div>
      </>
    );
}

export default CardModal;
