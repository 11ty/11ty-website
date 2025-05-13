//! <eleventy-ide>
const css = String.raw;

import { Eleventy } from "/js/eleventy.core.browser.js";
import { Markdown } from "/js/eleventy.engine-md.browser.js";
import { Liquid } from "/js/eleventy.engine-liquid.browser.js";
// import { Nunjucks } from "/js/eleventy.engine-njk.browser.js";

class Ide extends HTMLElement {
	#engines = {};

	static tagName = "eleventy-ide";

	static define(registry = window.customElements) {
    if(!registry.get(this.tagName)) {
      // Support: customElements Chrome 54 Firefox 63 Safari 10.1
      registry.define(this.tagName, this);
    }
  }

	static style = css`
:host {
	position: relative;
	display: flex;
	min-height: 12em;
}
:host > * {
	flex-grow: 1;
}
textarea {
	font-size: inherit;
	font-family: Roboto Mono, monospace;
	min-height: 100%;
	resize: vertical;
	padding: .5em;
}
iframe {
	border: 1px solid #ddd;
}
.error {
	position: absolute;
	background-color: rgba(255,0,0,.9);
	color: #fff;
}
.error:not(:empty) {
	left: 0;
	right: 0;
	bottom: 0;
	translate: 0 100%;
	padding: .5em;
	border-radius: 0 0 .25em .25em;
}
`;

	async getRenderedContent(templateContent) {
		let engines = this.#engines;
		let elev = new Eleventy(undefined, undefined, {
			config(eleventyConfig) {
				eleventyConfig.addEngine("liquid", Liquid);
				eleventyConfig.addEngine("md", Markdown);

				// TODO make this default in Core (not Eleventy.js)
				// eleventyConfig.setMarkdownTemplateEngine(false);
				// eleventyConfig.setHtmlTemplateEngine(false);

				eleventyConfig.setTemplateFormats("md");
				eleventyConfig.addTemplate("index.md", templateContent);
			}
		});

		let json = await elev.toJSON();
		return json?.[0]?.content;
	}

	get errorEl() {
		return this.shadowRoot.querySelector(".error");
	}

	get inputEl() {
		return this.shadowRoot.querySelector("textarea");
	}

	get outputEl() {
		return this.shadowRoot.querySelector("iframe");
	}

	setErrorMessage(msg) {
		if(msg) {
			this.classList.add("error");
			this.errorEl.textContent = msg;
		} else {
			this.classList.remove("error");
			this.errorEl.textContent = "";
		}
	}

	async render() {
		try {
			let content = await this.getRenderedContent(this.inputEl.value);
			requestAnimationFrame(() => this.outputEl.setAttribute("srcdoc", content));
			this.setErrorMessage();
		} catch(e) {
			this.setErrorMessage( e.originalError?.message );
		}
	}

	async connectedCallback() {
		if (!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
			return;
		}

		let shadowroot = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(Ide.style);
		shadowroot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");
		template.innerHTML = `<textarea class="editor"></textarea><iframe class="output"></iframe><output class="error"></output>`;
		shadowroot.appendChild(template.content.cloneNode(true));

		let originalInput = this.querySelector("textarea");
		this.inputEl.value = originalInput?.value;
		originalInput.remove();

		await this.render();

		this.inputEl.addEventListener("input", async () => {
			await this.render();
		});
	}
}

if(!(new URL(import.meta.url)).searchParams.has("nodefine")) {
  Ide.define();
}
