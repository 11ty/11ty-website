class DetailsForceState extends HTMLElement {
	forceState(details) {
		let isSectionActive = Boolean(details.querySelector(".elv-toc-active") || details.closest(".elv-toc-active"));
		if (isSectionActive) {
			if(!details.open) {
				details.setAttribute("open", "open");
			}
		} else {
			if(details.open) {
				details.removeAttribute("open");
			}
		}
	}

	connectedCallback() {
		let details = this.querySelectorAll(":scope details");
		for(let d of details) {
			this.forceState(d);
		}
	}
}

if ("customElements" in window) {
	customElements.define("details-force-state", DetailsForceState);
}
