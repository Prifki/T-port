import React from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

function Card(props) {
    return (
        <div className="card">
            <BookmarkButton />
            <CloseButton onClick={props.closeCard} />
            <h3 className="card__title">{props.title}</h3>
            <Table header = {props.header} rows = {props.rows} isAdmin={props.isAdmin} addItem={props.addItem} isEditingMode={props.isEditingMode} toggleEditingMode={props.toggleEditingMode}/>
            {(props.isMapNeededOnCard) ? 
            <div className="google-map--small"><GoogleMap markers={props.markers}/></div>
            : null}
        </div>
    );
}

export default Card;
