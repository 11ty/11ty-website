class HtmlFetch extends HTMLElement {
	static tagName = "html-fetch";

	constructor() {
		super();

		this.attrs = {
			src: "src"
		};
	}

	async connectedCallback() {
		await this.fetch()
	}

	getTarget() {
		let targetAttr = this.getAttribute("target");
		if(targetAttr) {
			let target = this.closest(targetAttr);
			if(target) {
				return target;
			}
		}

		return this;
	}

	async fetch(url) {
		if (!("fetch" in window)) {
			return;
		}

		try {
			let targetUrl = this.getAttribute(this.attrs.src);
			let response = await fetch(targetUrl)
			let text = await response.text();

			// remove attribute so we don’t reprocess it
			this.removeAttribute(this.attrs.src);

			this.getTarget().innerHTML = text;
		} catch(e) {
			console.log("html-fetch failed", e);
		}
	}
}

// Should this auto define? Folks can redefine later using { component } export
if("customElements" in window) {
	customElements.define(HtmlFetch.tagName, HtmlFetch);
}

