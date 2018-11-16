import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { Marker } from 'google-maps-react';

import JSONdata from './../../data/data.json';
import Header from './header/Header';
import Footer from './footer/Footer';
import FindRouteContainer from '../pages/FindRouteContainer';
import StopsContainer from '../pages/stops/StopsContainer';
import RoutesContainer from '../pages/routes/RoutesContainer';
import TransportsContainer from '../pages/transport/TransportsContainer';
import CardModal from './../pages/presentational/CardModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: JSONdata,
          isLogged: true,
          isAdmin: true,
          favorites: [{title: "Route TL13", type: "departure_board"}],
          isModalCardOpen: false,
          modalCardTitle: null,
          modalCardTableTitles: null,
          modalCardTableRows: null,
          modalCardMarkers: null,
          polyline: null,
          isMapNeededOnModalCard: false,
          userNameFieldValue: '',
          passwordFieldValue: '',
          loginFieldsClassName: 'menu__input'
        }
    }
    render() {
        return (
            <>
                <Header updateUserNameFieldValue={this.updateUserNameFieldValue} updatePasswordFieldValue={this.updatePasswordFieldValue} userNameFieldValue={this.state.userNameFieldValue} passwordFieldValue={this.state.passwordFieldValue} isLogged={this.state.isLogged} favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites} openModalCard={this.openModalCard} authorizate={this.authorizate} loginFieldsClassName={this.state.loginFieldsClassName} resetLoginInputClass={this.resetLoginInputClass} quit={this.quit} data={this.state.data} />

                <Switch>
                    <Route exact path='/' render={(props) => <FindRouteContainer {...props} openModalCard={this.openModalCard} data={this.state.data} />}/>
                    
                    <Route path='/transports' render={(props) => <TransportsContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} isLogged={this.state.isLogged} removeFromFavoritesByCard={this.removeFromFavoritesByCard} openModalCard={this.openModalCard} data={this.state.data} />}/>
                    
                    <Route path='/routes' render={(props) => <RoutesContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} isLogged={this.state.isLogged} removeFromFavoritesByCard={this.removeFromFavoritesByCard}  openModalCard={this.openModalCard} data={this.state.data} />}/>
                    
                    <Route path='/stops' render={(props) => <StopsContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} isLogged={this.state.isLogged} removeFromFavoritesByCard={this.removeFromFavoritesByCard} openModalCard={this.openModalCard} data={this.state.data} />}/>
                </Switch>
                
                {this.state.isModalCardOpen ? <CardModal closeModalCard={this.closeModalCard} title={this.state.modalCardTitle} header={this.state.modalCardTableTitles} rows={this.state.modalCardTableRows} modalCardMarkers={this.state.modalCardMarkers} polyline={this.state.polyline} isMapNeededOnModalCard={this.state.isMapNeededOnModalCard} /> : null}

                <Footer/>
            </>
        );
    }

    updateUserNameFieldValue = (e) => {
        this.setState({userNameFieldValue: e.target.value});
    }

    updatePasswordFieldValue = (e) => {
        this.setState({passwordFieldValue: e.target.value});
    }

    resetLoginInputClass = () => {
        this.setState({loginFieldsClassName: 'menu__input'});
    }

    authorizate = () => {
        const users = this.state.data.users;
        let isLogged = false;
        for (let user in users) {
            if (this.state.userNameFieldValue === users[user].name
                && this.state.passwordFieldValue === users[user].pass) {
                this.setState({
                    isLogged: true,
                    isAdmin: users[user].isAdmin,
                    favorites: users[user].favorites
                });
                isLogged = true;
                break;
            }
        }
        if (!isLogged)
            this.setState({loginFieldsClassName: 'menu__input menu--login--failed-animation'});
    }

    quit = () => {
        this.setState({
          isLogged: false,
          isAdmin: false,
          favorites: [],
          userNameFieldValue: '',
          passwordFieldValue: '',
          loginFieldsClassName: 'menu__input'
        });
      }

    removeFromFavorites = index => {
        const newFavorites = this.state.favorites.filter((favorite, i) => { 
            return i !== index;
        });
        this.setState({
            favorites: newFavorites
        });
    }

    removeFromFavoritesByCard = title => {
        const newFavorites = this.state.favorites.filter((favorite) => { 
            return favorite.title !== title;
        });
        this.setState({
            favorites: newFavorites
        });
    }

    openModalCard = (title) => {
        let modalCardTitle = title,
        modalCardTableRows, modalCardTableTitles, isMapNeededOnModalCard = false, modalCardMarkers=null, polyline=null;
        switch (title.substr(0,3)) {
            case 'Bus':
                modalCardTableRows = this.generateTransportModalCardTableRow(title);
                modalCardTableTitles = this.generateTransportModalCardTableTitles();
                break;
            case 'Tra':
                modalCardTableRows = this.generateTransportModalCardTableRow(title);
                modalCardTableTitles = this.generateTransportModalCardTableTitles();
                break;
            case 'Tro':
                modalCardTableRows = this.generateTransportModalCardTableRow(title);
                modalCardTableTitles = this.generateTransportModalCardTableTitles();
                break;
            case 'Rou':
                const tempRoute = this.generateRouteModalCardTableRow(title);
                modalCardTableRows = tempRoute[0];
                polyline = this.generatePolyline(tempRoute[1]);
                modalCardMarkers = this.generateRouteMarkers(tempRoute[1]);
                modalCardTableTitles = this.generateRouteModalCardTableTitles();
                isMapNeededOnModalCard = true;
                break;
            default:
                const tempStop = this.generateStopModalCardTableRow(title);
                modalCardTableRows = tempStop[0];
                modalCardMarkers = this.generateStopMarker(tempStop[1]);
                modalCardTableTitles = this.generateStopModalCardTableTitles();
                isMapNeededOnModalCard = true;
                break;
          }
        this.setState({
            isModalCardOpen: true,
            modalCardTitle: modalCardTitle,
            modalCardTableRows: modalCardTableRows,
            modalCardTableTitles: modalCardTableTitles,
            isMapNeededOnModalCard: isMapNeededOnModalCard,
            modalCardMarkers: modalCardMarkers,
            polyline: polyline
        });
    }

    generatePolyline = (locations) => {
        let polyline = [];
        for (let each in locations) {
            polyline.push({lat: parseFloat(locations[each].lat), lng: parseFloat(locations[each].long)});
        }
        return polyline;
    }

    generateStopMarker = (loc) => {
        return <Marker title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />
    }

    generateTransportModalCardTableRow = (title) => {
        const number = title.split(' ')[1],
        TRANSPORTS = this.state.data.transport,
        ROUTES = this.state.data.routes,
        STOPS = this.state.data.stops;
        let schedule, routeNum, stops, stopNames = [], cardTableData = [];
        for (let transport in TRANSPORTS){
            if (Object.entries(TRANSPORTS[transport])[2][1]===number){
                schedule = TRANSPORTS[transport].time;
                routeNum = TRANSPORTS[transport].route;
                for (let route in ROUTES){
                    if (Object.entries(ROUTES[route])[0][1]===routeNum){
                        stops = ROUTES[route].stops;
                    }
                }
            }
        }
        for (let stop in stops){
            for (let STOP in STOPS){
            if (stops[stop] === STOPS[STOP].number)
                stopNames.push(STOPS[STOP].name);
            }
        }
        for (let each in stopNames){
            cardTableData.push({stopName: stopNames[each], time: schedule[each]});
        }
        return cardTableData.map( (rowData, index) => 
              <tr key={index}>
                <td>{rowData.stopName}</td>
                <td>{rowData.time}</td>
              </tr>
            )
    }

    generateTransportModalCardTableTitles = () => {
        return (<thead><tr><th>Stop</th><th>Time</th></tr></thead>)
    }

    generateRouteModalCardTableRow = (title) => {
        const name = title.split(' ')[1], ROUTES = this.state.data.routes, TRANSPORTS = this.state.data.transport, STOPS = this.state.data.stops;
        let locations = [], stopNames = [], cardData = [], stops = [];
        for (let ROUTE in ROUTES){
          if (name === ROUTES[ROUTE].name)
            stops.push(ROUTES[ROUTE].stops);
        }
        for (let stop in stops) {
          for (let each in stops[stop]) {
            for (let STOP in STOPS){
              if (stops[stop][each] === STOPS[STOP].number){
                stopNames.push(STOPS[STOP].name);
                locations.push({lat: STOPS[STOP].lat, long: STOPS[STOP].long, name: STOPS[STOP].name});
              }
            }
          }
        }
        
          for (let i = 0; i < stopNames.length; i++) {
            let times = [];
            for (let TRANSPORT in TRANSPORTS){
                if (name === TRANSPORTS[TRANSPORT].route){
                  times.push(TRANSPORTS[TRANSPORT].time[i]);
                }
            }
            cardData.push({stops: stopNames[i], times: times});
          }
          return [cardData.map( (rowData, index) => 
          <tr key={index}>
            <td>{rowData.stops}</td>
            <td>{rowData.times.join(', ')}</td>   
          </tr>),locations];
    }

    generateRouteModalCardTableTitles = () => {
        return (<thead><tr><th>Stop</th><th>Time</th></tr></thead>);
    }

    generateStopModalCardTableRow = (title) => {
        const ROUTES = this.state.data.routes, TRANSPORTS = this.state.data.transport, STOPS = this.state.data.stops;
        let location, routesList=[], stopName = title;
        for (let STOP in STOPS){
          if (stopName === STOPS[STOP].name){
            location = {name: title, lat: parseFloat(STOPS[STOP].lat), long: parseFloat(STOPS[STOP].long)};
            stopName = STOPS[STOP].number;
            routesList = (STOPS[STOP].routes);
          }
        }
        let cardData = [];
          for (let route in routesList){
            for (let ROUTE in ROUTES){
              if (ROUTES[ROUTE].name === routesList[route]){
                let times = [];
                for (let stop in ROUTES[ROUTE].stops){
                  if (stopName === ROUTES[ROUTE].stops[stop]){
                    for (let TRANSPORT in TRANSPORTS){
                      if (TRANSPORTS[TRANSPORT].route === routesList[route]){
                        times.push(TRANSPORTS[TRANSPORT].time[stop]);
                      }
                    }
                  }
                }
                cardData.push({route: routesList[route], times: times});
              }
            }
          }
        return [cardData.map( (rowData, index) => 
                <tr key={index}>
                <td>{rowData.route}</td>
                <td>{rowData.times.join(', ')}</td> 
                </tr>),location];
    }

    generateStopModalCardTableTitles = () => {
        return (<thead><tr><th>Route</th><th>Time</th></tr></thead>);
    }

    generateRouteMarkers = (locations) => {
        return locations.map((loc, index) => 
        <Marker key={index} title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />)
    }

    closeModalCard = () => {this.setState({isModalCardOpen: false});}

    addToFavorites = (title) => {
        const newFavorites = this.state.favorites;
        let type, isUnique = true;

        for (let each in newFavorites) {
            if (title === newFavorites[each].title) {
                isUnique = false;
            }
        }
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
            case 'Rou':
                type = 'departure_board'
                break;
            default:
                type = 'place';
                break;
          }
        if (isUnique && newFavorites.length < 5)
            newFavorites.push({type: type, title: title});
        this.setState({
            favorites: newFavorites
        });
    }
}

export default App;
