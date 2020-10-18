import { MobileCarousel } from "./carousel.js";

class ModalPhoto {
	constructor(photoSection) {
		this.photoSection = photoSection;
		this.modal = document.querySelector(".modal-photo");
		this.modalBtns = this.modal.querySelectorAll(".modal-photo__btn");
		this.overlay = document.querySelector(".overlay");
		this.blur = this.modal.querySelector(".modal-photo__blur");
		this.photoSection.addEventListener("click", this);
	}

	handleEvent(event) {
		let target = event.target;

		if (!target.classList.contains("photo")) {
			return;
		}

		this.changeModalPhoto(null, target);

		this.showModal(target);
	}

	changeModalPhoto(current, newPhoto) {
		if (current) {
			current.remove();
		}
		this.blur.style.backgroundImage = `url(${newPhoto.dataset.src})`;

		const tmpPhoto = newPhoto.cloneNode();
		tmpPhoto.style.backgroundImage = `url(${tmpPhoto.dataset.src})`;

		this.modal.append(tmpPhoto);
	}

	showModal(target) {
		this.overlay.style.display = "block";
		setTimeout(() => (this.overlay.style.opacity = "1"));

		let coords = target.getBoundingClientRect();

		this.modal.style.cssText = `
		width: ${coords.width}px;
		height: ${coords.height}px;
		left: ${coords.left}px;
		top: ${coords.top}px;`;

		this.modal.style.animation = "modalPhotoPosition 0.6s linear forwards";

		let width = document.documentElement.clientWidth;
		document.body.style.overflow = "hidden";
		if (width < document.documentElement.clientWidth) {
			document.body.style.paddingRight =
				document.documentElement.clientWidth - width + "px";
		}

		if (this.photoSection.children.length > 1) {
			this.modalBtns.forEach((btn) => {
				btn.onmouseover = () => {
					btn.style.opacity = "1";
				};

				btn.onmouseout = () => {
					btn.style.opacity = "0";
				};

				btn.onclick = () => {
					let newPhotoIndex =
						+this.modal.lastElementChild.dataset.index + +btn.dataset.direction;

					if (newPhotoIndex < 0) {
						newPhotoIndex = this.photoSection.children.length - 1;
					}

					if (newPhotoIndex > this.photoSection.children.length - 1) {
						newPhotoIndex = 0;
					}

					this.changeModalPhoto(
						this.modal.lastElementChild,
						this.photoSection.children[newPhotoIndex]
					);
				};
			});
		}

		this.overlay.onclick = () => {
			this.closeModal();
		};

		window.onkeydown = (event) => {
			if (event.code == "Escape") {
				this.closeModal();
			}
		};
	}

	closeModal() {
		this.overlay.style.display = "none";
		this.overlay.style.opacity = "0";
		this.modal.style.cssText = "";

		document.body.style.overflow = "";
		document.body.style.paddingRight = "";

		this.modal.lastElementChild.remove();

		window.onkeydown = null;

		this.modalBtns.forEach((btn) => {
			btn.onmouseover = null;
			btn.onmouseout = null;
			btn.onclick = null;
		});
	}
}

class MobileModalPhoto {
	constructor(photoSection) {
		this.photoSection = photoSection;
		this.modal = document.querySelector(".modal-photo");
		this.overlay = document.querySelector(".overlay");

		this.photoSection.addEventListener("click", this);
	}

	handleEvent(event) {
		let target = event.target;

		if (!target.classList.contains("photo")) {
			return;
		}

		this.showModal(target);
	}

	showModal(target) {
		if (this.photoSection.children.length > 0) {
			this.modalCarousel = new MobileCarousel(
				this.photoSection,
				this.modal,
				false,
				false,
				+target.dataset.index
			);
		}

		this.overlay.style.display = "block";
		setTimeout(() => (this.overlay.style.opacity = "1"));

		this.modal.style.transform = "translate(-50%, -50%) scale(1)";

		let width = document.documentElement.clientWidth;
		document.body.style.overflow = "hidden";
		if (width < document.documentElement.clientWidth) {
			document.body.style.paddingRight =
				document.documentElement.clientWidth - width + "px";
		}

		this.modal.style.width =
			this.modal.querySelectorAll("img")[1].clientWidth + "px";

		this.modal.onclick = (event) => {
			if (event.target.tagName != "IMG") {
				this.closeModal();
			}
		};

		this.overlay.onclick = () => this.closeModal();
	}

	closeModal() {
		this.overlay.style.display = "none";
		this.overlay.style.opacity = "0";
		this.modal.style.cssText = "";

		document.body.style.overflow = "";
		document.body.style.paddingRight = "";

		this.modal.querySelectorAll("img").forEach((img) => img.remove());

		this.modal.removeEventListener("touchstart", this.modalCarousel);
		this.modalCarousel = null;
	}
}

export { ModalPhoto, MobileModalPhoto };
