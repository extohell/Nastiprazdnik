class Carousel {
	constructor(carousel) {
		this.carousel = carousel;
		this.images = carousel.querySelectorAll("img");
		this.data = {
			item1: {
				transform: "translateX(-110%) scale(0.3)",
				zIndex: 2,
				opacity: 0.8,
			},
			item2: {
				transform: "translateX(-80%) scale(0.5)",
				zIndex: 3,
				opacity: 0.8,
			},
			item3: {
				transform: "translateX(-50%) scale(0.7)",
				zIndex: 4,
				opacity: 0.8,
			},
			item4: {
				transform: "translateX(0) scale(1)",
				zIndex: 5,
				opacity: 1,
			},
			item5: {
				transform: "translateX(50%) scale(0.7)",
				zIndex: 4,
				opacity: 0.8,
			},
			item6: {
				transform: "translateX(80%) scale(0.5)",
				zIndex: 3,
				opacity: 0.8,
			},
			item7: {
				transform: "translateX(110%) scale(0.3)",
				zIndex: 2,
				opacity: 0.8,
			},
			restItems: {
				transform: "translateX(0) scale(0.3)",
				zIndex: 1,
				opacity: 0,
			},
			steps: 0,
			direction: 0,
			animationTime: 500,
		};
		this.carouselItems = [];
		this.images.forEach((item, index) => {
			let div = document.createElement("div");
			div.className = "carousel__item";
			div.style.backgroundImage = `url(${item.src})`;
			item.remove();
			carousel.append(div);

			div.style.marginLeft = -div.offsetWidth / 2 + "px";
			div.style.marginTop = -div.offsetHeight / 2 + "px";

			this.carouselItems.push(div);

			this.changePosition(div, index + 1);
		});
		this.carousel.addEventListener("click", this);
	}

	async handleEvent(event) {
		let target = event.target.closest(".carousel__item");

		if (!target) {
			return;
		}

		this.data.steps = 4 - +target.dataset.position;
		this.data.animationTime = 500 - Math.abs(this.data.steps) * 100;

		this.data.direction = this.data.steps < 0 ? -1 : 1;

		for (let i = 0; i < Math.abs(this.data.steps); i++) {
			this.roll(this.data.direction, this.data.animationTime);

			await new Promise((resolve) =>
				setTimeout(resolve, this.data.animationTime)
			);
		}
	}

	changePosition(item, position) {
		if (position <= 7) {
			let { transform, zIndex, opacity } = this.data[`item${position}`];
			item.style.transform = transform;
			item.style.zIndex = zIndex;
			item.style.opacity = opacity;
		} else {
			let { transform, zIndex, opacity } = this.data.restItems;
			item.style.transform = transform;
			item.style.zIndex = zIndex;
			item.style.opacity = opacity;
		}

		item.style.transition = `transform ${
			this.data.animationTime / 1000
		}s linear, opacity ${this.data.animationTime / 1000}s`;

		item.dataset.position = position;

		if (position == 4) {
			item.ontouchstart = (event) => {
				let startPoint = event.changedTouches[0],
					endPoint;

				event.target.ontouchend = (event) => {
					endPoint = event.changedTouches[0];

					let distX = startPoint.pageX - endPoint.pageX;

					if (Math.abs(distX) > 50) {
						if (distX < 0) {
							this.roll(1);
						} else {
							this.roll(-1);
						}
					}
					event.target.ontouchend = null;
				};
			};
		} else {
			item.ontouchstart = null;
		}
	}

	roll(direction) {
		this.carouselItems.forEach((item) => {
			let newPosition = +item.dataset.position + direction;

			if (newPosition > this.carouselItems.length) {
				newPosition = 1;
			}
			if (newPosition < 1) {
				newPosition = this.carouselItems.length;
			}

			this.changePosition(item, newPosition, this.data.animationTime);
		});
	}
}

