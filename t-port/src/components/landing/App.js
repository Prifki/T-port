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
          favorites: [{id: 0, type: 'tram', title: 'Tram TL09'},{id:1, type: 'place', title: 'Nevsky pr.'},{id:2, type: 'place', title: 'Gostinka'}]
        }
    }
    render() {
        return (
            <>
                <Header isLogged={this.state.isLogged} favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites} />

                <Switch>
                    <Route exact path='/' component={FindRouteContainer}/>
                    <Route path='/transports' component={TransportsContainer}/>
                    <Route path='/routes' component={RoutesContainer}/>
                    <Route path='/stops' component={StopsContainer}/>
                </Switch>

                <Footer/>
            </>
        );
    }
    removeFromFavorites = index => {
        const { favorites } = this.state;
        this.setState({
            favorites: favorites.filter((favorite, i) => { 
                return i !== index;
            })
        });
    }
}

export default App;
