import { Carousel, MobileCarousel } from "./carousel.js";

let carousel = null,
	screenWidth = document.documentElement.clientWidth;

function chooseCarousel() {
	if (screenWidth <= 500) {
		carousel = new MobileCarousel(document.querySelector(".carousel"));
	} else {
		carousel = new Carousel(document.querySelector(".carousel"));
	}
}

chooseCarousel();

window.addEventListener("resize", function () {
	if (screenWidth != document.documentElement.clientWidth) {
		let clone = document.querySelector(".carousel").cloneNode();
		document.querySelector(".carousel").replaceWith(clone);
		clone.innerHTML = `
		<img src="img/carousel/1.jpg" alt="" />
		<img src="img/carousel/2.jpg" alt="" />
		<img src="img/carousel/3.jpg" alt="" />
		<img src="img/carousel/4.jpg" alt="" />
		<img src="img/carousel/5.jpg" alt="" />
		<img src="img/carousel/6.jpg" alt="" />
		<img src="img/carousel/7.jpg" alt="" />
		<img src="img/carousel/8.jpg" alt="" />`;

		screenWidth = document.documentElement.clientWidth;

		chooseCarousel();
	}
});
