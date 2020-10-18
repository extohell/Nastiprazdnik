window.addEventListener("DOMContentLoaded", function () {
	let girl = document.querySelector(".girl"),
		brush = document.querySelector(".brush"),
		bg = document.querySelector(".main-logo__photo"),
		timerId;

	function animateLogo() {
		bg.style.opacity = "0";

		timerId = setInterval(() => {
			girl.style.opacity = girl.style.opacity == "0" ? "1" : "0";
			brush.style.opacity = brush.style.opacity == "0" ? "1" : "0";
			bg.style.opacity = bg.style.opacity == "0" ? "1" : "0";
		}, 3000);
	}

	if (window.innerWidth <= 1024) {
		animateLogo();
	}

	window.addEventListener("resize", function () {
		if (window.innerWidth > 1024) {
			clearInterval(timerId);
			timerId = null;
			girl.style.cssText = "";
			brush.style.cssText = "";
			bg.style.cssText = "";
		} else if (timerId == null) {
			animateLogo();
		}
	});
});
