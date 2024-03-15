class DetailsForceState extends HTMLElement {
	constructor() {
		super();
		this._observer = new MutationObserver(this._init.bind(this));
	}

	connectedCallback() {
		if (this.children.length) {
			this._init();
		}
		this._observer.observe(this, { childList: true });
	}

	_init() {
		let details = this.querySelector(":scope details");
		if (!details) {
			return;
		}

		let forceOpen = window
			.getComputedStyle(details)
			.getPropertyValue("--details-force-closed");

		function forceState(isOpen) {
			if (isOpen) {
				details.setAttribute("open", "open");
			} else {
				details.removeAttribute("open");
			}
		}

		if (forceOpen && "matchMedia" in window) {
			let mm1 = window.matchMedia(forceOpen);
			forceState(!mm1.matches);
			mm1.addListener(function (e) {
				forceState(!e.matches);
			});
		}
	}
}

if ("customElements" in window) {
	customElements.define("details-force-state", DetailsForceState);
}
