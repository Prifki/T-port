import React, { Component } from 'react';

import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

class Card extends Component {
  constructor(props){
    super(props);
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToCardRef();
  }
  componentWillReceiveProps() {
    this.scrollToCardRef();
  }

  render() {
    const type = this.props.isCardInFavorites ? 'bookmark' : 'bookmark_border';
    return (
        <div className="card" ref={this.cardRef} >
            
            {(this.props.isLogged && !this.props.isCardInFavorites) ? <BookmarkButton onClick={() => { this.props.addToFavorites(this.props.title); this.props.bookmark()}} type={type} /> : null}

            {(this.props.isLogged && this.props.isCardInFavorites)  ? <BookmarkButton onClick={() => { this.props.removeFromFavoritesByCard(this.props.title); this.props.unBookmark()}} type={type} /> : null}

            <CloseButton onClick={this.props.closeCard} />
            <h3 className="card__title">{this.props.title}</h3>
            <Table header = {this.props.header} rows = {this.props.rows} isAdmin={false} />
            {this.props.isMapNeededOnCard ? 
            <div className="google-map--small"><GoogleMap markers={this.props.markers}/></div>
            : null}
        </div>
    );
  }
  scrollToCardRef = () => {
    window.scrollTo({
        top: this.cardRef.current.offsetTop, 
        behavior: "smooth"
    })
  }
}

export default Card;