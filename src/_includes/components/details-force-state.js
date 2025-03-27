class DetailsForceState extends HTMLElement {
	forceState(details, isOpen) {
		let isSectionActive = Boolean(details.querySelector(".elv-toc-active") || details.closest(".elv-toc-active"));
		if (isOpen && isSectionActive) {
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
		let forceOpen = this.getAttribute("data-force-media");
		let details = this.querySelectorAll(":scope details");
		if (!details || !forceOpen) {
			return;
		}

		for(let d of details) {
			if (forceOpen && "matchMedia" in window) {
				let mm1 = window.matchMedia(forceOpen);
				this.forceState(d, !mm1.matches);
				mm1.addListener(e => {
					this.forceState(d, !e.matches);
				});
			}
		}
	}
}

if ("customElements" in window) {
	customElements.define("details-force-state", DetailsForceState);
}
