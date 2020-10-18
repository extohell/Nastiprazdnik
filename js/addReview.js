import { showAlert } from "./alert.js";
import { getReviews } from "./getReviews.js";

(async function () {
	let avatar = document.querySelector(".reviews__form--avatar"),
		modal = document.querySelector(".reviews__modal"),
		overlay = document.querySelector(".overlay"),
		addPicture = document.querySelector("#filePicture"),
		addedPictures = document.querySelector(".reviews__form-pictures"),
		form = document.querySelector(".reviews__form"),
		text = document.querySelector(".reviews__form--text"),
		author = document.querySelector('input[name="author"]'),
		photos = {},
		badWords = [];

	let response = await fetch("/badWords.txt");
	let words = await response.text();
	badWords = words.split(", ");

	getReviews();

	fetch("/php/getImages.php?folder=/img/avas/")
		.then((response) => response.json())
		.then((names) => {
			names.forEach((item) => {
				modal.insertAdjacentHTML(
					"afterbegin",
					`<div class="reviews__modal-avas"
							style="background-image: url(/img/avas/${item})">
						</div>`
				);
			});
		});

	function closeModal() {
		overlay.style.display = "none";
		overlay.style.opacity = "0";
		modal.style.cssText = "";

		document.body.style.overflow = "";
		document.body.style.paddingRight = "";
	}

	avatar.addEventListener("click", function () {
		overlay.style.display = "block";
		setTimeout(() => (overlay.style.opacity = "1"));

		let coords = avatar.getBoundingClientRect();

		modal.style.left = `${coords.left + coords.width / 2}px`;
		modal.style.top = `${coords.top + coords.width / 2}px`;

		modal.style.animation = "modalAvatarPosition 0.5s linear forwards";

		let width = document.documentElement.clientWidth;
		document.body.style.overflow = "hidden";
		if (width < document.documentElement.clientWidth) {
			document.body.style.paddingRight =
				document.documentElement.clientWidth - width + "px";
		}
	});

	modal.addEventListener("click", function (event) {
		let target = event.target;

		if (
			target.closest(".reviews__modal-color-picker") &&
			target.tagName == "SPAN"
		) {
			if (!target.classList.contains("selected")) {
				target.parentNode
					.querySelectorAll("span")
					.forEach((item) => item.classList.remove("selected"));
				target.classList.add("selected");
			}
			let color = target.dataset.color;

			modal
				.querySelectorAll(".reviews__modal-avas")
				.forEach((item) => (item.style.borderColor = color));
		}

		if (target.classList.contains("reviews__modal-avas")) {
			avatar.style.backgroundImage = target.style.backgroundImage;
			avatar.innerHTML = "";
			avatar.style.borderColor = target.style.borderColor;

			closeModal();
		}
	});

	overlay.addEventListener("click", closeModal);

	window.addEventListener("keydown", function (event) {
		if (event.code == "Escape") {
			closeModal();
		}
	});

	function picturePreview(file) {
		let reader = new FileReader();
		reader.addEventListener("load", function (event) {
			addedPictures.insertAdjacentHTML(
				"beforeend",
				`<div class="reviews__form-pictures--preview" id="${file.name}">
				<img src="${event.target.result}">
				<span class="reviews__form-pictures--delete"></span>
			</div>`
			);
			photos[file.name] = file;
		});
		reader.readAsDataURL(file);
	}

	addPicture.addEventListener("change", function () {
		let files = this.files;

		if (Object.keys(photos).length + files.length > 10) {
			showAlert("Максимум 10 фотографий");
			return;
		}

		for (let i = 0; i < files.length; i++) {
			let file = files[i];

			picturePreview(file);
		}
		this.value = "";
	});

	addedPictures.addEventListener("click", function (event) {
		if (!event.target.classList.contains("reviews__form-pictures--delete")) {
			return;
		}

		let item = event.target.parentNode;

		delete photos[item.id];
		item.remove();
	});

	form.addEventListener("submit", function (event) {
		event.preventDefault();

		let badText = false;

		badWords.forEach((item) => {
			let regexp = new RegExp(
				`(?<![а-яёА-ЯЁ0-9_])${item}(?![а-яёА-ЯЁ0-9_])`,
				"gi"
			);

			text.innerHTML = text.innerHTML.replace(regexp, (match) => {
				badText = true;
				return `<span class="mat">${match}</span>`;
			});

			author.value.replace(regexp, (match) => {
				badText = true;
				author.style.color = "red";
			});
		});

		if (badText) {
			showAlert("Ай-яй-яй! Не материтесь...");
			text.onfocus = () => {
				text.innerHTML = text.innerHTML.replace(/<\/?span.*?>/g, "");
				text.onfocus = null;
			};

			author.onfocus = () => (author.style.color = "");

			return;
		}

		if (author.value == "") {
			showAlert("Введите ваше имя");
			return;
		}

		if (avatar.style.backgroundImage == "") {
			showAlert("Выберите аватар");
			return;
		}

		let formData = new FormData(this);

		formData.append("avatar[image]", avatar.style.backgroundImage);
		formData.append("avatar[color]", getComputedStyle(avatar).borderColor);
		formData.append("text", text.innerHTML);

		for (let name in photos) {
			formData.append("photos[]", photos[name]);
		}

		photos = {};

		fetch("../php/addReview.php", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					showAlert("Спасибо за ваш отзыв!");
				} else {
					showAlert("Что-то пошло не так, попробуйте позже:(");
				}
			})
			.then(() => {
				avatar.style.cssText = "";
				avatar.textContent = "Выберите аватар";
				text.innerHTML = "";
				author.value = "";
				addedPictures.innerHTML = "";
			});
	});
})();
