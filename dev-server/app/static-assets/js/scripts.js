function burgerMenuToggle(){
	var mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0];
	floatingMenu.classList.toggle("show-menu");
	ifOnThenOff(mobileFindField,"show-mobile-search");
}

function mobileSearch(){
	var mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0];

	mobileFindField.classList.toggle("show-mobile-search");
	ifOnThenOff(floatingMenu,"show-menu");
	ifOnThenOff(ham,"active");
}

function showFavorites(){
	var loginMenu = document.getElementsByClassName("login-menu")[0],
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

function closeAll(){
	mobileFindField = document.getElementsByClassName("mobile-find-field")[0],
	floatingMenu = document.getElementsByClassName("floating-menu")[0],
	ham = document.getElementsByClassName("ham")[0],
	loginMenu = document.getElementsByClassName("login-menu")[0],
	favoritesMenu = document.getElementsByClassName("favorites-menu")[0];

	menusToClose=[mobileFindField,floatingMenu,ham,loginMenu,favoritesMenu];
	classToClose = ["show-mobile-search","show-menu","active","show-additional-menu","show-additional-menu"];

	for(i=0;i<menusToClose.length;i++){
		ifOnThenOff(menusToClose[i],classToClose[i])
	}
}

function showCard(){
	var transportCard = document.getElementsByClassName("card")[0];
	transportCard.classList.toggle("show-card");
	transportCard.scrollIntoView({block: "start", behavior: "smooth"});
}

function closeFindMenu(){
	var findMenu = document.getElementsByClassName("find-a-route-menu")[0];
	findMenu.classList.toggle("find-a-route-wrapped");
}