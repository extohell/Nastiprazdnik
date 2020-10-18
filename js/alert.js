function showAlert(text) {
	let alert = document.querySelector(".alert"),
		notice = alert.querySelector(".alert__notice");
	notice.textContent = text;
	alert.style.transform = "translateX(150px)";

	setTimeout(() => {
		notice.style.opacity = "1";
	}, 500);

	function hideAlert() {
		alert.style.transform = "";
		notice.style.opacity = "";
	}

	alert.onclick = () => {
		hideAlert();
		clearInterval(timerId);
	};

	let timerId = setTimeout(() => {
		hideAlert();
	}, 4000);
}

export { showAlert };
