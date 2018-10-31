function createRoute(directionsService, directionsDisplay, locations){
	try{
		const start = locations.shift();
        const end = locations.pop();
        let route = [];
        for (each in locations){
            route[each] = {'location': locations[each], 'stopover': true}
        }
		console.log(route);
		console.log(start);
		console.log(end);
        calculateAndDisplayRoute(directionsService, directionsDisplay, route, start, end);
	}
	catch(err) {
		console.log('An error in createRoute(): ' + err);
	}
}


function calculateAndDisplayRoute(directionsService, directionsDisplay, route, start, end) {
	try{
		var waypts = route;
		directionsService.route({
			origin: start,
			destination: end,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: 'DRIVING'
		}, function(response, status) {
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}
  catch (error){
	  console.log("There's an error in google map: " + error);
  }
}



function initMap(locations) {
	var spb = {lat: 59.932802, lng: 30.332459};
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(
		document.getElementById('map'), {zoom: 11, center: spb, styles: [
	{
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#ecebea"
		},
		{
			"saturation": -30
		}
		]
	},
	{
		"elementType": "geometry.fill",
		"stylers": [
		{
			"color": "#e1e1e1"
		}
		]
	},
	{
		"elementType": "labels.icon",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"elementType": "labels.text",
		"stylers": [
		{
			"visibility": "on"
		}
		]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#523735"
		}
		]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [
		{
			"color": "#f5f1e6"
		}
		]
	},
	{
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [
		{
			"color": "#c9b2a6"
		}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "geometry.stroke",
		"stylers": [
		{
			"color": "#dcd2be"
		}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#ae9e90"
		}
		]
	},
	{
		"featureType": "administrative.neighborhood",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "landscape.natural",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#ece3ce"
		}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#dfd2ae"
		}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#93817c"
		}
		]
	},
	{
		"featureType": "poi.business",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [
		{
			"color": "#a5b076"
		}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#447530"
		}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#f5f1e6"
		}
		]
	},
	{
		"featureType": "road",
		"elementType": "labels",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#fdfcf8"
		}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#f8c967"
		}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
		{
			"color": "#e9bc62"
		}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#e98d58"
		}
		]
	},
	{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry.stroke",
		"stylers": [
		{
			"color": "#db8555"
		}
		]
	},
	{
		"featureType": "road.local",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#806b63"
		}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#dfd2ae"
		}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#8f7d77"
		}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "labels.text.stroke",
		"stylers": [
		{
			"color": "#ebe3cd"
		}
		]
	},
	{
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
		{
			"color": "#dfd2ae"
		}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
		{
			"color": "#b9d3c2"
		}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
		{
			"color": "#92998d"
		}
		]
	}
    ],disableDefaultUI: true
});

    directionsDisplay.setMap(map);
    if(locations)
        createRoute(directionsService, directionsDisplay, locations);
}


