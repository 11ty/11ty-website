//! <eleventy-editor>
const css = String.raw;

// TODO show output files (tabs: Rendered | View Source)
// TODO dynamic selection of engine
// TODO one Eleventy build can run multiple editors??

import { Eleventy } from "/js/eleventy.core.browser.js";
import { Markdown } from "/js/eleventy.engine-md.browser.js";
import { Liquid } from "/js/eleventy.engine-liquid.browser.js";
// import { Nunjucks } from "/js/eleventy.engine-njk.browser.js";

class Editor extends HTMLElement {
	#engines = {};

	static classes = {};

	static attrs = {
		focusOnInit: "focus"
	};

	static tagName = "eleventy-editor";

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
	border-radius: .3em;
	overflow: clip;
	margin: 1em -1rem;
}
:host:has(:focus, :focus-visible) {
	outline: 3px solid #03a9f4;
}
:host > * {
	flex-grow: 1;
	flex-basis: 12em;
	min-height: 10em;
}
:host > div {
	position: relative;
}
.input {
	flex-grow: 2;
	font-size: inherit;
	font-family: Roboto Mono, monospace;
	resize: vertical;
	padding: .75rem .75rem .75rem 1rem;
	line-height: 1.5;
	background-color: #272822;
	color: #fff;
	border: none;
	box-sizing: border-box;
}
.output {
	display: block;
	border: none;
	width: 100%;
	height: 100%;
	padding: .5em;
	background-color: #f4f4f4;
	box-sizing: border-box;
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

	getSourceContent() {
		return this.querySelector("pre")?.innerText;
	}

	setOutput(content) {
		// this.outputEl.setAttribute("srcdoc", content);
		this.outputEl.innerHTML = content;
	}

	sizeInputToContent() {
		this.inputEl.style.minHeight = "";
		requestAnimationFrame(() => {
			this.inputEl.style.minHeight = `${this.inputEl.scrollHeight}px`;
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

		let sourceContent = this.getSourceContent();

		let shadowroot = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(Editor.style);
		shadowroot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");
		template.innerHTML = `<textarea class="input"></textarea><div><output class="output"></output><output class="error"></output></div>`;
		shadowroot.appendChild(template.content.cloneNode(true));

		this.inputEl.value = sourceContent;

		this.sizeInputToContent();
		await this.render();

		this.inputEl.addEventListener("input", async () => {
			this.sizeInputToContent();
			await this.render();
		});

		if(this.hasAttribute(Editor.attrs.focusOnInit)) {
			this.inputEl.focus({
				preventScroll: true,
			});
		}
	}
}

if(!(new URL(import.meta.url)).searchParams.has("nodefine")) {
  Editor.define();
}
