//! <eleventy-ide>
const css = String.raw;

import { Eleventy } from "/js/eleventy.core.browser.js";
import { Markdown } from "/js/eleventy.engine-md.browser.js";
import { Liquid } from "/js/eleventy.engine-liquid.browser.js";
// import { Nunjucks } from "/js/eleventy.engine-njk.browser.js";

class Ide extends HTMLElement {
	#engines = {};

	static classes = {};

	static tagName = "eleventy-ide";

	static define(registry = window.customElements) {
    if(!registry.get(this.tagName)) {
      // Support: customElements Chrome 54 Firefox 63 Safari 10.1
      registry.define(this.tagName, this);
    }
  }

	static style = css`
:host {
	display: flex;
	flex-wrap: wrap;
	border-radius: .5em;
	border: 1px solid #eee;
	overflow: clip;
}
:host:has(:focus, :focus-visible) {
	outline: 3px solid #03a9f4;
}
:host > * {
	flex-grow: 1;
	flex-basis: 12em;
	min-height: 12em;
}
:host > div {
	position: relative;
}
.input {
	font-size: inherit;
	font-family: Roboto Mono, monospace;
	resize: vertical;
	padding: .5em;
	background-color: #222;
	color: #fff;
	border: none;
	box-sizing: border-box;
	box-shadow: inset 0 0 .25em 0 #666;
}
.output {
	border: none;
	width: 100%;
	height: 100%;
	padding: .5em;
}
.error {
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(255,0,0,.85);
	color: #fff;
	padding: .5em;
}
.error:empty {
	display: none;
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
		elev.disableLogger();

		let json = await elev.toJSON();
		return json?.[0]?.content;
	}

	get inputEl() {
		return this.shadowRoot.querySelector(".input");
	}

	get outputEl() {
		return this.shadowRoot.querySelector(".output");
	}

	get errorEl() {
		return this.shadowRoot.querySelector(".error");
	}

	setOutput(content) {
		// this.outputEl.setAttribute("srcdoc", content);
		this.outputEl.innerHTML = content;
	}

	sizeInputToContent() {
		this.inputEl.style.height = "";
		requestAnimationFrame(() => {
			this.inputEl.style.height = `${this.inputEl.scrollHeight}px`;
		});
	}

	async render() {
		try {
			let content = await this.getRenderedContent(this.inputEl.value);
			requestAnimationFrame(() => this.setOutput(content));
			this.errorEl.textContent = "";
		} catch(e) {
			this.errorEl.textContent = e.originalError?.message;
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
		template.innerHTML = `<textarea class="input"></textarea><div><div class="output"></div><output class="error"></output></div>`;
		shadowroot.appendChild(template.content.cloneNode(true));

		let originalInput = this.querySelector("textarea");
		this.inputEl.value = originalInput?.value;
		originalInput.remove();

		this.sizeInputToContent();
		await this.render();

		this.inputEl.addEventListener("input", async () => {
			this.sizeInputToContent();
			await this.render();
		});
	}
}

if(!(new URL(import.meta.url)).searchParams.has("nodefine")) {
  Ide.define();
}
