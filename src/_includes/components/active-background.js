window.customElements.define(
	"active-background",
	class extends HTMLElement {
		activate(color) {
			this.style.display = "block";
			this.style.transition = "600ms background-color";
			this.style.backgroundColor = color;
		}

		deactivate() {
			this.style.backgroundColor = "transparent";
		}

		connectedCallback() {
			for(let el of this.querySelectorAll("[data-active-background]")) {
				el.addEventListener("mouseenter", () => this.activate(el.getAttribute("data-active-background")));
				el.addEventListener("mouseleave", () => this.deactivate());

				el.addEventListener("focusin", () => this.activate(el.getAttribute("data-active-background")));
				el.addEventListener("focusout", () => this.deactivate());
			}
		}
	}
);
