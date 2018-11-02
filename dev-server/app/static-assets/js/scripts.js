function closeLoginMenu(){
	const loginMenu = document.getElementsByClassName('login-menu')[0];
	loginMenu.classList.remove('show-additional-menu');
}

function openLoginMenu(){
	const loginMenu = document.getElementsByClassName('login-menu')[0];
	loginMenu.classList.add('show-additional-menu');
}

function closeFavorites(){
	const favorites = document.getElementsByClassName('favorites-menu')[0];
	favorites.classList.remove('show-additional-menu');
	favorites.classList.remove('fixed-favorites');
}

function openFavorites(){
	const favorites = document.getElementsByClassName('favorites-menu')[0];
	favorites.classList.add('show-additional-menu');
}

function closeMobileSearch(){
	const mobileSearch = document.getElementsByClassName('mobile-find-field')[0];
	mobileSearch.classList.remove('show-mobile-search');
}

function openMobileSearch(){
	const mobileSearch = document.getElementsByClassName('mobile-find-field')[0];
	mobileSearch.classList.add('show-mobile-search');
}

function closeBurgerMenu(){
	const burgerMenu = document.getElementsByClassName('floating-menu')[0];
	burgerMenu.classList.remove('show-menu');
}

function openBurgerMenu(){
	const burgerMenu = document.getElementsByClassName('floating-menu')[0];
	burgerMenu.classList.add('show-menu');
}

function deactivateBurgerImg(){
	const burgerImg = document.getElementsByClassName('ham')[0];
	burgerImg.classList.remove('active');
}

function activateBurgerImg(){
	const burgerImg = document.getElementsByClassName('ham')[0];
	burgerImg.classList.add('active');
}

function closeFoundRoutes(){
	const foundRoutes = document.getElementsByClassName('found-route-menu')[0];
	foundRoutes.style.display = 'none';
}

function openFoundRoutes(){
	const foundRoutes = document.getElementsByClassName('found-route-menu')[0];
	generateRoute();
	foundRoutes.style.display = 'block';
	closeLoginMenu();
	closeFavorites();
	if(window.innerWidth < 470)
	  closeFindMenu();
}

function toggleBurgerMenu(){
	const floatingMenu = document.getElementsByClassName("floating-menu")[0];
	floatingMenu.classList.toggle("show-menu");

	closeLoginMenu();
	closeFavorites();
	closeMobileSearch();
}

