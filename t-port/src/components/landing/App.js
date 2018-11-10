import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {Marker} from 'google-maps-react';

import JSONdata from './../../data/data.json';
import Header from './header/Header';
import Footer from './footer/Footer';
import StopsContainer from '../pages/StopsContainer';
import FindRouteContainer from '../pages/FindRouteContainer';
import RoutesContainer from '../pages/RoutesContainer';
import TransportsContainer from '../pages/TransportsContainer';
import CardModal from './../pages/presentational/CardModal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLogged: true,
          isAdmin: true,
          favorites: [{title: "Bus B012US", type: "directions_bus"}],
          isModalCardOpen: false,
          modalCardTitle: null,
          modalCardTableTitles: null,
          modalCardTableRows: null,
          modalCardMarkers: null,
          isMapNeededOnModalCard: false
        }
    }
    render() {
        return (
            <>
                <Header isLogged={this.state.isLogged} favorites={this.state.favorites} removeFromFavorites={this.removeFromFavorites} openModalCard={this.openModalCard} />

                {this.state.isModalCardOpen ? <CardModal closeModalCard={this.closeModalCard} title={this.state.modalCardTitle} header={this.state.modalCardTableTitles} rows={this.state.modalCardTableRows} modalCardMarkers={this.state.modalCardMarkers} isMapNeededOnModalCard={this.state.isMapNeededOnModalCard} /> : null}

                <Switch>
                    <Route exact path='/' component={FindRouteContainer}/>
                    <Route path='/transports' render={(props) => <TransportsContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} />}/>
                    <Route path='/routes' render={(props) => <RoutesContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} />}/>
                    <Route path='/stops' render={(props) => <StopsContainer {...props} isAdmin={this.state.isAdmin} addToFavorites={this.addToFavorites} favorites={this.state.favorites} />}/>
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

    openModalCard = (title) => {
        let modalCardTitle = title,
        modalCardTableRows, modalCardTableTitles, isMapNeededOnModalCard, modalCardMarkers;
        switch (title.substr(0,3)) {
            case 'Bus':
                modalCardTableRows = generateTransportModalCardTableRow();
                modalCardTableTitles = generateTransportModalCardTableTitles();
                isMapNeededOnModalCard = false;
                break;
            case 'Tra':
                modalCardTableRows = generateTransportModalCardTableRow();
                modalCardTableTitles = generateTransportModalCardTableTitles();
                isMapNeededOnModalCard = false;
                break;
            case 'Tro':
                modalCardTableRows = generateTransportModalCardTableRow();
                modalCardTableTitles = generateTransportModalCardTableTitles();
                isMapNeededOnModalCard = false;
                break;
            case 'Rou':
                const temp = generateRouteModalCardTableRow();
                modalCardTableRows = temp[0];
                modalCardMarkers = generateMarkers(temp[1]);
                console.log(modalCardMarkers);
                modalCardTableTitles = generateRouteModalCardTableTitles();
                isMapNeededOnModalCard = true;
                break;
            default:
                modalCardTableRows = generateStopModalCard();
                break;
          }
        this.setState({
            isModalCardOpen: true,
            modalCardTitle: modalCardTitle,
            modalCardTableRows: modalCardTableRows,
            modalCardTableTitles: modalCardTableTitles,
            isMapNeededOnModalCard: isMapNeededOnModalCard,
            modalCardMarkers: modalCardMarkers
        });

        function generateMarkers(locations) {
            return locations.map((loc, index) => 
            <Marker key={index} title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />)
        }

        function generateTransportModalCardTableRow() {
            const number = title.split(' ')[1],
            TRANSPORTS = JSONdata.transport,
            ROUTES = JSONdata.routes,
            STOPS = JSONdata.stops;
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

        function generateTransportModalCardTableTitles() {
            return (<thead><tr><th>Stop</th><th>Time</th></tr></thead>)
        }

        function generateRouteModalCardTableRow() {
            const name = title.split(' ')[1], ROUTES = JSONdata.routes, TRANSPORTS = JSONdata.transport, STOPS = JSONdata.stops;
            let locations = [], cardData = [], stops = [];
              for (let ROUTE in ROUTES){
                if (name === ROUTES[ROUTE].name)
                  stops = ROUTES[ROUTE].stops;
              }
              for (let STOP in STOPS){
                for (let stop in stops){
                  if (stops[stop] === STOPS[STOP].name){
                    stops[stop] = STOPS[STOP].name;
                    locations[stop] = ({lat: STOPS[STOP].lat, long: STOPS[STOP].long, name: STOPS[STOP].name});
                  }
                }
              }
              for (let i = 0; i < stops.length; i++) {
                let times = [];
                for (let TRANSPORT in TRANSPORTS){
                    if (name === TRANSPORTS[TRANSPORT].route){
                      times.push(TRANSPORTS[TRANSPORT].time[i]);
                    }
                }
                cardData.push({stops: stops[i], times: times});
              }
              return [cardData.map( (rowData, index) => 
              <tr key={index}>
                <td>{rowData.stops}</td>
                <td>{rowData.times.join(', ')}</td>   
              </tr>),locations];
        }

        function generateRouteModalCardTableTitles() {
            return (<thead><tr><th>Stop</th><th>Time</th></tr></thead>);
        }

        function generateStopModalCard() {
            console.log(title);
        }
    }

    closeModalCard = () => {this.setState({isModalCardOpen: false});}

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
            case 'Rou':
                type = 'departure_board'
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
