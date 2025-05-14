//! <eleventy-editor>
const css = String.raw;

// TODO show output files (tabs: Rendered | View Source)
// TODO dynamic selection of engine
// TODO one Eleventy build can run multiple editors??
// TODO set input font to match original <pre>

import { Eleventy } from "/js/eleventy.core.browser.js";
import { Markdown } from "/js/eleventy.engine-md.browser.js";
import { Liquid } from "/js/eleventy.engine-liquid.browser.js";
// import { Nunjucks } from "/js/eleventy.engine-njk.browser.js";

class Editor extends HTMLElement {
	#engines = {};

	static classes = {
		plaintext: "output--text"
	};

	static attrs = {
		focusOnInit: "focus",
		filename: "data-editor-filename",
	};

	static tagName = "eleventy-editor";

	static define(registry = window.customElements) {
    if(!registry.get(this.tagName)) {
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
	flex-basis: 16em;
}
:host > div {
	position: relative;
}
.input,
.output {
	width: 100%;
	height: 100%;
}
.output {
	height: calc(100% - 1.625rem);
}
.input,
.output--text {
	display: flex;
	font-size: inherit;
	font-family: Roboto Mono, monospace;
	padding: .75rem .75rem .75rem 1rem;
	line-height: 1.5;
	border: none;
}
.output--text {
	white-space: pre;
	overflow: auto;
}
.input {
	background-color: #272822;
	color: #fff;
	resize: vertical;
	white-space: pre-wrap;
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
	right: 0;
	top: 0;
	background-color: rgba(206, 0, 0, 0.85);
	color: #fff;
	padding: .5em;
	max-height: 100%;
	overflow: auto;
}
.error:empty,
.filename:empty {
	display: none;
}
.filename--input,
.toolbar,
.output--text {
	font-size: 0.875rem; /* 14px /16 */
	font-family: Roboto Mono, monospace;
	line-height: 1.428571428571; /* 20px /14 */
}
.toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #000;
	background-color: rgba(0,0,0,.15);
	white-space: nowrap;
}
.filename {
	padding: 0.21428571em .5em;
}
.filename--input {
	position: absolute;
	top: 0;
	right: 0;
	color: #fff;
	background-color: #000;
	border-bottom-left-radius: .5em;
}
.filename--output {
	overflow: hidden;
	text-overflow: ellipsis;
}
.viewsource {
	display: flex;
	align-items: center;
	font-size: 0.75rem; /* 12px /16 */
	margin-inline: .5em;
}
`;

	async getRenderedContent(templateContent, filename) {
		if(!filename) {
			throw new Error("Missing `input` filename for Eleventy editor. Try setting the " + Editor.attrs.filename + " attribute on the <pre> input.");
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

		this.outputFilenameEl.innerHTML = typeof result?.outputPath === "string" ? result?.outputPath : "<em>(output skipped)</em>";

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

	get viewSourceEl() {
		return this.shadowRoot.querySelector(".viewsource input[type='checkbox']")
	}

	setOutput(content) {
		this.sizeOutput();

		if(this.viewSourceEl.checked) {
			this.outputEl.textContent = content;
			this.outputEl.classList.add(Editor.classes.plaintext);
		} else {
			this.outputEl.innerHTML = content;
			this.outputEl.classList.remove(Editor.classes.plaintext);
		}
	}

	sizeInputToContent() {
		this.inputEl.style.minHeight = "";
		requestAnimationFrame(() => {
			this.inputEl.style.minHeight = `${this.inputEl.scrollHeight}px`;
		});
	}

	sizeOutput() {
		this.outputEl.style.maxWidth = `${this.outputEl.offsetWidth}px`;
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
			this.errorEl.textContent = e.originalError?.message || e.message;
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
	<div class="filename filename--input"></div>
</div>
<div>
	<div class="toolbar">
		<div class="filename filename--output"></div>
		<label class="viewsource"><input type="checkbox">View Source</label>
	</div>
	<output class="output"></output>
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
		this.viewSourceEl.addEventListener("input", async () => {
			await this.render();
		});

		// Remove max-width on resize
		let cachedWidth;
		(new ResizeObserver((entries) => {
			let [entry] = entries;
			if(entry?.contentRect?.width) {
				if(cachedWidth !== entry?.contentRect?.width) {
					this.outputEl.style.maxWidth = "";
				}
				cachedWidth = entry?.contentRect?.width;
			}
		})).observe(this);


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
