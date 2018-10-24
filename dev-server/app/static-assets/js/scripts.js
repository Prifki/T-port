function burgerMenuToggle(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];
	
	floatingMenu.classList.toggle("show-menu");
	ifOnThenOff(loginMenu,"show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
	ifOnThenOff(mobileFindField,"show-mobile-search");
}

function mobileSearch(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	mobileFindField.classList.toggle("show-mobile-search");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(loginMenu,"show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
	ifOnThenOff(ham,"active");
}

function showFavorites(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	favoritesMenu.classList.toggle("show-additional-menu");
	ifOnThenOff(loginMenu,"show-additional-menu");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(ham,"active");
	ifOnThenOff(mobileFindField,"show-mobile-search");
}


function showLoginMenu(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	loginMenu.classList.toggle("show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(ham,"active");
	ifOnThenOff(mobileFindField,"show-mobile-search");
}

function ifOnThenOff(obj,cla){
	if(obj.classList.toggle(cla))
		obj.classList.toggle(cla);
}

function ifOffThenOn(obj,cla){
	if(!obj.classList.toggle(cla))
		obj.classList.toggle(cla);
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

window.onload = readJSON();

function readJSON() {
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
			for (stop in stops)
				console.log(stops[stop].name);
          });
          fileReader.readAsText(file);
      } 
    }
	xhr.send();
}
