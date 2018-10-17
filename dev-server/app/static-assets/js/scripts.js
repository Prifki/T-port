function burgerMenuToggle() {
	document.getElementsByClassName("floating-menu")[0].classList.toggle("show-menu");
	if(document.getElementsByClassName("mobile-find-field")[0].classList.toggle("show-mobile-search")){
		document.getElementsByClassName("mobile-find-field")[0].classList.toggle("show-mobile-search");
	}
}

function mobileSearch() {
	document.getElementsByClassName("mobile-find-field")[0].classList.toggle("show-mobile-search");
	if(document.getElementsByClassName("floating-menu")[0].classList.toggle("show-menu")){
		document.getElementsByClassName("floating-menu")[0].classList.toggle("show-menu");
	}
	if(document.getElementsByClassName("ham")[0].classList.toggle("active"))
		document.getElementsByClassName("ham")[0].classList.toggle("active");
}
