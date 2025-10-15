import syntaxHighlightPlugin, { pairedShortcode as syntaxHighlightFunction } from "@11ty/eleventy-plugin-syntaxhighlight";

const WEBAWESOME_URL = "https://early.webawesome.com/webawesome@3.0.0-beta.6/dist/components/copy-button/copy-button.js";

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlightPlugin, {
		lineSeparator: "\n",
		preAttributes: {
			tabindex: "0",
		},
		init: function ({ Prism }) {
			Prism.languages.markdown = Prism.languages.extend("markup", {
				frontmatter: {
					pattern: /^---[\s\S]*?^---$/m,
					greedy: true,
					inside: Prism.languages.yaml,
				},
			});
		},
	});

	let highlightCounter = 0;
	eleventyConfig.on("eleventy.before", () => {
		highlightCounter = 0;
	});

	eleventyConfig.addFilter("highlight", function(code, language, attrs = {}, options = {}) {
		let { rawMarkdown } = Object.assign({ rawMarkdown: false }, options)
		// Skip wrapper on WebC templates
		// this.page.inputPath.endsWith(".webc")
		let wrapper = Boolean(attrs?.id) ? ["", ""] : [`<div class="syntax-highlight">`, "</div>"]
		attrs.id ??=  `highlighted-source-${highlightCounter++}`;

		let ticks = rawMarkdown ? "````" : "```";

		if(this.page.inputPath.endsWith(".md")) {
			// Markdown requires special care so that new lines in code blocks aren’t converted to paragraphs (we’ll pass the buck to the markdown syntax highlighter)
			return `${wrapper[0]}<is-land on:visible>
<wa-copy-button from="${attrs.id}" tooltip-placement="left"></wa-copy-button>
<template data-island>
	<script type="module">
	import "${WEBAWESOME_URL}";
	document.querySelector("wa-copy-button[from='${attrs.id}']")?.closest(".syntax-highlight").querySelector("pre").setAttribute("id", "${attrs.id}");
	</script>
</template>
</is-land>

${ticks}${language}
${code.trim()}
${ticks}

${wrapper[1]}`;
		}

		let highlightedCode = syntaxHighlightFunction(code, language, options.lineHighlights || "", {
			lineSeparator: "\n",
			preAttributes: attrs,
		});

		return `${wrapper[0]}<is-land on:visible>
<wa-copy-button from="${attrs.id}" tooltip-placement="left"></wa-copy-button>
<template data-island="once"><script type="module" src="${WEBAWESOME_URL}"${this.page.inputPath.endsWith(".webc") ? " webc:keep" : ""}></script></template>
</is-land>${highlightedCode}${wrapper[1]}`;
	});
};
