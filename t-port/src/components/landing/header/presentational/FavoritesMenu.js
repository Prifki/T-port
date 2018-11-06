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
        const className = this.props.isFavoritesMenuOpen ? 'menu menu--favorites menu--favorites--active' : 'menu menu--favorites';
        return (
            <div className={className}>
                <CloseButton onClick={this.props.toggleFavoritesMenu} />
                <FavoritesEditButton onClick={this.switchEditingMode} favoritesEditingMode={this.state.favoritesEditingMode}/>
                <h3 className="menu__title">Favorites</h3>
                <ul className="menu--favorites-list">
                    <li><a href="#">
                        <i className="material-icons">directions_bus</i>
                        Bus AB01</a>
                        {this.state.favoritesEditingMode ? <FavoritesRemoveButton/> : null}
                    </li>
                    <li><a href="#">
                        <i className="material-icons">place</i>
                        Nevsky pr.</a>
                        {this.state.favoritesEditingMode ? <FavoritesRemoveButton/> : null}
                    </li>
                    <li><a href="#">
                        <i className="material-icons">tram</i>
                        Tram TL09</a>
                        {this.state.favoritesEditingMode ? <FavoritesRemoveButton/> : null}
                    </li>
                    <li><a href="#">
                        <i className="material-icons">place</i>
                        Gorkovskaya</a>
                        {this.state.favoritesEditingMode ? <FavoritesRemoveButton/> : null}
                    </li>
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
}

export default FavoritesMenu;
