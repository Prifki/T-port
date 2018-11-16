import React, { Component } from 'react';
import {Marker} from 'google-maps-react';

import FindARouteMenu from './presentational/FindARouteMenu';
import FindARouteMenuWrapped from './presentational/FindARouteMenuWrapped';
import FoundRouteMenu from './presentational/FoundRouteMenu';
import GoogleMap from './presentational/GoogleMap';

class FindRouteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFindARouteMenuOpened: true,
      isFoundRouteMenuOpened: false,
      isRouteFound: false,
      stopAAutoCompleteItems: null,
      stopBAutoCompleteItems: null,
      startTime: this.getCurrentTime(),
      stopA: null,
      stopB: null,
      foundRoute: null,
      markers: null,
      polyline: null
    }
  }
  render() {
    return (
        <main>
            <div className="google-map--index"><GoogleMap markers = {this.state.markers} polyline={this.state.polyline} /></div>

            {this.state.isFindARouteMenuOpened ? <FindARouteMenu updateStartTime={this.updateStartTime} startTime={this.state.startTime} stopBAutoComplete={this.stopBAutoComplete} stopAAutoComplete={this.stopAAutoComplete} isFindARouteMenuOpened={this.state.isFindARouteMenuOpened} toggleFindARouteMenu={this.toggleFindARouteMenu} findARoute={this.findARoute} stopAAutoCompleteItems={this.state.stopAAutoCompleteItems} stopBAutoCompleteItems={this.state.stopBAutoCompleteItems} /> : 
            
            <FindARouteMenuWrapped toggleFindARouteMenu={this.toggleFindARouteMenu} />}


            {this.state.isFoundRouteMenuOpened ? <FoundRouteMenu openModalCard={this.props.openModalCard} foundRoute={this.state.foundRoute} closeFoundRouteMenu={this.closeFoundRouteMenu} isRouteFound={this.state.isRouteFound}/> : null }
        </main>
    );
  }

  getCurrentTime = () => {
    return (new Date()).toTimeString().substr(0,5);
  }
  updateStartTime = (e) => {
    this.setState({startTime: e.target.value});
  }
  addMinutes = (date, minutes) => {
    return new Date(date.getTime() + minutes*60000);
  }
  parseTime = (t) => {
    var d = new Date();
    var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
    d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
    d.setMinutes( parseInt( time[2]) || 0 );
    return d;
  }
  findARoute = () => {
    let stopA, stopB, validA = false, validB = false;
    for (let stop in this.props.data.stops) {
      if (this.state.stopA === this.props.data.stops[stop].name) {
        stopA = this.props.data.stops[stop].letter;
        validA = true;
      }
      if (this.state.stopB === this.props.data.stops[stop].name) {
        stopB = this.props.data.stops[stop].letter;
        validB = true;
      }
    }
    if (validA && validB) {
      let fromTime = this.parseTime(this.state.startTime);
      let foundRoute = this.dijkstra(stopA, stopB), locations = [], polyline = [];
      let timeData = this.streetMagic(foundRoute);
      for (let route in foundRoute){
        for (let each in this.props.data.stops) {
          if (foundRoute[route][0] === this.props.data.stops[each].letter){
            foundRoute[route][0] = this.props.data.stops[each].name;
            locations.push({lat: this.props.data.stops[each].lat, long: this.props.data.stops[each].long, name: this.props.data.stops[each].name});
            polyline.push({lat: parseFloat(this.props.data.stops[each].lat), lng: parseFloat(this.props.data.stops[each].long)});
          }
        }
      }
      const ROUTES = this.props.data.routes, TRANSPORTS = this.props.data.transport;
      let stopNum;
      let times = [];
        for (let stop in this.props.data.stops) {
          if (foundRoute[0][0] === this.props.data.stops[stop].name) {
            stopNum = this.props.data.stops[stop].number;
          }
        }
        if (foundRoute[1])
        for (let ROUTE in ROUTES){
          if (ROUTES[ROUTE].name === foundRoute[1][0]){
            for (let stop in ROUTES[ROUTE].stops){
              if (parseInt(stopNum) === parseInt(ROUTES[ROUTE].stops[stop])){
                for (let TRANSPORT in TRANSPORTS){
                  if (TRANSPORTS[TRANSPORT].route === foundRoute[1][0]){
                    times.push(TRANSPORTS[TRANSPORT].time[stop]);
                  }
                }
              }
            }
          }
        }
        for (let each in times) {
          if (this.parseTime(times[each]) > fromTime) {
            fromTime = this.parseTime(times[each]);
            break;
          }
        }
        for (let i=1; i<timeData.length;i++){
          timeData[i] = timeData[i]+timeData[i-1];
        }
        console.log(timeData);
      if (timeData.length >= 1) {
        timeData[timeData.length] = timeData[timeData.length-1]+foundRoute[foundRoute.length-1][1];
        for (let i = 2, j=0; i < foundRoute.length; i+=2, j++) {
          foundRoute[i][1] += timeData[j];
        }
      }
      for (let i = 0; i < foundRoute.length; i+=2) {
        foundRoute[i][1] = this.addMinutes(fromTime,foundRoute[i][1]).toTimeString().substr(0,5);
      }
      for (let i = 1; i < foundRoute.length-1; i+=2) {
        foundRoute[i][0] = 'Route ' + foundRoute[i][0];
      }
      locations = locations.map((loc, index) => 
        <Marker key={index} title={loc.name} name={loc.name} position={{lat: loc.lat, lng: loc.long}} />);
      this.setState({
        isFoundRouteMenuOpened: true,
        isRouteFound: true,
        foundRoute: foundRoute,
        markers: locations,
        polyline: polyline
      })
    }
    else {
      this.setState({
        isFoundRouteMenuOpened: true,
        isRouteFound: false,
        foundRoute: null,
        markers: null,
        polyline: null
      })
    }
  }

  stopAAutoComplete = (e) => {
    if (e.target.value) {
      let foundEntities = [];
      for (let stop in this.props.data.stops){
        if (~this.props.data.stops[stop].name.toUpperCase().indexOf(e.target.value.toUpperCase()))
          foundEntities.push(this.props.data.stops[stop].name);
      }
      foundEntities = foundEntities.map( (item, index) => 
        <option key={index}>{item}</option>
      )      
      if (foundEntities.length) {
        this.setState({
          stopAAutoCompleteItems: foundEntities,
          stopA: e.target.value
        });
      }
    }
  }
  stopBAutoComplete = (e) => {
    if (e.target.value) {
      let foundEntities = [];
      for (let stop in this.props.data.stops){
        if (~this.props.data.stops[stop].name.toUpperCase().indexOf(e.target.value.toUpperCase()))
          foundEntities.push(this.props.data.stops[stop].name);
      }
      foundEntities = foundEntities.map( (item, index) => 
        <option key={index}>{item}</option>
      )      
      if (foundEntities.length) {
        this.setState({
          stopBAutoCompleteItems: foundEntities,
          stopB: e.target.value
        });
      }
    }
  }
  toggleFindARouteMenu = () => {
    this.setState( prevState => {
      return {
        isFindARouteMenuOpened: !prevState.isFindARouteMenuOpened
      }
    })
  }

  closeFoundRouteMenu = () => {
    this.setState( () => {return {isFoundRouteMenuOpened: false}})
  }



