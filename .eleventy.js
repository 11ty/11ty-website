const htmlmin = require("html-minifier");
const chalk = require("chalk");
const CleanCSS = require("clean-css");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const inclusiveLanguagePlugin = require("@11ty/eleventy-plugin-inclusive-language");
const cfg = require("./_data/config.json");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(syntaxHighlightPlugin, {
		templateFormats: "md"
	});
	eleventyConfig.addPlugin(rssPlugin);
	eleventyConfig.addPlugin(inclusiveLanguagePlugin);

	eleventyConfig.addPairedShortcode("callout", function(content, level = "warn") {
		return `<div class="elv-callout elv-callout-${level}">${content}</div>`;
	});

	eleventyConfig.addShortcode("emoji", function(emoji, alt = "") {
		return `<span aria-hidden="true">${emoji}</span>` + 
			(alt ? `<span class="sr-only">${alt}</span>` : "");
	});

	eleventyConfig.addShortcode("avatar", function(filename, linkUrl, text = "") {
		if(!filename) {
			return '<span class="avatar"></span>';
		}

		let twitterName;
		if( filename.endsWith(".jpg") || filename.endsWith(".png") ) {
			twitterName = filename.substr(0, -4);
		} else {
			twitterName = filename;
			filename += ".jpg";
		}

		return (linkUrl ? `<a href="${linkUrl}">` : "") +
			`<img src="/img/avatars/${filename}" class="avatar" alt="@${twitterName} Twitter Photo">` +
			text + 
			(linkUrl ? `</a>` : "") ;
	});

	eleventyConfig.addShortcode("codetitle", function(title, subtitle = "Filename") {
		return `<div class="codetitle"><b>${subtitle} </b>${title}</div>`;
	});

	eleventyConfig.addPairedShortcode("minilink", function(text, href) {
		return `<a href="${href}" class="minilink minilink-lower">${text}</a>`;
	});

	eleventyConfig.addShortcode("addedin", function(version, tag) {
		if( typeof version !== "string" ) {
			tag = version.tag;
			version = version.version;
		}

		tag = tag || "p";

		return `<${tag} class="minilink minilink-addedin">New in v${version}</${tag}>`;
	});

	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("favicon.ico");

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

	eleventyConfig.addShortcode("templatelangs", function(languages, page, whitelist, anchor, isinline) {
		let parentTag = isinline ? "span" : "ul";
		let childTag = isinline ? "span" : "li";

		return `<${parentTag} class="inlinelist">${languages.filter(lang => !whitelist ? true : whitelist.indexOf(lang.ext) > -1).map(lang => `<${childTag} class="inlinelist-item${page.url == lang.url ? ' active' : ''}"><a href="${lang.url}${anchor || ''}">${lang.name} (<code>.${lang.ext}</code>)</a></${childTag}>`).join(" ")}</${parentTag}>`;
	});

	eleventyConfig.addShortcode("latestVersion", function(versions, config) {
		for( let version of versions ) {
			if( version.tag === "LATEST" ) {
				continue;
			}
			if( !config.prerelease && version.prerelease ) {
				continue;
			}

			return version.tag;
		}
	});

	eleventyConfig.addFilter("orphanWrap", str => {
		let splitSpace = str.split(" ");
		let after = "";
		if( splitSpace.length > 2 ) {
			after += " ";

			// TODO strip HTML from this?
			let lastWord = splitSpace.pop();
			let secondLastWord = splitSpace.pop();

			after += `${secondLastWord}&nbsp;${lastWord}`;
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

	if( cfg.minifyHtml ) {
		eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
			if( outputPath.endsWith(".html") ) {
				let minified = htmlmin.minify(content, {
					useShortDoctype: true,
					removeComments: true,
					collapseWhitespace: true
				});
				return minified;
			}

			return content;
		});
	}

	return {
		templateFormats: ["html", "njk", "md"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: false
	};
};