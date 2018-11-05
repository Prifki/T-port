import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Header from './header/Header';
import Footer from './footer/Footer';
import StopsContainer from '../pages/StopsContainer';
import FindRouteContainer from '../pages/FindRouteContainer';
import RoutesContainer from '../pages/RoutesContainer';
import TransportsContainer from '../pages/TransportsContainer';

class App extends Component {
    render() {
        return (
            <>
                <Header/>

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
