class DetailsForceState extends HTMLElement {
	forceState(details, forceClosed) {
		let isSectionActive;
		if(forceClosed) {
			isSectionActive = false;
		} else {
			isSectionActive = Boolean(details.querySelector(".elv-toc-active") || details.closest(".elv-toc-active"));
			let titleNode = details.querySelector(":scope > summary + a");
			if(document.location.pathname === "/" && !titleNode) {
				isSectionActive = true;
			}
			// Use breadcrumbs to work with pages excluded from sidebar
			if(titleNode && document.querySelector(".breadcrumb li:nth-child(2) > a")?.textContent === titleNode?.textContent){
				isSectionActive = true;
			}
		}

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
		let forceClosed = this.getAttribute("data-force-closed");
		for(let d of details) {
			let mm1 = window.matchMedia(forceClosed);
			this.forceState(d, mm1.matches);
			mm1.addListener(e => {
				this.forceState(d, e.matches);
			});
		}
	}
}

if ("customElements" in window) {
	customElements.define("details-force-state", DetailsForceState);
}
