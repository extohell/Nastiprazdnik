import { MobileModalPhoto, ModalPhoto } from "./modalPhoto.js";

let albumModal = null;

if (document.documentElement.clientWidth > 1024) {
	albumModal = new ModalPhoto(document.querySelector(".gallery-album__album"));
} else {
	albumModal = new MobileModalPhoto(
		document.querySelector(".gallery-album__album")
	);
}

window.addEventListener("resize", function () {
	let modal = document.querySelector(".modal-photo"),
		images = modal.querySelectorAll("img");

	if (
		document.documentElement.clientWidth > 500 &&
		document.documentElement.clientHeight <= 768 &&
		images.length
	) {
		modal.style.width = modal.querySelectorAll("img")[1].clientWidth + "px";
	} else {
		modal.style.width = "";
	}
});
