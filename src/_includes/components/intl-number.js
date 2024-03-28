class NumberFormat extends HTMLElement {
	static tagName = "intl-number";

	async connectedCallback() {
		let original = this.textContent;
		let next = new Intl.NumberFormat().format(original.replace(/[^0-9]/gi, ""));

		if (original !== next) {
			this.setAttribute("value", original);
			this.textContent = next;
		}
	}
}

if ("customElements" in window) {
	customElements.define(NumberFormat.tagName, NumberFormat);
}
