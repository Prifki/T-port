function burgerMenuToggle(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0],
	findMenu = document.getElementsByClassName("find-a-route-menu")[0];
	
	floatingMenu.classList.toggle("show-menu");
	ifOnThenOff(loginMenu,"show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
	ifOnThenOff(mobileFindField,"show-mobile-search");
	ifOffThenOn(findMenu,"find-a-route-wrapped");
}

function mobileSearch(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0],
	findMenu = document.getElementsByClassName("find-a-route-menu")[0];

	mobileFindField.classList.toggle("show-mobile-search");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(loginMenu,"show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
	ifOnThenOff(ham,"active");
	ifOffThenOn(findMenu,"find-a-route-wrapped");
}

function showFavorites(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0],
	findMenu = document.getElementsByClassName("find-a-route-menu")[0];

	favoritesMenu.classList.toggle("show-additional-menu");
	ifOnThenOff(loginMenu,"show-additional-menu");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(ham,"active");
	ifOnThenOff(mobileFindField,"show-mobile-search");
	if (window.innerWidth <= 470)
		ifOffThenOn(findMenu,"find-a-route-wrapped");
}

function editFavorites(){
	deleteButtons = document.getElementsByClassName("delete-button");
	for (i=0; i < deleteButtons.length; i++)
		deleteButtons[i].style.display = 'block';
}

function showLoginMenu(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0],
	findMenu = document.getElementsByClassName("find-a-route-menu")[0];

	loginMenu.classList.toggle("show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(ham,"active");
	ifOnThenOff(mobileFindField,"show-mobile-search");
	if (window.innerWidth <= 470)
		ifOffThenOn(findMenu,"find-a-route-wrapped");
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



/*function closeAll(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	menusToClose=[mobileFindField,floatingMenu,ham,loginMenu,favoritesMenu];
	classToClose = ["show-mobile-search","show-menu","active","show-additional-menu","show-additional-menu"];

	for (i=0; i<menusToClose.length; i++) {
		ifOnThenOff(menusToClose[i], classToClose[i])
	}
}*/