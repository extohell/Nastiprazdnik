(function () {
	if (document.documentElement.clientWidth <= 1024) {
		return;
	}

	let images = [
		"baby-circle.svg",
		"ball.svg",
		"box.svg",
		"bread.svg",
		"cactus.svg",
		"cat.svg",
		"chick.svg",
		"cloud.svg",
		"couch-potato.svg",
		"cube.svg",
		"cup.svg",
		"cupcake.svg",
		"dinosaur.svg",
		"donut.svg",
		"fat-cat.svg",
		"fire.svg",
		"grey-cloud.svg",
		"hidden.svg",
		"horned.svg",
		"ice-cream.svg",
		"inverted.svg",
		"jelly.svg",
		"jellyfish.svg",
		"koala.svg",
		"lollipop.svg",
		"milkshake.svg",
		"mushroom.svg",
		"music-lover.svg",
		"pie.svg",
		"popcorn.svg",
		"rabbit.svg",
		"skittle.svg",
		"striped.svg",
		"surprised-donut.svg",
		"surprised.svg",
		"sushi.svg",
		"tongue.svg",
		"triangle.svg",
		"wok.svg",
		"woolen.svg",
		"worm.svg",
	];

	let timerId;

	loadIcon();

	function loadIcon() {
		document.body.insertAdjacentHTML(
			"afterbegin",
			`<div class="loadIcon">
			<div class="loadIcon__wb"></div>
			<div class="loadIcon__color"></div>
		</div>`
		);

		changeIcon();
		timerId = setInterval(changeIcon, 3000);
	}

	function changeIcon() {
		let rand = Math.floor(Math.random() * (images.length - 1));

		document.querySelector(".loadIcon").innerHTML = `
		<div class="loadIcon__wb"
		style="background-image: url(/img/avas-wb/${images[rand]})"></div>
		<div class="loadIcon__color"
			style="background-image: url(/img/avas/${images[rand]})"></div>`;
	}

	window.addEventListener("load", function () {
		document.querySelector(".loadIcon").remove();
		clearInterval(timerId);
	});
})();
