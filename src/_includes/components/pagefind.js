window.addEventListener('DOMContentLoaded', (event) => {
	if (typeof document !== "undefined" && document.querySelector("#pagefindSearch")) {
		new PagefindUI({
			element: "#pagefindSearch"
		});
	}
});
