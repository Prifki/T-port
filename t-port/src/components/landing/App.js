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
          favorites: [{type: 'tram', title: 'Tram TL09'},{type: 'place', title: 'Nevsky pr.'},{type: 'place', title: 'Gostinka'}]
        }
    }
    render() {
        return (
            <>
                <Header isLogged={this.state.isLogged} favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites} />

                <Switch>
                    <Route exact path='/' component={FindRouteContainer}/>
                    <Route path='/transports' render={(props) => <TransportsContainer {...props} isAdmin={this.state.isAdmin} />}/>
                    <Route path='/routes' render={(props) => <RoutesContainer {...props} isAdmin={this.state.isAdmin} />}/>
                    <Route path='/stops' render={(props) => <StopsContainer {...props} isAdmin={this.state.isAdmin} />}/>
                </Switch>

                <Footer/>
            </>
        );
    }
    removeFromFavorites = index => {
        console.log(index);
        const newFavorites = this.state.favorites.filter((favorite, i) => { 
            return i !== index;
        });
        this.setState({
            favorites: newFavorites
        });
    }
}

export default App;
