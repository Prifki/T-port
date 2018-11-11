import React, { Component } from 'react';
import Table from './Table';
import BookmarkButton from './BookmarkButton';
import CloseButton from './CloseButton';
import GoogleMap from './GoogleMap';

class Card extends Component {
  constructor(props){
    super(props);
    this.state = {
        isInFavorites: false
    }
  }
  /*componentDidUpdate(){
    this.setState({isInFavorites: false})
  }
  componentWillReceiveProps(){
      console.log(this.props.favorites);
      for (let each in this.props.favorites){
          if (this.props.title === this.props.favorites[each].title)
            if (!this.props.isInFavorites)
                this.setState({isInFavorites: true})
      }
  }*/
  render() {
    const type = this.state.isInFavorites ? 'bookmark' : 'bookmark_border';
    return (
        <div className="card">
            {this.props.isLogged ? <BookmarkButton onClick={() => this.props.addToFavorites(this.props.title)} type={type} /> : null}
            <CloseButton onClick={this.props.closeCard} />
            <h3 className="card__title">{this.props.title}</h3>
            <Table header = {this.props.header} rows = {this.props.rows} isAdmin={this.props.isAdmin} addItem={this.props.addItem} isEditingMode={this.props.isEditingMode} toggleEditingMode={this.props.toggleEditingMode}/>
            {this.props.isMapNeededOnCard ? 
            <div className="google-map--small"><GoogleMap markers={this.props.markers}/></div>
            : null}
        </div>
    );
  }
}

export default Card;
