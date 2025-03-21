class DetailsForceState extends HTMLElement {
	forceState(details, isOpen) {
		if (isOpen) {
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
		let details = this.querySelector(":scope details");
		if (!details || !details.hasAttribute("data-force-media")) {
			return;
		}

		let forceOpen = details.getAttribute("data-force-media");
		if (forceOpen && "matchMedia" in window) {
			let mm1 = window.matchMedia(forceOpen);
			this.forceState(details, !mm1.matches);
			mm1.addListener(e => {
				this.forceState(details, !e.matches);
			});
		}
	}
}

if ("customElements" in window) {
	customElements.define("details-force-state", DetailsForceState);
}
