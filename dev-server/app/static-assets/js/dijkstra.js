
  var parseEdge = (edge) => {
    var [left, right, ...cost] = edge;
    cost = parseInt(cost.join(''), 10);
    return { left, right, cost };
  };
  
  var addToMap = (map, origin, vertex, cost) => {
    (map[origin] = map[origin] || [])
      .push({ vertex, cost });
  };
  
  var graphToMap = (graph) => {
    var map = {};
  
    for (var edge of graph) {
      var { left, right, cost } = parseEdge(edge);
  
      addToMap(map, left, right, cost);
      //addToMap(map, right, left, cost);
    }
  
    return map;
  };
  
  var tableToString = (table) => {
    return Object.keys(table)
      .map(vertex => {
        var { vertex: from, cost } = table[vertex];
        return `${vertex}: ${cost} through ${from}`;
      })
      .join('\n');
  };
  
  var tracePath = (table, start, end) => {
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
    for (stop in path){
        route.push([path[stop],times[stop]]);
        //route[path[stop]] = times[stop];
    }
    //console.log(route);
    //return path;
    return route;
  };

  var dijkstra = (start, end) => {
    try{
        var graph = [
            'AT30','AR25','BT15','BA15','BQ25','CB15','CT20','DC20','DH60','ED15','EH35','EI50',
            'FE15','FI20','FD25','GH10','HF25','HJ45','HI20','IG15','IJ5','IK15',
            'IL25','IM25','JO45','JK5','JN10','KI15','KN10','KL5','LK5','LN15','LO10','ML10','MO10',
            'NS10','NT20','NR10','OR30','OP10','PN15','PR15','PQ15','QP20','QL35',
            'QA25','RB15','RE40','RS15','RQ15','SF15','SJ15','TC20','TE25',
            'TF30','TR30'
        ];
        var map = graphToMap(graph);
      
        // console.log(map);
      
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
            if (currCostToNeighbor == undefined ||
                newCostToNeighbor < currCostToNeighbor) {
              // Update the table
              table[to] = { vertex, cost: newCostToNeighbor };
            }
          }
      
          visited.push(vertex);
        }
      
        //console.log(table);
      
        //console.log('The shortest ways:\n'+tableToString(table));
      
        var route = tracePath(table, start, end);
      // console.log('\nShortest path is:\n'+route);
        return(route);
    }
    catch (err){
      const route = [['not found','0'],['not found','0'],['not found','0']];
      console.log('Dijkstra doesn`l like smth: '+err);
      return(route);
    }
      
  };

