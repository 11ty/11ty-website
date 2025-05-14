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

	static attrs = {
		focusOnInit: "focus",
		filename: "data-editor-filename",
	};

	static tagName = "eleventy-editor";

	static define(registry = window.customElements) {
    if(!registry.get(this.tagName)) {
      // Support: customElements Chrome 54 Firefox 63 Safari 10.1
      registry.define(this.tagName, this);
    }
  }

	static style = css`
* {
	box-sizing: border-box;
}
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
:host > :first-child {
	flex-grow: 2;
}
:host > div {
	position: relative;
}
.input,
.output {
	width: 100%;
	height: 100%;
}
.input {
	display: flex;
	font-size: inherit;
	font-family: Roboto Mono, monospace;
	resize: vertical;
	padding: .75rem .75rem .75rem 1rem;
	line-height: 1.5;
	background-color: #272822;
	color: #fff;
	border: none;
}
.output {
	display: block;
	border: none;
	padding: .5em;
	background-color: #f4f4f4;
}
.error {
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(206, 0, 0, 0.85);
	color: #fff;
	padding: .5em;
}
.error:empty {
	display: none;
}
.filename {
	position: absolute;
	top: 0;
	right: 0;
	padding: .25em .5em;
	font-size: .75em;
	font-family: Roboto Mono, monospace;
	border-bottom-left-radius: .5em;
}
.filename--input {
	color: #fff;
	background-color: rgba(0,0,0,.2);
}
.filename--output {
	color: #000;
	background-color: rgba(0,0,0,.05);
}
`;

	async getRenderedContent(templateContent, filename) {
		if(!filename) {
			throw new Error("Missing filename");
		}
		let engines = this.#engines;
		let elev = new Eleventy(undefined, undefined, {
			config(eleventyConfig) {
				eleventyConfig.addEngine("liquid", Liquid);
				eleventyConfig.addEngine("md", Markdown);

				// eleventyConfig.setMarkdownTemplateEngine(false);
				// eleventyConfig.setHtmlTemplateEngine(false);

				eleventyConfig.addTemplate(filename, templateContent);
			}
		});
		elev.disableLogger();

		let json = await elev.toJSON();
		let [result] = json;

		this.outputFilenameEl.textContent = result?.outputPath;
		return result?.content;
	}

	get sourceEl() {
		return this.querySelector("pre");
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

	get inputFilenameEl() {
		return this.shadowRoot.querySelector(".filename--input");
	}

	get outputFilenameEl() {
		return this.shadowRoot.querySelector(".filename--output");
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

	getInputFilename() {
		return this.sourceEl?.closest(`[${Editor.attrs.filename}]`)?.getAttribute(Editor.attrs.filename);
	}

	async render() {
		try {
			let filename = this.getInputFilename();
			let content = await this.getRenderedContent(this.inputEl.value, filename);
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

		// must come before shadowRoot attach
		let sourceContent = this.sourceEl?.innerText;

		let shadowroot = this.attachShadow({ mode: "open" });
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(Editor.style);
		shadowroot.adoptedStyleSheets = [sheet];

		let template = document.createElement("template");
		template.innerHTML = `<div>
	<textarea class="input"></textarea>
	<output class="filename filename--input"></output>
</div>
<div>
	<output class="output"></output>
	<output class="filename filename--output"></output>
	<output class="error"></output>
</div>`;
		shadowroot.appendChild(template.content.cloneNode(true));

		this.inputEl.value = sourceContent;
		let inputFilename = this.getInputFilename();
		if(inputFilename) {
			this.inputFilenameEl.textContent = inputFilename;
		}

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
