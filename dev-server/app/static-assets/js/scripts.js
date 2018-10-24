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

function openFoundRoutes(){
	const foundRoutes = document.getElementsByClassName('found-route-menu')[0];
	foundRoutes.style.display = 'block';
}

function closeFoundRoutes(){
	const foundRoutes = document.getElementsByClassName('found-route-menu')[0];
	foundRoutes.style.display = 'none';
}

function toggleBurgerMenu(){
	floatingMenu = document.getElementsByClassName("floating-menu")[0];
	floatingMenu.classList.toggle("show-menu");

	closeLoginMenu();
	closeFavorites();
	closeMobileSearch();
}

function toggleMobileSearch(){
	mobileSearch = document.getElementsByClassName("mobile-find-field")[0];
	mobileSearch.classList.toggle("show-mobile-search");

	closeLoginMenu();
	closeFavorites();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function toggleFavorites(){
	favorites = document.getElementsByClassName("favorites-menu")[0];
	favorites.classList.toggle("show-additional-menu");

	closeLoginMenu();
	closeMobileSearch();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function toggleLoginMenu(){
	login = document.getElementsByClassName("login-menu")[0];
	login.classList.toggle("show-additional-menu");

	closeFavorites();
	closeMobileSearch();
	closeBurgerMenu();
	deactivateBurgerImg();
}

function closeFindMenu(){
	var findMenu = document.getElementsByClassName("find-a-route-menu")[0];
	findMenu.classList.toggle("find-a-route-wrapped");
}

function showCard(){
	var transportCard = document.getElementsByClassName("card")[0];
	transportCard.classList.toggle("show-card");
	transportCard.scrollIntoView({block: "start", behavior: "smooth"});
}

function editFavorites(){
	deleteButtons = document.getElementsByClassName("delete-button");
	if(document.getElementsByClassName('edit-button')[0].firstChild.textContent=='more_vert'){
		for (i=0; i < deleteButtons.length; i++)
			deleteButtons[i].style.display = 'block';
		document.getElementsByClassName('edit-button')[0].firstChild.textContent='more_horiz';
	}
	else {
		for (i=0; i < deleteButtons.length; i++)
			deleteButtons[i].style.display = 'none';
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
			
			const td = document.createElement('td');
			tbody.lastChild.appendChild(td);
			addPlusButton(tbody);
		}
	}
	catch (error) {
		console.log("An error has been caught: " + error);
	}

	function addPlusButton(tbody){
		const td = document.createElement('td'),
		i = document.createElement('i');
		i.setAttribute('class','material-icons table-editor-buttons');
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

function autoComplete() {
	try {
		if(!document.querySelector('#stopsA').childElementCount){
			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/rest/data', true);
			xhr.responseType = 'blob';
			xhr.onload = function(e) { 
			if (this.status == 200) {
				var file = new File([this.response], 'temp');
				var fileReader = new FileReader();
				fileReader.addEventListener('load', function(){
					const data = JSON.parse(fileReader.result),
						stops = data.stops;
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
				});
				fileReader.readAsText(file);
			} 
			}
			xhr.send();
		}
	}
	catch (error) {
		console.log("A fucking error again: " + error);
	}
}
