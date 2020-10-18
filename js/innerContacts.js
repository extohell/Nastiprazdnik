window.addEventListener("DOMContentLoaded", function () {
	let wrapper = document.querySelector(".inner-contacts"),
		links = wrapper.querySelectorAll(".inner-contacts__link"),
		screenWidth = document.documentElement.clientWidth;

	window.addEventListener("resize", () => {
		if (screenWidth != document.documentElement.clientWidth) {
			wrapper.style.top = "";
			screenWidth = document.documentElement.clientWidth;
		}
	});

	function showInnerContacts(offsetBottom) {
		wrapper.style.top =
			document.documentElement.scrollHeight -
			wrapper.clientHeight -
			offsetBottom +
			"px";
		wrapper.style.opacity = "1";
		setTimeout(() => {
			links.forEach((item) => {
				item.style.opacity = "1";
				item.style.top = item.dataset.top;
				item.style.left = item.dataset.left;
			});
		}, 200);
	}

	function hideInnerContacts() {
		wrapper.style.opacity = "0";
		setTimeout(() => {
			links.forEach((item) => {
				item.style.opacity = "0";
				item.style.top = 0;
				item.style.left = 0;
			});
		}, 200);
		links[2].querySelector(
			".inner-contacts__link--tel-number"
		).style.transform = "scale(0)";
	}

	if (
		document.documentElement.clientHeight >=
		document.documentElement.scrollHeight
	) {
		showInnerContacts(50);
	} else {
		window.addEventListener("scroll", function () {
			if (
				window.pageYOffset + document.documentElement.clientHeight >=
				document.documentElement.scrollHeight - 60
			) {
				document.documentElement.clientWidth > 1024
					? showInnerContacts(50)
					: showInnerContacts(30);
			} else {
				hideInnerContacts();
			}
		});
	}

	if (document.documentElement.clientWidth > 1024) {
		links[2].addEventListener("click", function (event) {
			event.preventDefault();
			this.querySelector(".inner-contacts__link--tel-number").style.transform =
				"scale(1)";
		});
	}

	//по наведению в углу экрана

	// if (document.documentElement.clientWidth > 1024) {
	// 	document.addEventListener("mousemove", function (event) {
	// 		if (
	// 			event.pageX > document.body.offsetWidth - 400 &&
	// 			event.pageY > document.body.scrollHeight - 350
	// 		) {
	// 			showInnerContacts(50);
	// 		} else {
	// 			hideInnerContacts();
	// 			links[2].querySelector(
	// 				".inner-contacts__link--tel-number"
	// 			).style.transform = "scale(0)";
	// 		}
	// 	});

	// 	links[2].addEventListener("click", function (event) {
	// 		event.preventDefault();
	// 		this.querySelector(".inner-contacts__link--tel-number")
	// .style.transform =
	// 			"scale(1)";
	// 	});
	// } else {
	// 	window.addEventListener("scroll", function () {
	// 		if (
	// 			window.pageYOffset + document.documentElement.clientHeight >=
	// 			document.documentElement.scrollHeight - 60
	// 		) {
	// 			showInnerContacts(30);
	// 		} else {
	// 			hideInnerContacts();
	// 		}
	// 	});
	// }
});
