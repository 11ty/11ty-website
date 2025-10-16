addEventListener("DOMContentLoaded", () => {
	console.log( document.querySelectorAll("wa-copy-button").length );
	document.querySelectorAll("[data-wa-copy-button-target]").forEach(island => {
		let id = island.getAttribute("data-wa-copy-button-target");
		let pre = island.closest(".syntax-highlight")?.querySelector("pre");
		console.log( pre, id, pre.hasAttribute("id") );
		if(pre && !pre.hasAttribute("id")) {
			pre.setAttribute("id", id);
		}
	})
})
