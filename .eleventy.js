const { DateTime } = require("luxon");
const HumanReadable = require("human-readable-numbers");
const markdownIt = require("markdown-it");
const loadLanguages = require("prismjs/components/");

const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const navigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const addedInLocalPlugin = require("./config/addedin");
const minificationLocalPlugin = require("./config/minification");

const cfg = require("./_data/config.js");
const slugify = require('slugify');

// Load yaml from Prism to highlight frontmatter
loadLanguages(['yaml']);

const shortcodes = {
	avatarlocalcache: function(datasource, slug, alt = "") {
		const avatarMap = require(`./_data/avatarmap/${datasource}.json`);
		if( slug ) {
			let mapEntry = avatarMap[slug.toLowerCase()];
			if(mapEntry && mapEntry.length) {
				let ret = [];
				if( mapEntry.length >= 2 ) {
					ret.push("<picture>");
					ret.push(`<source srcset="/${mapEntry[0].path}" type="image/${mapEntry[0].path.split(".").pop()}">`);
				}
				ret.push(`<img src="${ "/" + mapEntry[mapEntry.length - 1].path }" alt="${alt || `${slug}’s ${datasource} avatar`}" loading="lazy" class="avatar">`);
				if( mapEntry.length >= 2 ) {
					ret.push("</picture>");
				}
				return ret.join("");
			}
		}

		return `<img src="/img/default-avatar.png" alt="${alt}" loading="lazy" class="avatar">`;
	},
	link: function(linkUrl, content) {
		return (linkUrl ? `<a href="${linkUrl}">` : "") +
			content +
			(linkUrl ? `</a>` : "");
	}
};

