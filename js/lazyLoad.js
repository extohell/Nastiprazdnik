const images = document.querySelectorAll(".photo");
const options = {
	threshold: 0.1,
	root: null,
	rootMargin: "0px",
};

const loadImg = (img) => {
	img.style.backgroundImage = `url(${img.dataset.src})`;
};

const handleImg = (img, observer) => {
	img.forEach((singleImg) => {
		if (singleImg.intersectionRatio > 0) {
			loadImg(singleImg.target);
		}
	});
};

const observer = new IntersectionObserver(handleImg, options);

images.forEach((img) => observer.observe(img));
