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
          favorites: [{id: 1, type: 'tram', title: 'Tram TL09'},{id:2, type: 'place', title: 'Nevsky pr.'}]
        }
    }
    render() {
        return (
            <>
                <Header favorites={this.state.favorites}/>

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
}

export default App;
