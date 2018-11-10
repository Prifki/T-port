import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Header from './header/Header';
import Footer from './footer/Footer';
import StopsContainer from '../pages/StopsContainer';
import FindRouteContainer from '../pages/FindRouteContainer';
import RoutesContainer from '../pages/RoutesContainer';
import TransportsContainer from '../pages/TransportsContainer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLogged: true,
          isAdmin: true,
          favorites: []
        }
    }
    render() {
        return (
            <>
                <Header isLogged={this.state.isLogged} favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites} />

                <Switch>
                    <Route exact path='/' component={FindRouteContainer}/>
                    <Route path='/transports' render={(props) => <TransportsContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} />}/>
                    <Route path='/routes' render={(props) => <RoutesContainer {...props} isAdmin={this.state.isAdmin} />}/>
                    <Route path='/stops' render={(props) => <StopsContainer {...props} isAdmin={this.state.isAdmin} />}/>
                </Switch>

                <Footer/>
            </>
        );
    }
    removeFromFavorites = index => {
        const newFavorites = this.state.favorites.filter((favorite, i) => { 
            return i !== index;
        });
        this.setState({
            favorites: newFavorites
        });
    }
    addToFavorites = (title) => {
        let type;
        switch (title.substr(0,3)) {
            case 'Bus':
                type = 'directions_bus';
                break;
            case 'Tra':
                type = 'tram';
                break;
            case 'Tro':
                type = 'train';
                break;
            default:
                type = 'place';
                break;
          }
        const newFavorites = this.state.favorites;
        newFavorites.push({type: type, title: title})
        this.setState({
            favorites: newFavorites
        });
    }
}

export default App;
