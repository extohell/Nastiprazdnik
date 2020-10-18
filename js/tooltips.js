window.addEventListener("DOMContentLoaded", function () {
	let tooltips = document.querySelectorAll(".tooltip");

	function rotateTooltip(tooltip, letter, index) {
		let direction = window.innerWidth >= 500 ? 1 : -1;
		if (tooltip.classList.contains("main-logo__tooltip")) {
			letter.style.transform = `rotate(${-(index + 8) * 5 * direction}deg)`;
		} else if (tooltip.classList.contains("reviews__tooltip")) {
			letter.style.transform = `rotate(${-(index + 5) * 10 - direction}deg)`;
		} else {
			letter.style.transform = `rotate(${-(index + 1) * 13 * direction}deg)`;
		}
	}

	tooltips.forEach((item) => {
		let letters = item.innerHTML.split("");
		item.innerHTML = "";

		for (let i = 0; i < letters.length; i++) {
			let span = document.createElement("span");
			span.innerHTML = letters[i];
			rotateTooltip(item, span, i);

			item.append(span);
		}
	});

	window.addEventListener("resize", function () {
		tooltips.forEach((item) => {
			for (let i = 0; i < item.children.length; i++) {
				rotateTooltip(item, item.children[i], i);
			}
		});
	});
});
