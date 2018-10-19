function burgerMenuToggle() {
	var mobileFindFielf = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0];
	floatingMenu.classList.toggle("show-menu");
	ifOnThenOff(mobileFindFielf,"show-mobile-search");
}

function showTransportCard(){
	var transportCard = document.getElementsByClassName("transport-card")[0];
	transportCard.classList.toggle("show-card");
	transportCard.scrollIntoView({block: "start", behavior: "smooth"});
}

function mobileSearch() {
	var mobileFindFielf = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0];

	mobileFindFielf.classList.toggle("show-mobile-search");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(ham,"active");
}

function showFavorites(){
	var loginMenu = document.getElementsByClassName("login-menu")[0];
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	ifOnThenOff(loginMenu,"show-additional-menu");
	favoritesMenu.classList.toggle("show-additional-menu");;
}

function showLoginMenu(){
	var loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	loginMenu.classList.toggle("show-additional-menu");
	ifOnThenOff(favoritesMenu,"show-additional-menu");
}

function ifOnThenOff(obj,cla){
	if(obj.classList.toggle(cla))
		obj.classList.toggle(cla);
}