import syntaxHighlightPlugin, { pairedShortcode as syntaxHighlightFunction } from "@11ty/eleventy-plugin-syntaxhighlight";

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
		let { rawMarkdown, copyButtonEnabled } = Object.assign({
			rawMarkdown: false,
			copyButtonEnabled: true
		}, options);

		// Skip wrapper on WebC templates (already includes <syntax-highlight>)
		let [openTag, closeTag] = Boolean(attrs?.id) ? ["", ""] : [`<div class="syntax-highlight">`, "</div>"]
		attrs.id ??=  `highlighted-source-${highlightCounter++}`;

		let preamble = `${copyButtonEnabled ? `<is-land on:visible>
<wa-copy-button from="${attrs.id}" tooltip-placement="left"></wa-copy-button>
<template data-island="once"><script type="module" src="/js/copy-button.js"${this.page.inputPath.endsWith(".webc") ? " webc:keep" : ""}></script></template>
</is-land>` : ""}`;

		if(this.page.inputPath.endsWith(".md")) {
			let ticks = rawMarkdown ? "````" : "```";

			// Markdown requires special care so that new lines in code blocks aren’t converted to paragraphs (we’ll pass the buck to the markdown syntax highlighter)
			return `${openTag}${preamble}

${ticks}${language}
${code.trim()}
${ticks}

${closeTag}`;
		}

		let highlightedCode = syntaxHighlightFunction(code, language, options.lineHighlights || "", {
			lineSeparator: "\n",
			preAttributes: attrs,
		});

		return `${openTag}${preamble}${highlightedCode}${closeTag}`;
	});
};
