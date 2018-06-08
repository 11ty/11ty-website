const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const CleanCSS = require("clean-css");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlightPlugin);
	eleventyConfig.addPlugin(rssPlugin);

	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");

	eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addFilter("sortMenu", function(collection, sortOrder) {
		if(!sortOrder) {
			return collection;
		}

		let order = sortOrder.map(path => `./docs/${path}.md`);

		return collection.sort(function(a, b) {
			let firstIndex = order.indexOf(a.inputPath);
			let secondIndex = order.indexOf(b.inputPath);

			if( firstIndex === -1 ) return 1;
			if( secondIndex === -1 ) return -1;

			return firstIndex - secondIndex;
		});
	});

	eleventyConfig.addFilter("version", function(pkgVersion) {
		if(pkgVersion.indexOf("file:") === 0) {
			return "Local";
		}
		if(pkgVersion.indexOf("^") === 0) {
			return "v" + pkgVersion.substr(1);
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

	eleventyConfig.addCollection("quicktipssorted", function(collection) {
		return collection.getFilteredByTag("quicktips").sort(function(a, b) {
			return parseInt(a.data.tipindex, 10) - parseInt(b.data.tipindex, 10);
		});
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
		level: [1,2,3,4]
	};

	eleventyConfig.setLibrary("md", markdownIt(options).use(markdownItAnchor, opts));

	return {
		templateFormats: ["html", "njk", "md"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk"
	};
};