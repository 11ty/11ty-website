const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlight);

	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");

	eleventyConfig.addCollection("mainDocs", function(collection) {
		let order = [
			"overview",
			"getting-started",
			"tutorials",
			"versions",
		].map(file => `./docs/${file}.md`);

		return collection.getFilteredByTag("docs").sort(function(a, b) {
			let firstIndex = order.indexOf(a.inputPath);
			let secondIndex = order.indexOf(b.inputPath);

			if( firstIndex === -1 ) return 1;
			if( secondIndex === -1 ) return -1;

			return firstIndex - secondIndex;
		});
	});

	eleventyConfig.addFilter("version", function(pkgVersion) {
		if(pkgVersion.indexOf("file:") === 0) {
			return "(local)";
		}
		if(pkgVersion.indexOf("^") === 0) {
			return pkgVersion.substr(1);
		}
		return pkgVersion;
	});

	eleventyConfig.addFilter("orphanWrap", str => {
		let splitSpace = str.split(" ");
		let after = "";
		if( splitSpace.length > 2 ) {
			after += " ";

			// TODO strip HTML from this?
			let lastWord = splitSpace.pop();
			let secondLastWord = splitSpace.pop();

			after += `<span class="prevent-orphan">${secondLastWord} ${lastWord}</span>`;
		}

		return splitSpace.join(" ") + after;
	});

	/* Markdown */
	let markdownIt = require("markdown-it");
	let markdownItAnchor = require("markdown-it-anchor");
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};
	let opts = {
		permalink: true,
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3]
	};

	eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));

	return {
		templateFormats: ["html", "njk", "md"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk"
	};
};