function toggleMobileSearch(){
	const mobileSearch = document.getElementsByClassName("mobile-find-field")[0];
	mobileSearch.classList.toggle("show-mobile-search");

	closeLoginMenu();
	closeFavorites();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function toggleFavorites(){
	const favorites = document.getElementsByClassName("favorites-menu")[0];
	favorites.classList.toggle("show-additional-menu");

	closeLoginMenu();
	closeMobileSearch();
	closeBurgerMenu();
	deactivateBurgerImg();
	closeFoundRoutes();
	if(window.innerWidth < 470)
	  closeFindMenu();
}

function toggleLoginMenu(){
	const login = document.getElementsByClassName("login-menu")[0];
	login.classList.toggle("show-additional-menu");

	closeFavorites();
	closeMobileSearch();
	closeBurgerMenu();
	deactivateBurgerImg();
	closeFoundRoutes();
	if(window.innerWidth < 470)
	  closeFindMenu();
}

function closeFindMenu(){
	const findMenu = document.getElementsByClassName("find-a-route-menu")[0];
	findMenu.classList.add("find-a-route-wrapped");
}

function openFindMenu(){
	const findMenu = document.getElementsByClassName("find-a-route-menu")[0];
	findMenu.classList.remove("find-a-route-wrapped");
	closeFoundRoutes();
}

function editFavorites(){
	deleteButtons = document.getElementsByClassName("delete-button");
	if(document.getElementsByClassName('edit-button')[0].firstChild.textContent=='more_vert'){
		for (i=0; i < deleteButtons.length; i++)
			deleteButtons[i].style.visibility = 'visible';
		document.getElementsByClassName('edit-button')[0].firstChild.textContent='more_horiz';
	}
	else {
		for (i=0; i < deleteButtons.length; i++)
			deleteButtons[i].style.visibility = 'hidden';
		document.getElementsByClassName('edit-button')[0].firstChild.textContent='more_vert';
	}
}

function removeFromFavorites(button){
	button.parentElement.remove('');
}

function editTable(tableButton){
	try{
		const tbody = tableButton.parentElement.lastElementChild.lastElementChild;

		if (tbody.firstChild.lastChild.innerText != "Remove"){
			const Rows = Array.from(tbody.rows);
			Rows.splice(0,1);

			addEditColumn(tbody);

			for (row in Rows){
				const i = document.createElement('i'),
				td = document.createElement('td');
				td.appendChild(i);
				i.setAttribute('class','material-icons');
				td.setAttribute('class','table-editor-buttons');
				td.setAttribute('onclick','editTableItem(this)');
				i.innerText='edit';
				Rows[row].appendChild(td);
			}
			
			addRemoveColumn(tbody);

			for (row in Rows){
				const i = document.createElement('i'),
				td = document.createElement('td');
				td.appendChild(i);
				i.setAttribute('class','fa fa-minus');
				td.setAttribute('class','table-editor-buttons');
				td.setAttribute('onclick','removeTableItem(this)');
				Rows[row].appendChild(td);
			}

			for (let i=0; i<tbody.firstChild.children.length-2; i++){
				const td = document.createElement('td'),
				editInput = document.createElement('input');
				editInput.setAttribute('class', 'table-edit-input');
				editInput.setAttribute('type', 'text');
				td.appendChild(editInput);
				tbody.lastChild.appendChild(td);
			}
			
			addPlusButton(tbody);
			const td = document.createElement('td');
			tbody.lastChild.appendChild(td);
		}
	}
	catch (error) {
		console.log("An error has been caught: " + error);
	}

	function addPlusButton(tbody){
		const td = document.createElement('td'),
		i = document.createElement('i');
		i.setAttribute('class','material-icons table-editor-buttons');
		td.setAttribute('onclick','addTableItem(this)');
		i.innerText='add_circle_outline';
		td.appendChild(i);
		tbody.lastChild.appendChild(td);
	}

	function addEditColumn(tbody){
		tr = document.createElement('tr'),
		th = document.createElement('th');
		th.innerText="Edit";
		tbody.firstChild.appendChild(th);
		tbody.appendChild(tr);
	}

	function addRemoveColumn(tbody){
		tr = document.createElement('tr'),
		th = document.createElement('th');
		th.innerText="Remove";
		tbody.firstChild.appendChild(th);
		tbody.appendChild(tr);
	}
}

function removeTableItem(item){
	item.parentElement.remove('');
}

function editTableItem(item){;
	const tr = item.parentElement;
	if (tr.lastChild.previousElementSibling.innerText.slice(0,-1) == 'edit') {
		for (let i=0; i<tr.children.length-2; i++){
			tr.children[i].innerHTML = '<input class="table-edit-input" type="text" value="'+tr.children[i].innerText+'">';
		}
		item.innerHTML = '<i class="material-icons">check_circle_outline</i>';
	}
	else {		
		for (let i=0; i<tr.children.length-2; i++){
			tr.children[i].innerHTML = '<td>'+tr.children[i].firstChild.value+'</td>';
		}
		item.innerHTML = '<i class="material-icons">edit</i>';
	}
}

function addTableItem(item){
	const tr = item.parentElement;
	let newItem = document.createElement('tr');
		for (let i=0; i<tr.children.length-2; i++){
			const td = document.createElement('td');
			console.log(tr.children[i].firstChild.value);
			td.innerText = tr.children[i].firstChild.value;
			newItem.appendChild(td);
		}
		{const i = document.createElement('i'),
				td = document.createElement('td');
		td.appendChild(i);
		i.setAttribute('class','material-icons');
		td.setAttribute('class','table-editor-buttons');
		td.setAttribute('onclick','editTableItem(this)');
		i.innerText='edit';
		newItem.appendChild(td);
		}
		{
			const i = document.createElement('i'),
				td = document.createElement('td');
				td.appendChild(i);
				i.setAttribute('class','fa fa-minus');
				td.setAttribute('class','table-editor-buttons');
				td.setAttribute('onclick','removeTableItem(this)');
				newItem.appendChild(td);
		}
		tr.parentElement.insertBefore(newItem,tr.parentElement.lastElementChild);
}

function stopsAutoComplete(){
	requestJSON(generateOptions);
	function generateOptions(data){
		if(!document.querySelector('#stopsA').childElementCount){
			const stops = data.stops;
			for (stop in stops){
				const datalist = document.querySelector('#stopsA');
				const option = document.createElement('option');
				option.setAttribute('value',stops[stop].name);
				datalist.appendChild(option);
			}
			for (stop in stops){
				const datalist = document.querySelector('#stopsB');
				const option = document.createElement('option');
				option.setAttribute('value',stops[stop].name);
				datalist.appendChild(option);
			}
		}
	}
}


function generateRoute(route){
	document.querySelector('.nothing-found-text').style = 'display: none';
	document.querySelector('#route-list').innerHTML = '';
	requestJSON(handleStopsInfo);
	function handleStopsInfo(data){
		const stops = data.stops;
		for (stop in stops){
			for (each in route){
				if (route[each][0]==stops[stop].letter){
					route[each][0] = stops[stop].name;
				}
			}
		}
		for (each in route){
			const li = document.createElement('li');
			li.innerHTML = route[each][1]+'min <a href="#"><i class="material-icons">place</i>'+route[each][0]+'</a>';
			document.querySelector('#route-list').appendChild(li);
		}
	}
}

function closeSearchResults(){
	document.querySelector('.global-search-results').style.display = 'none';
}

function globalAutoComplete(substr){
	closeSearchResults();
	(substr) ? requestJSON(generateOptions) : closeSearchResults();
	//requestJSON(generateOptions);
	function generateOptions(data){
			const stops = data.stops, routes = data.routes, transports = data.transport;
			const list = document.querySelector('.global-search-items');
			list.innerHTML = '';
			for (stop in stops){
				if(ifSubstr(stops[stop].name, substr)){
					createItem(stops[stop].name);
				}
			}
			for (route in routes){
				if(ifSubstr(routes[route].name, substr)){
					createItem(routes[route].name);
				}
			}
			for (transport in transports){
				if(ifSubstr(transports[transport].number, substr)){
					createItem(transports[transport].number);
				}
			}
			if(list.childElementCount)
				document.querySelector('.global-search-results').style.display = 'flex';

		function createItem(value){
			const li = document.createElement('li');
			li.setAttribute('onclick','chooseFromFound(this)');
			li.innerText = value;
			list.appendChild(li);
		}

		function ifSubstr(str, substr){
			if (~str.indexOf(substr)) {
				return true;
			}
		}
	}
}

function chooseFromFound(item){
	document.querySelector('.find-txt').focus();
	document.querySelector('.find-txt').value = item.innerText;
	closeSearchResults();
}

function mobileAutoComplete(substr){
	(substr) ? requestJSON(generateOptions) : closeMobileSearchResults();
	//requestJSON(generateOptions);
	function generateOptions(data){
			const stops = data.stops, routes = data.routes, transports = data.transport;
			const list = document.querySelector('.mobile-search-items');
			list.innerHTML = '';
			for (stop in stops){
				if(ifSubstr(stops[stop].name, substr)){
					createItem(stops[stop].name);
				}
			}
			for (route in routes){
				if(ifSubstr(routes[route].name, substr)){
					createItem(routes[route].name);
				}
			}
			for (transport in transports){
				if(ifSubstr(transports[transport].number, substr)){
					createItem(transports[transport].number);
				}
			}
			if(list.childElementCount){
				document.querySelector('.mobile-search-results').style.display = 'flex';
				document.querySelector('.mobile-find-field').style.padding = '20px 20px 0 20px';
			}

		function createItem(value){
			const li = document.createElement('li');
			li.setAttribute('onclick','chooseFromMobileFound(this)');
			li.innerText = value;
			list.appendChild(li);
		}

		function ifSubstr(str, substr){
			if (~str.indexOf(substr)) {
				return true;
			}
		}
	}

	function closeMobileSearchResults(){
		document.querySelector('.mobile-search-results').style.display = 'none';
		document.querySelector('.mobile-find-field').style.padding = '20px';
	}
}

function chooseFromMobileFound(item){
	document.querySelector('#mobile-find-input').focus();
	document.querySelector('#mobile-find-input').value = item.innerText;
	document.querySelector('.mobile-search-results').style.display = 'none';
	document.querySelector('.mobile-find-field').style.padding = '20px';
}


function signIn(){
	requestJSON(checker);
	function checker(data){
		const loginData = getLoginData(),
			  userData = data.users;
		for (user in userData){
			if ((userData[user].name == loginData[0])&&(userData[user].pass == loginData[1])){
				authorizationComplete(userData[user].name,userData[user].type);
				console.log('Authorization complete');
				return true;
			}
		}
		authorizationFailed();
		console.log('Authorization failed');		
	}

	function getLoginData(){
		const login = document.querySelector('#login-field').value,
			  pass = document.querySelector('#password-field').value;
		
		return [login,pass];
	}

	function authorizationComplete(userName,userType){
		document.querySelector('#login-button').remove();
		document.querySelector('#login-field').remove();
		document.querySelector('#password-field').remove();
		document.querySelector('.login-menu h3').innerText = "Welcome on site, " + userName + "!";
		document.cookie = userType;
		console.log('cookie: ' + document.cookie);
	}

	function authorizationFailed(){
		document.querySelector('#login-field').classList.add('login-failed');
		document.querySelector('#password-field').classList.add('login-failed');
	}
}

function loginValidationReset(){
	document.querySelector('#login-field').classList.remove('login-failed');
	document.querySelector('#password-field').classList.remove('login-failed');
}

function generateTransportTable(){
	requestJSON(generateTable);
	function generateTable(data){
		const transports = data.transport;
		for (transport in transports){
			let type;
			switch(transports[transport].type) {
				case 'AB':
					type = 'directions_bus'
					 break;
				case 'TM':
					type = 'tram'
					 break;
				case 'TL':
					type = 'train'
					break;
			  }
			generateRow(type, transports[transport].number, transports[transport].route, transports[transport].seats);
		}
	}
	function generateRow(type,number,route,seats){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td><i class="material-icons">' + type +
		'</i></td><td><a onclick="generateTransportCard(this)">'+ number + '</a></td><td>' + route +
		'</td><td>' + seats + '</td>';
		document.querySelector('#transport-table').lastChild.append(tr);
	}
}

function generateStopsTable(){
	requestJSON(generateTable);

	function generateTable(data){
		const stops = data.stops;
		for (stop in stops){
			generateRow(stops[stop].name, stops[stop].number, stops[stop].routes.join(', '));
		}
	}

	function generateRow(name,number,route){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td><a onclick="generateStopCard(this)">' + name +
		'</a></td><td>'+ number + '</td><td>' + route +
		'</td>';
		document.querySelector('#stops-table').lastChild.append(tr);
	}
}


function generateRoutesTable(){
	requestJSON(generateTable);

	function generateTable(data){
		const routes = data.routes,
		stops = data.stops;
		let name = [], from = [], to = [];
		for (route in routes){
			for (stop in stops){
				if (parseInt(routes[route].stops[0]) == parseInt(stops[stop].number)){
					from.push(stops[stop].name);
				}
				if (routes[route].stops[routes[route].stops.length-1] == parseInt(stops[stop].number)){
					to.push(stops[stop].name);
				}
			}
			name.push(routes[route].name);
		}
		generateRow(name,from,to);
	}
					
	function generateRow(name,from,to){
		for (let i = 0; i < name.length; i++){
			const tr = document.createElement('tr');
			tr.innerHTML = '<td onclick="generateRouteCard(this)" class="stop-names-td"><a>' + name[i] +
			'</a></td><td>'+ from[i] + '</td><td>' + to[i] + '</td>';
			document.querySelector('#routes-table').lastChild.append(tr);
		}
	}
}

function pageHandler(){
	switch(window.location.pathname){
		case "/nested/transport":
			generateTransportTable();
			break;
		case "/nested/stops":
			generateStopsTable();
			break;
		case "/nested/routes":
			generateRoutesTable();
			break;
	}
}

function generateTransportCard(generationRowData){
	requestJSON(handleData);
	const number = generationRowData.innerText.substr(0,6);
	let type;
	switch(generationRowData.parentElement.previousSibling.innerText.substr(0,4)) {
		case 'dire':
			type = 'Bus ';
			break;
		case 'tram':
			type = 'Tram ';
			break;
		case 'trai':
			type = 'Trolleybus ';
			break;
	  }
	document.querySelector('.card h3').innerText = type + number;

	function handleData(data){
		const TRANSPORTS = data.transport,
			  ROUTES = data.routes,
			  STOPS = data.stops;
		let schedule, routeNum, stops, stopNames = [];
		for (transport in TRANSPORTS){
			if(Object.entries(TRANSPORTS[transport])[1][1]==number){
				schedule = TRANSPORTS[transport].time;
				routeNum = TRANSPORTS[transport].route;
				for (route in ROUTES){
					if (Object.entries(ROUTES[route])[0][1]==routeNum){
						stops = ROUTES[route].stops;
					}
				}
			}
		}
		for (stop in stops){
			for (STOP in STOPS){
				if (stops[stop] == STOPS[STOP].number)
					stopNames.push(STOPS[STOP].name);
			}
		}
		generateTable(stopNames, schedule);
	}

	function generateTable(stops,schedule){
		const wrapper = document.querySelector('#transport-card--wrapper');
		wrapper.lastElementChild.remove('');
		wrapper.innerHTML='<div class="table-open-editor-tools-button" onclick="editTable(this)"><i class="material-icons">settings</i></div><table id="transport-card"><tr><th>Stop</th><th>Time</th></tr></table>';
		for (let i = 0; i < stops.length; i++){
			const tr = document.createElement('tr');
			tr.innerHTML = '<td>' + stops[i] + '</td><td>'+ schedule[i] + '</td>';
			document.querySelector('#transport-card').lastChild.append(tr);
		}
	}
	showCard();
}

function generateStopCard(generationRowData){
	requestJSON(handleData);
	const name = generationRowData.innerText,
	wrapper = document.querySelector('#stop-card--wrapper');
	document.querySelector('.card h3').innerText = name;
	wrapper.lastElementChild.remove('');
	wrapper.innerHTML='<div class="table-open-editor-tools-button" onclick="editTable(this)"><i class="material-icons">settings</i></div><table id="stop-card"><tr><th>Route</th><th>Time</th></tr></table>';
	function handleData(data){
		const stopNumber = parseInt(generationRowData.parentElement.nextSibling.innerText),
		routesList = generationRowData.parentElement.nextSibling.nextSibling.innerText.split(', '),
		ROUTES = data.routes,
		TRANSPORTS = data.transport, STOPS = data.stops;
		for (STOP in STOPS){
			if (name == STOPS[STOP].name){
				const location = {lat: parseFloat(STOPS[STOP].lat), lng: parseFloat(STOPS[STOP].long)};
				initMap(location);
			}
		}
		for (route in routesList){
			for (ROUTE in ROUTES){
				if (ROUTES[ROUTE].name == routesList[route]){
					let times = [];
					for (stop in ROUTES[ROUTE].stops){
						if (stopNumber == ROUTES[ROUTE].stops[stop]){
							for (TRANSPORT in TRANSPORTS){
								if (TRANSPORTS[TRANSPORT].route === routesList[route]){
									times.push(TRANSPORTS[TRANSPORT].time[stop]);
								}
							}
						}
					}
					generateTable(routesList[route],times.join(', '));
				}
			}
		}
	}

	function generateTable(route,times){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td>' + route + '</td><td>'+ times + '</td>';
		document.querySelector('#stop-card').lastChild.append(tr);
	}
	showCard();
}

function generateRouteCard(generationRowData){
	requestJSON(handleData);
	const name = generationRowData.innerText.substr(0,4),
	wrapper = document.querySelector('#route-card--wrapper');
	let locations = [];
	document.querySelector('.card h3').innerText = 'Route ' + name;
	wrapper.lastElementChild.remove('');
	wrapper.innerHTML='<div class="table-open-editor-tools-button" onclick="editTable(this)"><i class="material-icons">settings</i></div><table id="route-card"><tr><th>Stop</th><th>Time</th></tr></table>';
	function handleData(data){
		const ROUTES = data.routes, TRANSPORTS = data.transport, STOPS = data.stops;
		let stops = [];
		for (ROUTE in ROUTES){
			if (name == ROUTES[ROUTE].name)
				stops = ROUTES[ROUTE].stops;
		}
		for (STOP in STOPS){
			for (stop in stops){
				if (stops[stop] == STOPS[STOP].number){
					stops[stop] = STOPS[STOP].name;
					locations[stop] = (STOPS[STOP].lat+','+STOPS[STOP].long);
				}
			}
		}
		for (let i = 0; i < stops.length; i++) {
			let times = [];
			for (TRANSPORT in TRANSPORTS){
					if (name == TRANSPORTS[TRANSPORT].route){
						times.push(TRANSPORTS[TRANSPORT].time[i]);
					}
			}
			generateRow(stops[i],times.join(', '));
		}
		initMap(locations);
	}

	function generateRow(stop, time){
		const tr = document.createElement('tr');
		tr.innerHTML = '<td>' + stop + '</td><td>'+ time + '</td>';
		document.querySelector('#route-card').lastChild.append(tr);
	}
	showCard();
}

function showCard(){
	var card = document.getElementsByClassName("card")[0];
	card.classList.add("show-card");
	card.scrollIntoView({block: "end", behavior: "smooth"});
}

function closeCard(cardCloseButton){
	cardCloseButton.parentElement.classList.remove('show-card');
}

function addToFavorites(card){
	const text = card.nextElementSibling.nextElementSibling.innerText,
	list = document.querySelector('#favorites-list');
	const li = document.createElement('li');

	if(~text.indexOf("Bus")){ 
		li.innerHTML = '<a href="#"><i class="material-icons">directions_bus</i> '+text.substring(4)+'</a><div class="delete-button" onclick="removeFromFavorites(this)"><i class="fa fa-minus"></i></div>';
	}
	else if (~text.indexOf("Tram")){
		li.innerHTML = '<a href="#"><i class="material-icons">tram</i> '+text.substring(5)+'</a><div class="delete-button" onclick="removeFromFavorites(this)"><i class="fa fa-minus"></i></div>';
	}
	else if (~text.indexOf("Trolleybus")){
		li.innerHTML = '<a href="#"><i class="material-icons">train</i> '+text.substring(11)+'</a><div class="delete-button" onclick="removeFromFavorites(this)"><i class="fa fa-minus"></i></div>';
	}
	else if (~text.indexOf("Route")){
		li.innerHTML = '<a href="#"><i class="fas fa-route"></i> '+text.substring(6)+'</a><div class="delete-button" onclick="removeFromFavorites(this)"><i class="fa fa-minus"></i></div>';
	}
	else {
		li.innerHTML = '<a href="#"><i class="material-icons">place</i> '+text+'</a><div class="delete-button" onclick="removeFromFavorites(this)"><i class="fa fa-minus"></i></div>';
	}
	list.appendChild(li);
	card.lastChild.innerText = 'bookmark';
	openFavorites();
	document.querySelector('.favorites-menu').classList.add('fixed-favorites');
}

function requestJSON(func){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/rest/data', true);
		xhr.responseType = 'blob';
		xhr.onload = function() {
			if (this.status == 200) {
				const file = new File([this.response], 'temp');
				const fileReader = new FileReader();
				fileReader.addEventListener('load', function(){
					const data = JSON.parse(fileReader.result);
					func(data);
				});
				fileReader.readAsText(file);
			} 
		}
		xhr.send();
}

document.querySelector('body').onload = pageHandler()
