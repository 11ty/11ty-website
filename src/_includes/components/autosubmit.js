
class FormAutoSubmit extends HTMLElement {
	constructor() {
		super();

		// this.attrs = {};
		// this.options = {};

		this._connect();
	}

	connectedCallback() {
		this._connect();
	}

	_connect() {
		if (this.children.length) {
			this._init();
			return;
		}

		// not yet available, watch it for init
		this._observer = new MutationObserver(this._init.bind(this));
		this._observer.observe(this, { childList: true });
	}

	_init() {
		if(this.initialized) {
			return;
		}
		this.initialized = true;

		this.forms = this.querySelectorAll("form");
		for(let form of this.forms) {
			this.addEvents(form);
		}
	}

	addEvents(form) {
		// Don’t submit the form when using the arrows
		form.addEventListener("keydown", e => {
			let code = e.keyCode || e.which;
			if(code >= 37 && code <= 40) {
				form.changeViaArrowKeys = true;
				form.classList.add("form-autosubmit-show-button");
			}
		})
		form.addEventListener("change", e => {
			// Was changed using the arrows
			if(form.changeViaArrowKeys) {
				form.changeViaArrowKeys = false;
			} else {
				form.submit();
			}
		});
	}
}


if(typeof window !== "undefined" && ("customElements" in window)) {
	window.customElements.define("form-autosubmit", FormAutoSubmit);
}
