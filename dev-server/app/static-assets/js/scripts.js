function burgerMenuToggle() {
	var mobileFindFielf = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0];
	floatingMenu.classList.toggle("show-menu");
	toggleClass(mobileFindFielf,"show-mobile-search")
}

function mobileSearch() {
	var mobileFindFielf = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0];

	mobileFindFielf.classList.toggle("show-mobile-search");
	toggleClass(floatingMenu,"show-menu")
	toggleClass(ham,"active")
}

function showFavorites(){
	var loginMenu = document.getElementsByClassName("login-menu")[0];
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	toggleClass(loginMenu,"show-additional-menu")
	favoritesMenu.classList.toggle("show-additional-menu");
}

function showLoginMenu(){
	var loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	loginMenu.classList.toggle("show-additional-menu");
	toggleClass(favoritesMenu,"show-additional-menu")
}

function toggleClass(obj,cla){
	if(obj.classList.toggle(cla))
		obj.classList.toggle(cla)
}