import React, { Component } from 'react';
import {Marker} from 'google-maps-react';

import JSONdata from './../../data/data.json';
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
            
            <FindARouteMenuWrapped toggleFindARouteMenu={this.toggleFindARouteMenu} stopA={this.state.stopA} stopB={this.state.stopB} />}


            {this.state.isFoundRouteMenuOpened ? <FoundRouteMenu foundRoute={this.state.foundRoute} closeFoundRouteMenu={this.closeFoundRouteMenu} isRouteFound={this.state.isRouteFound}/> : null }
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
    for (let stop in JSONdata.stops) {
      if (this.state.stopA === JSONdata.stops[stop].name) {
        stopA = JSONdata.stops[stop].letter;
        validA = true;
      }
      if (this.state.stopB === JSONdata.stops[stop].name) {
        stopB = JSONdata.stops[stop].letter;
        validB = true;
      }
    }
    if (validA && validB) {
      let foundRoute = this.dijkstra(stopA, stopB), locations = [], polyline = [];
      for (let route in foundRoute){
        for (let each in JSONdata.stops) {
          if (foundRoute[route][0] === JSONdata.stops[each].letter){
            foundRoute[route][0] = JSONdata.stops[each].name;
            locations.push({lat: JSONdata.stops[each].lat, long: JSONdata.stops[each].long, name: JSONdata.stops[each].name});
            polyline.push({lat: parseFloat(JSONdata.stops[each].lat), lng: parseFloat(JSONdata.stops[each].long)});
          }
        }
      }
      const fromTime = this.parseTime(this.state.startTime);
      for (let i = 0; i < foundRoute.length; i+=2) {
        foundRoute[i][1] = this.addMinutes(fromTime,foundRoute[i][1]).toTimeString().substr(0,5);
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
      for (let stop in JSONdata.stops){
        if (~JSONdata.stops[stop].name.toUpperCase().indexOf(e.target.value.toUpperCase()))
          foundEntities.push(JSONdata.stops[stop].name);
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
      for (let stop in JSONdata.stops){
        if (~JSONdata.stops[stop].name.toUpperCase().indexOf(e.target.value.toUpperCase()))
          foundEntities.push(JSONdata.stops[stop].name);
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
    route = this.streetMagic(route, changes);
    return route;
  }

  streetMagic = (route, changes) => {
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
          //console.log(pathes[each].route+'  '+path.substr(i,2));
          routes.push([pathes[each].route, '']);
        }
      }
    }
    for (let each in routes) {
      if (~routes[each][0].indexOf('TM')) {
        routes[each][1] = <i className="material-icons">tram</i>;
      }
      if (~routes[each][0].indexOf('TL')) {
        routes[each][1] = <i className="material-icons">train</i>;
      }
      if (~routes[each][0].indexOf('AB')) {
        routes[each][1] = <i className="material-icons">directions_bus</i>;
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
        while (vertex = frontier.shift()) {
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


}

export default FindRouteContainer;
