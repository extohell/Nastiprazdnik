import { MobileModalPhoto, ModalPhoto } from "../js/modalPhoto.js";

async function getReviews(count = 0) {
	let response = await fetch(`../php/getReviews.php?count=${count}`);
	if (response.ok) {
		let data = await response.json();
		if (data.length) {
			data.forEach((item) => {
				let review = document.createElement("div");
				review.className = "reviews__list-item";
				review.insertAdjacentHTML(
					"beforeend",
					`<div class="reviews__list-item-avatar"
                    style="border-color: ${item.avatarColor};"></div>
                    <span class="reviews__list-item-name">${item.author}</span>
                    <p class="reviews__list-item-text">${item.text}</p>
                    <div class="photos-wrapper"></div>`
				);
				document.querySelector(".reviews__list").prepend(review);
				review.querySelector(
					".reviews__list-item-avatar"
				).style.backgroundImage = item.avatarImage;
				if (item.photos.length) {
					item.photos.forEach((photo, index) => {
						review.querySelector(".photos-wrapper").insertAdjacentHTML(
							"beforeend",
							`<div class="reviews__list-item-picture photo"
							data-index="${index}"
							data-src="${photo}"
                            style="background-image: url(${photo});">
                            </div>`
						);
					});
					if (document.documentElement.clientWidth <= 1024) {
						let tmp = new MobileModalPhoto(
							review.querySelector(".photos-wrapper")
						);
					} else {
						let tmp = new ModalPhoto(review.querySelector(".photos-wrapper"));
					}
				}
				count = item.id;
			});
		}
	}

	setTimeout(() => {
		getReviews(count);
	}, 3000);
}

export { getReviews };