module.exports = function(eleventyConfig) {
	eleventyConfig.setDataDeepMerge(true);
	if(!process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.setQuietMode(true);
	}

	eleventyConfig.setBrowserSyncConfig({
		ui: false,
		ghostMode: false
	});

	eleventyConfig.addPlugin(syntaxHighlightPlugin, {
		templateFormats: ["md", "njk"],
		init: function({ Prism }) {
			Prism.languages.markdown = Prism.languages.extend('markup', {
				'frontmatter': {
					pattern: /^---[\s\S]*?^---$/m,
					greedy: true,
					inside: Prism.languages.yaml
				}
			});
		}
	});
	eleventyConfig.addPlugin(rssPlugin) ;
	eleventyConfig.addPlugin(navigationPlugin);
	eleventyConfig.addPlugin(addedInLocalPlugin);
	eleventyConfig.addPlugin(minificationLocalPlugin);

	eleventyConfig.addCollection("sidebarNav", function(collection) {
		// filter out excludeFromSidebar options
		return collection.getAll()
			.filter(item => (item.data || {}).excludeFromSidebar !== true);
	});

	let md = new markdownIt();
	eleventyConfig.addPairedShortcode("callout", function(content, level = "warn", format = "html") {
		if( format === "md" ) {
			content = md.renderInline(content);
		}
		return `<div class="elv-callout elv-callout-${level}">${content}</div>`;
	});

	eleventyConfig.addShortcode("emoji", function(emoji, alt = "") {
		return `<span aria-hidden="true" class="emoji">${emoji}</span>` +
			(alt ? `<span class="sr-only">${alt}</span>` : "");
	});

	eleventyConfig.addShortcode("avatarlocalcache", shortcodes.avatarlocalcache);

	eleventyConfig.addShortcode("codetitle", function(title, heading = "Filename") {
		return `<div class="codetitle codetitle-left"><b>${heading} </b>${title}</div>`;
	});

	eleventyConfig.addPairedShortcode("minilink", function(text, href) {
		return `<a href="${href}" class="minilink minilink-lower">${text}</a>`;
	});

	eleventyConfig.addPairedShortcode("codewithprompt", function(text, prePrefixCode, when) {
		return `<div data-preprefix-${prePrefixCode}="${when}">

\`\`\`bash/-
${text.trim()}
\`\`\`

</div>`;
	});

	eleventyConfig.addPassthroughCopy({
		"node_modules/instant.page/instantpage.js": "js/instant.page.js",
		"node_modules/@11ty/logo/img/logo.svg": "img/logo.svg",
		"node_modules/@11ty/logo/img/logo-784x1093.png": "img/logo.png",
		"node_modules/@11ty/logo/img/logo-300x418.png": "img/logo-github.png",
		"node_modules/@11ty/logo/img/logo-96x96.png": "img/favicon.png"
	});

	eleventyConfig.addPassthroughCopy("netlify-email");
	eleventyConfig.addPassthroughCopy("css/fonts");
	eleventyConfig.addPassthroughCopy("img");
	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.addFilter("toJSON", function(obj) {
		return JSON.stringify(obj);
	});

	eleventyConfig.addFilter("toSearchEntry", function(str) {
		// <a class="direct-link" href="#eleventy-is-supported-financially-by-the-following-lovely-people" title="Direct link to this heading">#</a>
		return str.replace(/<a class="direct-link"[^>]*>#<\/a\>/g, "");
	});

	eleventyConfig.addFilter("humanReadableNum", function(num) {
		return HumanReadable.toHumanString(num);
	});

	eleventyConfig.addShortcode("templatelangs", function(languages, page, whitelist, anchor, isinline) {
		let parentTag = isinline ? "span" : "ul";
		let childTag = isinline ? "span" : "li";

		return `<${parentTag} class="inlinelist">${languages.filter(lang => !whitelist ? true : whitelist.indexOf(lang.ext) > -1).map(lang => `<${childTag} class="inlinelist-item${page.url == lang.url ? ' active' : ''}"><a href="${lang.url}${anchor || ''}">${lang.name} <code>*.${lang.ext}</code></a></${childTag}>`).join(" ")}</${parentTag}>`;
	});

	eleventyConfig.addShortcode("latestVersion", function(versions, config, prefix = "v") {
		for( let version of versions ) {
			if( version.tag === "LATEST" ) {
				continue;
			}
			if( !config.prerelease && version.prerelease ) {
				continue;
			}

			return prefix + version.tag.substr(1);
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

	function randomizeArray(arr) {
		let a = arr.slice(0);
		for (let i = a.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("shuffle", arr => {
		if( Array.isArray(arr) ) {
			return randomizeArray(arr);
		}

		let keys = randomizeArray(Object.keys(arr));
		let a = {};
		for(let key of keys) {
			a[key] = arr[key];
		}
		return a;
	});

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("randompick", arr => {
		if( Array.isArray(arr) ) {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		let randkey = Object.keys(arr)[Math.floor(Math.random() * arr.length)];
		return arr[randkey]
	});

	eleventyConfig.addFilter("getsize", arr => {
		if( Array.isArray(arr) ) {
			return arr.length
		}

		return Object.keys(arr).length;
	});

	eleventyConfig.addShortcode("addToSampleSites", function() {
		return `<a href="https://github.com/11ty/11ty-website/issues/new/choose"><strong>Want to add your site to this list?</strong></a>`;
	});

	eleventyConfig.addCollection("quicktipssorted", function(collection) {
		return collection.getFilteredByTag("quicktips").sort(function(a, b) {
			return parseInt(a.data.tipindex, 10) - parseInt(b.data.tipindex, 10);
		});
	});

	eleventyConfig.addShortcode("testimonial", function(testimonial) {
		return `<blockquote><p>${!testimonial.indirect ? `“` : ``}${testimonial.text}${!testimonial.indirect ? `” <span class="bio-source">—${shortcodes.link(testimonial.source, shortcodes.avatarlocalcache("twitter", testimonial.twitter, `${testimonial.name}’s Twitter Photo`) + testimonial.name)}</span>` : ``}</p></blockquote>`;
	});

	eleventyConfig.addShortcode("supporterAmount", function(amount, maxAmount = 1000) {
		// let increments = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987];
		// mostly fibonacci
		let increments = [5,8,13,21,34,55,89,144,233,377,610,987,1597];
		let incrementCounter = 0;
		let fullHearts = [];
		let emptyHearts = [];
		let j = 0;
		for( let k = amount; j <= k; j+= increments[incrementCounter]) {
			fullHearts.push("🎈");
			incrementCounter++;
		}
		for(; j <= maxAmount; j+= increments[incrementCounter]) {
			emptyHearts.push("🎈");
			incrementCounter++;
		}
		return `${fullHearts.join("")}<span class="supporters-hearts-empty">${emptyHearts.join("")}</span>`;
	});

	/* Markdown */
	let markdownItAnchor = require("markdown-it-anchor");
	let markdownItToc = require("markdown-it-table-of-contents");

	function removeExtraText(s) {
		let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "");
		newStr = newStr.replace(/⚠️/g, "");
		newStr = newStr.replace(/[?!]/g, "");
		newStr = newStr.replace(/<[^>]*>/g, "");
		return newStr;
	}

	function markdownItSlugify(s) {
		return slugify(removeExtraText(s), { lower: true, remove: /[:’'`,]/g });
	}

	let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.use(markdownItAnchor, {
		permalink: true,
		slugify: markdownItSlugify,
		permalinkBefore: false,
		permalinkClass: "direct-link",
		permalinkSymbol: "#",
		level: [1,2,3,4]
	})
	.use(markdownItToc, {
		includeLevel: [2, 3],
		slugify: markdownItSlugify,
		format: function(heading) {
			return removeExtraText(heading);
		},
		transformLink: function(link) {
			// remove backticks from markdown code
			return link.replace(/\%60/g, "");
		}
	});

	mdIt.linkify.tlds('.io', false);
	eleventyConfig.setLibrary("md", mdIt);

	eleventyConfig.addFilter("newsDate", dateObj => {
		return DateTime.fromJSDate(dateObj).toFormat("yyyy LLLL dd");
	});

	// Until https://github.com/valeriangalliat/markdown-it-anchor/issues/58 is fixed
	eleventyConfig.addTransform("remove-aria-hidden-markdown-anchor", function(content, outputPath) {
		if( outputPath && outputPath.endsWith(".html") ) {
			return content.replace(/ aria\-hidden\=\"true\"\>\#\<\/a\>/g, ` title="Direct link to this heading">#</a>`);
		}

		return content;
	});

	return {
		templateFormats: ["html", "njk", "md", "11ty.js"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: false
	};
};