class MobileCarousel {
	constructor(carousel, modal, imgsTags = true, isDots = true, start = 0) {
		this.carousel = carousel;
		this.sources = [];

		if (isDots) {
			this.dots = document.createElement("div");
			this.dots.className = "carousel__dots";
		}
		if (imgsTags) {
			this.images = carousel.querySelectorAll("img");
			this.images.forEach((item, index) => {
				this.sources.push(item.src);
				item.remove();

				if (isDots) {
					let dot = document.createElement("span");
					if (index == 0) {
						dot.className = "selected";
					}
					this.dots.append(dot);
				}
			});
		} else {
			this.images = carousel.querySelectorAll(".photo");
			this.images.forEach((item, index) => {
				this.sources.push(item.dataset.src);

				if (isDots) {
					let dot = document.createElement("span");
					if (index == 0) {
						dot.className = "selected";
					}
					this.dots.append(dot);
				}
			});
		}
		if (modal) {
			this.carousel = modal;
			this.modal = modal;
		}
		if (isDots) {
			this.carousel.append(this.dots);
		}

		this.current = start;

		this.draw(start, 0);
		this.draw(start + 1 > this.sources.length - 1 ? 0 : start + 1, 1);
		this.draw(start - 1 < 0 ? this.sources.length - 1 : start - 1, -1);

		this.carousel.addEventListener("touchstart", this);
	}

	handleEvent(event) {
		let startPoint = event.changedTouches[0].pageX,
			nowPoint,
			offset = 0;

		let target = event.target;

		target.ontouchmove = (event) => {
			let otk;
			nowPoint = event.changedTouches[0];
			otk = nowPoint.pageX - startPoint;
			this.carousel
				.querySelectorAll(".carousel__item")
				.forEach((slide, index) => {
					slide.style.left =
						parseInt(slide.style.left) + Math.floor(otk / 30) + "%";
					if (index == 1) {
						offset = 100 - Math.abs(parseInt(slide.style.left));
					}
				});
			if (Math.abs(otk) > 100) {
				if (otk < 0) {
					this.roll(1, offset);
				} else {
					this.roll(-1, offset);
				}
				target.ontouchmove = null;
			}

			target.ontouchend = () => {
				if (Math.abs(otk) < 100) {
					this.carousel.querySelectorAll(".carousel__item").forEach((slide) => {
						slide.style.left =
							parseInt(slide.style.left) -
							(100 - offset) * Math.sign(otk) +
							"%";
					});
					target.ontouchend = null;
				}
			};
		};
	}

	draw(index, position) {
		let img = document.createElement("img");
		img.className = "carousel__item";
		img.src = `${this.sources[index]}`;
		img.style.left = position * 100 + "%";
		position < 0
			? this.carousel.querySelector(".carousel__item").before(img)
			: this.carousel.append(img);
	}

	roll(direction, offset) {
		if (document.documentElement.clientWidth > 500 && this.modal) {
			let nextSlide = this.modal.querySelectorAll("img")[1 + direction];
			this.modal.style.width = nextSlide.clientWidth + "px";
		}
		this.carousel
			.querySelectorAll(".carousel__item")
			.forEach((slide, index) => {
				slide.style.left =
					parseInt(slide.style.left) - offset * direction + "%";
			});
		this.current = this.current + direction;

		if (this.current < 0) {
			this.current = this.sources.length - 1;
		}

		if (this.current == this.sources.length) {
			this.current = 0;
		}

		if (this.current + direction == this.sources.length) {
			this.draw(0, direction);
		} else if (this.current + direction < 0) {
			this.draw(this.sources.length - 1, direction);
		} else {
			this.draw(this.current + direction, direction);
		}

		setTimeout(() => {
			let toDelete =
				direction == 1
					? this.carousel.querySelector(".carousel__item")
					: this.carousel.lastElementChild;
			toDelete.remove();
		}, 400);

		if (this.dots) {
			this.dots.querySelectorAll("span").forEach((dot, index) => {
				if (this.current == index) {
					dot.className = "selected";
				} else {
					dot.className = "";
				}
			});
		}
	}
}

export { Carousel, MobileCarousel };
