import React, {Component} from 'react';
import CloseButton from './CloseButton';
import FavoritesEditButton from './FavoritesEditButton';
import FavoritesRemoveButton from './FavoritesRemoveButton';

class FavoritesMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritesEditingMode: false
        };
    }
    render() {
        const items = this.generateItems();
        const className = this.props.isFavoritesMenuOpen ? 'menu menu--favorites menu--favorites--active' : 'menu menu--favorites';
        return (
            <div className={className}>
                <CloseButton onClick={this.props.toggleFavoritesMenu} />
                <FavoritesEditButton onClick={this.switchEditingMode} favoritesEditingMode={this.state.favoritesEditingMode}/>
                <h3 className="menu__title">Favorites</h3>
                <ul className="menu--favorites-list">
                    {this.props.favorites.length ? items : <p>Nothing's here</p>}
                </ul>
            </div>
        );
    }
    switchEditingMode = () => {
        this.setState( prevState => {
          return {
            favoritesEditingMode: !prevState.favoritesEditingMode
          }
        })
    }
    generateItems = () => {
        return (
            this.props.favorites.map((favoritesData, index) => 
                <li key={index}><div className="menu--favorites-list__item" onClick={() => this.props.openModalCard(favoritesData.title)} >
                    <i className="material-icons" >{favoritesData.type}</i>{favoritesData.title}</div>
                    {this.state.favoritesEditingMode ? <FavoritesRemoveButton onClick={() => this.props.removeFromFavorites(index)} /> : null}
                </li>
            )
        );
    }
}

export default FavoritesMenu;