// ===========    DIJKSTRA    ===========

  parseEdge = (edge) => {
    var [left, right, ...cost] = edge;
    cost = parseInt(cost.join(''), 10);
    return { left, right, cost };
  }

  addToMap = (map, origin, vertex, cost) => {
    (map[origin] = map[origin] || [])
      .push({ vertex, cost });
  }

  graphToMap = (graph) => {
    var map = {};
    for (var edge of graph) {
      var { left, right, cost } = this.parseEdge(edge);
      this.addToMap(map, left, right, cost);
      //addToMap(map, right, left, cost);
    }
    return map;
  }

  tableToString = (table) => {
    return Object.keys(table)
      .map(vertex => {
        var { vertex: from, cost } = table[vertex];
        return `${vertex}: ${cost} through ${from}`;
      })
      .join('\n');
  }

  tracePath = (table, start, end) => {
    var path = [];
    var next = end;
    var times = [];
    while (true) {
      times.unshift(table[next]['cost']);
      path.unshift(next);
      if (next === start) { break; }
      next = table[next].vertex;
    }
    var route = [];
    for (let stop in path){
        route.push([path[stop],times[stop]]);
        //route[path[stop]] = times[stop];
    }
    //return path;
    var changes = this.searchForChanges(path.join(''));
    route = this.handleArrays(route, changes);



    return route;
  }

  handleArrays = (route, changes) => {
    let newPath = [];
    for (let i = 0; newPath.length < route.length+changes.length-1; i++) {
        newPath.push(route[i]);
        newPath.push(changes[i]);
    }
    newPath.push(route[route.length-1]);
    for (let j = 0; j < newPath.length; j++) 
      for (let i = 1; i < newPath.length-3; i+=2) {
        if (newPath[i][0] === newPath[i+2][0]) {
          newPath.splice(i+1,2);
        }
      }
    return newPath;
  }

  searchForChanges = (path) => {
    let routes = [];
    const pathes = [{route: 'AB01', path: 'ARQPNSJKLO'},{route: 'AB02', path: 'BTRSFIMOPQ'},{route: 'TM03', path: 'CTEHILNRBA'},{route: 'TL09', path: 'IJNTCBQL'},{route: 'TL13', path: 'MLKIGHFEDC'},{route: 'TM16', path: 'PREIKN'},{route: 'TM17', path: 'QATFDHJOR'}];
    for (let i = 0; i < path.length-1; i++) {
      for (let each in pathes) {
        if (~pathes[each].path.indexOf(path.substr(i,2))) {
          routes.push([pathes[each].route, '']);
        }
      }
    }
    for (let each in routes) {
      if (~routes[each][0].indexOf('TM')) {
        routes[each][1] = <i className="pictorams">tram</i>;
      }
      if (~routes[each][0].indexOf('TL')) {
        routes[each][1] = <i className="pictorams">train</i>;
      }
      if (~routes[each][0].indexOf('AB')) {
        routes[each][1] = <i className="pictorams">directions_bus</i>;
      }
    }
    return routes;
  }

  dijkstra = (start, end) => {
    try{
        var graph = [
            'AT30','AR25','BT15','BA15','BQ25','CB15','CT20','DC20','DH60','ED15','EH35','EI50',
            'FE15','FI20','FD25','GH10','HF25','HJ45','HI20','IG15','IJ5','IK15',
            'IL25','IM25','JO45','JK5','JN10','KI15','KN10','KL5','LK5','LN15','LO10','ML10','MO10',
            'NS10','NT20','NR10','OR30','OP10','PN15','PR15','PQ15','QP20','QL35',
            'QA25','RB15','RE40','RS15','RQ15','SF15','SJ15','TC20','TE25', 'TF30','TR30'
        ];
        var map = this.graphToMap(graph);
      
        var visited = [];
        var frontier = [start];
        var table = { [start]: { vertex: start, cost: 0 } };
      
        var vertex;
        while (frontier.length) {
          vertex = frontier.shift()
          // Explore unvisited neighbors
          var neighbors = map[vertex].filter(n => !visited.includes(n.vertex));
      
          // Add neighbors to the frontier
          frontier.push(...neighbors.map(n => n.vertex));
      
          var costToVertex = table[vertex].cost;
      
          for (let { vertex: to, cost } of neighbors) {
            var currCostToNeighbor = table[to] && table[to].cost;
            var newCostToNeighbor = costToVertex + cost;
            if (currCostToNeighbor === undefined ||
                newCostToNeighbor < currCostToNeighbor) {
              // Update the table
              table[to] = { vertex, cost: newCostToNeighbor };
            }
          }
      
          visited.push(vertex);
        }
        //console.log('The shortest ways:\n'+this.tableToString(table));
        var route = this.tracePath(table, start, end);
        //console.log('\nShortest path is:\n'+route);
        return(route);
    }
    catch (err){
      const route = [['not found','0'],['not found','0'],['not found','0']];
      console.log('Dijkstra doesn`t like smth: '+err);
      return(route);
    }
  }

  streetMagic = (route) => {
    let timeData = [];
    const fuckMyLife = [["A", "TM03" , "AB01", 175], ["A", "TM17" , "AB01", 140], ["A", "TM03" , "TM17", 35], ["A", "TM17" , "TM03", 145], ["B", "TM03" , "AB02", 10], ["B", "TM03" , "TL09", 110], ["B", "TL09" , "AB02", 80], ["B", "TL09" , "TM03", 70], ["C", "TL09" , "TM03", 110], ["C", "TL09" , "TL13", 75], ["C", "TL13" , "TL09", 105], ["C", "TL13" , "TM03", 35], ["D", "TL13" , "TM17", 165], ["D", "TM17" , "TL13", 15], ["E", "TL13" , "TM03", 105], ["E", "TL13" , "TM16", 125], ["E", "TM03" , "TL13", 75], ["E", "TM03" , "TM16", 20], ["E", "TM16" , "TL13", 55], ["E", "TM16" , "TM03", 160], ["F", "AB02" , "TL13", 35], ["F", "AB02" , "TM17", 25], ["F", "TL13" , "AB02", 145], ["F", "TL13" , "TM17", 170], ["F", "TM17" , "AB02", 155], ["F", "TM17" , "TL13", 10], ["H", "TL13" , "TM03", 0], ["H", "TL13" , "TM17", 100], ["H", "TM03" , "TL13", 0], ["H", "TM03" , "TM17", 0], ["H", "TM17" , "TL13", 80], ["H", "TM17" , "TM03", 80], ["I", "AB02" , "TL09", 115], ["I", "AB02" , "TM03", 10], ["I", "AB02", "TM16", 25], ["I", "AB02", "TL13", 145], ["I", "TL13", "AB02", 35], ["I", "TL13", "TL09", 150], ["I", "TL13", "TM03", 45], ["I", "TL13", "TM16", 60], ["I", "TM03", "AB02", 170], ["I", "TM03", "TL09", 105], ["I", "TM03", "TL13", 135], ["I", "TM03", "TM16", 15], ["I", "TM16", "AB02", 155], ["I", "TM16", "TL09", 90], ["I", "TM16", "TL13", 120], ["I", "TM16", "TM03", 165], ["J", "AB01", "TL09", 115], ["J", "AB01", "TM17", 130], ["J", "TL09", "AB01", 65], ["J", "TL09", "TM17", 15], ["J", "TM17", "AB01", 50], ["J", "TM17", "TL09", 165], ["K", "AB01", "TL13", 120], ["K", "AB01", "TM16", 30], ["K", "TL13", "TM16", 90], ["K", "TL13", "AB01", 60], ["K", "TM16", "AB01", 150], ["K", "TM16", "TL13", 90], ["L", "AB01", "TLO9", 50], ["L", "AB01", "TL13", 110], ["L", "AB01", "TM03", 20], ["L", "TL09", "AB01", 130], ["L", "TL09", "TL13", 60], ["L", "TL09", "TM03", 0], ["L", "TL13", "AB01", 70], ["L", "TL13", "TLO9", 120], ["L", "TL13", "TM03", 90], ["L", "TM03", "AB01", 160], ["L", "TM03", "TL09", 30], ["L", "TM03", "TL13", 90], ["M", "AB02", "TL13", 90], ["N", "AB01", "TL09", 150], ["N", "AB01", "TM03", 70], ["N", "AB01", "TM16", 70], ["N", "TL09", "TM03", 100], ["N", "TL09", "TM16", 100], ["N", "TM03", "AB01", 110], ["N", "TM03", "TL09", 80], ["N", "TM03", "TM16", 0], ["N", "TM16", "AB01", 110], ["N", "TM16", "TL09", 80], ["N", "TM16", "TM03", 0], ["O", "AB01", "AB02", 10], ["O", "AB01", "TM17", 155], ["O", "AB02", "AB01", 170], ["O", "AB02", "TM17", 145], ["O", "TM17", "AB01", 25], ["O", "TM17", "AB02", 35], ["P", "AB01", "AB02", 80], ["P", "AB01", "TM16", 135], ["P", "AB02", "AB01", 100], ["P", "AB02", "TM16", 55], ["R", "AB01", "AB02", 20], ["R", "AB01", "TM03", 130], ["R", "AB01", "TM16", 5], ["R", "AB01", "TM17", 100], ["R", "AB02", "AB01", 160], ["R", "AB02", "TM03", 110], ["R", "AB02", "TM16", 165], ["R", "AB02", "TM17", 80], ["R", "TM03", "AB01", 50], ["R", "TM03", "AB02", 70], ["R", "TM03", "TM16", 55], ["R", "TM03", "TM17", 150], ["R", "TM16", "AB01", 175], ["R", "TM16", "AB02", 15], ["R", "TM16", "TM03", 125], ["R", "TM16", "TM17", 95], ["R", "TM17", "AB01", 80], ["R", "TM17", "AB02", 100], ["R", "TM17", "TM03", 30], ["R", "TM17", "TM16", 85], ["Q", "AB01", "TL09", 85], ["Q", "AB01", "TM17", 155], ["Q", "TL09", "AB01", 95], ["Q", "TL09", "TM17", 70], ["S", "AB01", "AB02", 155], ["S", "AB02", "AB01", 25], ["T", "AB02", "TL09", 50], ["T", "AB02", "TM03", 20], ["T", "AB02", "TM17", 55], ["T", "TL09", "AB02", 130], ["T", "TL09", "TM03", 150], ["T", "TL09", "TM17", 5], ["T", "TM03", "AB02", 160], ["T", "TM03", "TL09", 30], ["T", "TM03", "TM17", 35],["T", "TM17", "AB02", 125], ["T", "TM17", "TL09", 175], ["T", "TM17", "TM03", 145]];

    if (route.length > 4) {
      for (let i = 1; i < route.length-3; i += 2) {
        for (let each in fuckMyLife) {
          if ((route[i][0] === fuckMyLife[each][1]) && (route[i+2][0] === fuckMyLife[each][2]) && (route[i+1][0] === fuckMyLife[each][0])) {
            timeData.push(fuckMyLife[each][3]);
          }
        }
      }
    }
    return timeData;
  }
}

export default FindRouteContainer;
