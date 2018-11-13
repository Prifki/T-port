import React from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

function Card (props) {
    const type = props.isCardInFavorites ? 'bookmark' : 'bookmark_border';
    return (
        <div className="card">
            
            {(props.isLogged && !props.isCardInFavorites) ? <BookmarkButton onClick={() => { props.addToFavorites(props.title); props.bookmark()}} type={type} /> : null}

            {(props.isLogged && props.isCardInFavorites)  ? <BookmarkButton onClick={() => { props.removeFromFavoritesByCard(props.title); props.unBookmark()}} type={type} /> : null}

            <CloseButton onClick={props.closeCard} />
            <h3 className="card__title">{props.title}</h3>
            <Table header = {props.header} rows = {props.rows} isAdmin={false} />
            {props.isMapNeededOnCard ? 
            <div className="google-map--small"><GoogleMap markers={props.markers}/></div>
            : null}
        </div>
    );
}

export default Card;