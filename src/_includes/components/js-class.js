if("classList" in document.documentElement) {
	var docEl = document.documentElement;
	docEl.classList.add("js");

	if ("open" in document.createElement("details")) {
		docEl.classList.add("supports-detailssummary");
	}

	if ("chrome" in window) {
		docEl.classList.add("stackblitz");
	}
}
