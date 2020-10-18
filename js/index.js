window.addEventListener("DOMContentLoaded", async function () {
	function getRealVh() {
		let vh = window.innerHeight * 0.01;
		document.body.style.setProperty("--vh", `${vh}px`);
	}

	getRealVh();

	window.addEventListener("resize", getRealVh);

	let color = document.createElement("svg"),
		response = await fetch("img/colored.svg"),
		svg = await response.text();
	color.innerHTML = svg;

	function paintWhite(target) {
		for (let item of target) {
			if (item.getAttribute("fill") != "#000000") {
				setTimeout(() => {
					item.setAttribute("fill", "#FFFFFF");
				}, 100);
			}
		}
	}

	function paintColor(target, targetColor) {
		for (let i = 0; i < target.length; i++) {
			target[i].setAttribute("fill", targetColor[i].getAttribute("fill"));
		}
	}

	document.querySelectorAll(".main-bg").forEach((item) => {
		item.addEventListener("mouseover", function (event) {
			let target = event.target.closest("svg > g[id]");
			if (!target) {
				return;
			}
			let targetFills = target.querySelectorAll("[fill]"),
				colorTarget = color.querySelector(`#${target.id}`),
				colorTargetFills = colorTarget.querySelectorAll("[fill]");

			paintColor(targetFills, colorTargetFills);

			target.onmouseout = function (event) {
				if (!event.relatedTarget) {
					paintWhite(targetFills);
					return;
				}
				if (event.relatedTarget.closest("svg > g[id]") == target) {
					return;
				}
				if (target.dataset.clicked) {
					return;
				}

				paintWhite(targetFills);

				target.onmouseout = null;
			};

			target.addEventListener("click", function () {
				this.dataset.clicked = true;
			});
		});
	});

	let brushSvg = document.querySelector(".brush"),
		lettersSvg = document.querySelectorAll(".letters g[id]");

	setTimeout(() => {
		brushSvg.style.opacity = "1";
		lettersSvg.forEach((item, i) => {
			setTimeout(() => {
				item.style.opacity = "1";
			}, 150 * ++i);
		});
	}, 300);

	let mainLinks = document.querySelectorAll(".main-nav__link"),
		splashes = document.querySelectorAll(".main-nav .splash");

	mainLinks.forEach((item, index) => {
		item.addEventListener("mousedown", function () {
			document.querySelector("#splash").play();
			item.nextElementSibling.style.display = "none";
			splashes[index].style.transform = "scale(1)";
		});

		item.addEventListener("click", function (event) {
			event.preventDefault();
			setTimeout(() => (location.href = this.href), 500);
		});
	});
});
