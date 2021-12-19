require("dotenv").config();

const { DateTime } = require("luxon");
const HumanReadable = require("human-readable-numbers");
const commaNumber = require("comma-number");
const markdownIt = require("markdown-it");
const loadLanguages = require("prismjs/components/");
const slugify = require("slugify");
const fs = require("fs-extra");
const lodashGet = require("lodash/get");
const shortHash = require("short-hash");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");

const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const navigationPlugin = require("@11ty/eleventy-navigation");
const rssPlugin = require("@11ty/eleventy-plugin-rss");
const eleventyImage = require("@11ty/eleventy-img");

const monthDiffPlugin = require("./config/monthDiff.js");
const addedInLocalPlugin = require("./config/addedin.js");
const minificationLocalPlugin = require("./config/minification.js");
const getAuthors = require("./config/getAuthorsFromSites.js");
const cleanName = require("./config/cleanAuthorName.js");
const objectHas = require("./config/object-has.js");
// const HitsDb = require("./config/hits-db.js");

// Load yaml from Prism to highlight frontmatter
loadLanguages(['yaml']);

let defaultAvatarHtml = `<img src="/img/default-avatar.png" alt="Default Avatar" loading="lazy" decoding="async" class="avatar" width="200" height="200">`;
const shortcodes = {
	avatar: function(datasource, slug, alt = "") {
		if(!slug) {
			return defaultAvatarHtml;
		}

		slug = cleanName(slug).toLowerCase();

		try {
			let mapEntry = Object.assign({}, require(`./avatars/${datasource}/${slug}.json`));
			delete mapEntry.slug; // dunno why the slug is saved here ok bye

			return eleventyImage.generateHTML(mapEntry, {
				alt: `${alt || `${slug}’s ${datasource} avatar`}`,
				loading: "lazy",
				decoding: "async",
				class: "avatar",
			});
		} catch(e) {
			return defaultAvatarHtml;
		}
	},
	link: function(linkUrl, content) {
		return (linkUrl ? `<a href="${linkUrl}">` : "") +
			content +
			(linkUrl ? `</a>` : "");
	},
	image: async function(filepath, alt, widths, classes, sizes) {
		let options = {
			formats: ["avif", "webp", "png"],
			widths: widths || [null],
			urlPath: "/img/built/",
			outputDir: "_site/img/built/",
		};

		let stats;
		if(process.env.ELEVENTY_SERVERLESS) {
			stats = eleventyImage.statsSync(filepath, options);
		} else {
			stats = await eleventyImage(filepath, options);
		}

		return eleventyImage.generateHTML(stats, {
			alt,
			loading: "lazy",
			decoding: "async",
			sizes: sizes || "(min-width: 22em) 30vw, 100vw",
			class: classes,
		});
	},
	getScreenshotHtml: function(siteSlug, siteUrl, sizes) {
		let viewport = {
			width: 375,
			height: 375,
		};

		let screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(siteUrl)}/small/`;

		if(siteSlug === "11ty" || siteSlug === "foursquare") {
			screenshotUrl = `/img/screenshot-fallbacks/${siteSlug}.jpg`;
		}

		let options = {
			formats: ["jpeg"], // we don’t use AVIF here because it was a little too slow!
			widths: [null], // 260-440 in layout
			urlFormat: function() {
				return screenshotUrl;
			}
		};

		let stats = eleventyImage.statsByDimensionsSync(screenshotUrl, viewport.width, viewport.height, options);

		return eleventyImage.generateHTML(stats, {
			alt: `Screenshot of ${siteUrl}`,
			loading: "lazy",
			decoding: "async",
			sizes: sizes || "(min-width: 22em) 30vw, 100vw",
			class: "sites-screenshot",
			// No longer necessary because we have a default fallback image when timeouts happen.
			// onerror: "let p=this.closest('picture');if(p){p.remove();}this.remove();"
		});
	}
};

module.exports = function(eleventyConfig) {
	eleventyConfig.setDataDeepMerge(true);
	if(process.env.NODE_ENV !== "production") {
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

	eleventyConfig.addPlugin(rssPlugin);
	eleventyConfig.addPlugin(navigationPlugin);
	eleventyConfig.addPlugin(addedInLocalPlugin);
	eleventyConfig.addPlugin(monthDiffPlugin);
	eleventyConfig.addPlugin(minificationLocalPlugin);

	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "serverless",
		inputDir: "src",
		functionsDir: "./netlify/functions/",
		redirects: "netlify-toml-builders",
		// copyEnabled: process.env.NODE_ENV === "production",
		copy: [
			"config/",
			"avatars/",
			"src/img/logo.svg",
			"src/img/gift.svg",
			"src/img/possum-geri.png",
			"_generated-serverless-collections.json",
			{ from: ".cache/eleventy-cache-assets/", to: "cache" },
		]
	});

	eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
		name: "dynamic",
		inputDir: "src",
		functionsDir: "./netlify/functions/",
		redirects: "netlify-toml-functions",
		// copyEnabled: process.env.NODE_ENV === "production",
		copy: [
			"config/",
			"avatars/",
			"src/img/logo.svg",
			"src/img/gift.svg",
			"src/img/possum-geri.png",
			"_generated-serverless-collections.json",
			{ from: ".cache/eleventy-cache-assets/", to: "cache" },
		]
	});

	eleventyConfig.addCollection("sidebarNav", function(collection) {
		// filter out excludeFromSidebar options
		return collection.getAll()
			.filter(item => (item.data || {}).excludeFromSidebar !== true);
	});

	eleventyConfig.addShortcode("indieweblink", function(content, url) {
		if(!url) {
			return content;
		}

		let imgHtml = "";
		if(!url.startsWith("/")) {
			imgHtml = `<img src="https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(url)}/" width="150" height="150" alt="IndieWeb Avatar for ${url}" class="avatar avatar-large avatar-indieweb" loading="lazy" decoding="async">`;
		}
		return `<a href="${url}">${imgHtml}${content}</a>`;
	});

	eleventyConfig.addShortcode("emoji", function(emoji, alt = "") {
		return `<span aria-hidden="true" class="emoji">${emoji}</span>` +
			(alt ? `<span class="sr-only">${alt}</span>` : "");
	});

	eleventyConfig.addNunjucksAsyncShortcode("image", shortcodes.image);
	eleventyConfig.addShortcode("avatarlocalcache", shortcodes.avatar);
	eleventyConfig.addShortcode("getScreenshotHtml", shortcodes.getScreenshotHtml);

	eleventyConfig.addShortcode("codetitle", function(title, heading = "Filename") {
		return `<div class="codetitle codetitle-left"><b>${heading} </b>${title}</div>`;
	});

	eleventyConfig.addPairedShortcode("minilink", function(text, href) {
		return `<a href="${href}" class="minilink minilink-lower">${text}</a>`;
	});

	eleventyConfig.addPairedShortcode("codewithprompt", function(text, prePrefixCode, when) {
		let ret = [];
		if(prePrefixCode && when) {
			ret.push(`<div data-preprefix-${prePrefixCode}="${when}">
`);
		}

		ret.push(`\`\`\`bash/-
${text.trim()}
\`\`\``);

		if(prePrefixCode && when) {
			ret.push(`
</div>`);
		}

		return ret.join("\n");
	});

	eleventyConfig.addPassthroughCopy({
		// "node_modules/@11ty/logo/img/logo.svg": "img/logo.svg",
		"node_modules/@11ty/logo/img/logo-784x1093.png": "img/logo.png",
		"node_modules/@11ty/logo/img/logo-300x418.png": "img/logo-github.png",
		"node_modules/@11ty/logo/img/logo-96x96.png": "img/favicon.png"
	});

	eleventyConfig.addPassthroughCopy("netlify-email");
	// eleventyConfig.addPassthroughCopy("css/fonts"); // these are inline now
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/blog/*.png");
	eleventyConfig.addPassthroughCopy("src/favicon.ico");

	eleventyConfig.addFilter("lighthouseGoodDataCheck", function(data) {
		return !!data && !("error" in data);
	});

	eleventyConfig.addFilter("lighthousePerfectScore", function(data) {
		return !!data && !("error" in data) && data.lighthouse.total === 400;
	});

	eleventyConfig.addFilter("speedlifyHash", function(site) {
		if(!site || !site.url) {
			// console.log( "speedlifyHash: Missing url for", site.name );
			return;
		}
		// note that this will fail _sometimes_ because these are requestedUrl and not final URLs (speedlify uses final URLs for hashing)
		return shortHash(site.url);
	});

	eleventyConfig.addFilter("fileExists", function(url) {
		return fs.pathExistsSync(`.${url}`);
	});

	eleventyConfig.addFilter("toJSON", function(obj) {
		return JSON.stringify(obj);
	});

	eleventyConfig.addFilter("toSearchEntry", function(str) {
		return str.replace(/<a class="direct-link"[^>]*>#<\/a\>/g, "")
			.replace(/[\t]{2,}/g, "\t") // change \t\t\t\t\t\t to \t
			.replace(/[\n]{2,}/g, "\n"); // change \n\n\n\n\n to \n
	});

	eleventyConfig.addFilter("humanReadableNum", function(num) {
		return HumanReadable.toHumanString(num);
	});

	eleventyConfig.addFilter("commaNumber", function(num) {
		return commaNumber(num);
	});

	eleventyConfig.addFilter("displayPrice", function(num) {
		return parseFloat(num).toFixed(2);
	});

	eleventyConfig.addShortcode("templatelangs", function(languages, page, whitelist, anchor, isinline) {
		let parentTag = isinline ? "span" : "ul";
		let childTag = isinline ? "span" : "li";

		return `<${parentTag} class="inlinelist">${languages.filter(lang => !whitelist ? true : whitelist.indexOf(lang.ext) > -1).map(lang => `<${childTag} class="inlinelist-item${page.url == lang.url ? ' active' : ''}"><a href="${lang.url}${anchor || ''}">${lang.name}${lang.ext ? ` <code>*.${lang.ext}</code>` : ""}</a></${childTag}>`).join(" ")}</${parentTag}>`;
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
		return `<blockquote><p>${!testimonial.indirect ? `“` : ``}${testimonial.text}${!testimonial.indirect ? `” <span class="bio-source">—${shortcodes.link(testimonial.source, shortcodes.avatar("twitter", testimonial.twitter, `${testimonial.name}’s Twitter Photo`) + testimonial.name)}</span>` : ``}</p></blockquote>`;
	});

	eleventyConfig.addFilter("isBusinessPerson", function(supporter) {
		return supporter && supporter.isMonthly && supporter.amount && supporter.amount.value >= 5;
	});

	eleventyConfig.addShortcode("supporterAmount", function(amount, maxAmount = 2000) {
		// mostly fibonacci
		let increments = [5,8,13,21,34,55,89,144,233,377,610,987,1597,2584];
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

	function removeExtraText(s) {
		let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "");
		newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, "");
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
	.disable('code') // disable indent -> code block
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

	eleventyConfig.addPairedShortcode("markdown", function(content) {
		return mdIt.renderInline(content);
	});
	eleventyConfig.addPairedShortcode("callout", function(content, level = "", format = "html", cls = "") {
		if( format === "md" ) {
			content = mdIt.renderInline(content);
		} else if( format === "md-block" ) {
			content = mdIt.render(content);
		}
		return `<div class="elv-callout${level ? ` elv-callout-${level}` : ""}${cls ? ` ${cls}`: ""}">${content}</div>`;
	});

	eleventyConfig.addFilter("toISO", (dateObj) => {
		return dateObj.toISOString();
	});

	eleventyConfig.addFilter("newsDate", (dateObj, format = "yyyy LLLL dd") => {
		if(typeof dateObj === "string") {
			return DateTime.fromISO(dateObj).toFormat(format);
		} else if(typeof dateObj === "number") {
			dateObj = new Date(dateObj);
		}
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	eleventyConfig.addFilter("objectFilterNot", (obj, compareKey) => {
		let newObj = {};
		for(let j in obj) {
			if(!obj[j][compareKey]) {
				newObj[j] = obj[j];
			}
		}
		return newObj;
	});

	eleventyConfig.addFilter("rankSortByNumericKey", (arr, ...keys) => {
		return arr.filter(entry => true).sort((a, b) => {
			let aSum = 0;
			let bSum = 0;
			for(let key of keys) {
				aSum += a[key];
				bSum += b[key];
			}
			return aSum - bSum;
		});
	});

	eleventyConfig.addFilter("calc", (sites, type, key, greaterThanOrEqualTo = 1) => {
		let sum = 0;
		let values = [];
		let keys;
		if(Array.isArray(key)) {
			keys = key;
		} else {
			keys = [key];
		}
		let count = 0;
		for(let site of sites) {
			let test = true;
			for(let key of keys) {
				if(isNaN(site[key]) || site[key] < greaterThanOrEqualTo) {
					test = false;
				}
			}
			if(test) {
				count++;
			}
			if(typeof site[key] === "number") {
				sum += site[key];
				values.push(site[key]);
			}
		}
		if(type === "count") {
			return count;
		}
		if(type === "mean") {
			return sum / values.length;
		}
		if(type === "median") {
			if(values.length > 0) {
				return values.sort((a, b) => b - a)[Math.floor(values.length / 2)];
			}
		}
	});

	eleventyConfig.addFilter("findBy", (data, path, value) => {
		return data.filter(entry => {
			if(!path || !value) {
				return false;
			}

			let gotten = lodashGet(entry, path);
			if(!gotten) {
				return false;
			}

			let valueLower = value.toLowerCase();
			let dataLower = gotten.toLowerCase();
			if(valueLower === dataLower) {
				return true;
			}
			return false;
		});
	});

	eleventyConfig.addFilter("findSiteDataByUrl", (url, sites) => {
		let sitesArr = sites;
		if(!Array.isArray(sitesArr)) {
			sitesArr = Object.values(sites);
		}

		for(let site of sitesArr) {
			if(!url || !site.url) {
				continue;
			}
			let lowerUrl = url.toLowerCase();
			let siteUrl = site.url.toLowerCase();
			if(lowerUrl === siteUrl || lowerUrl === `${siteUrl}/` || `${lowerUrl}/` === siteUrl) {
				return site;
			}
		}
	});

	eleventyConfig.addFilter("repeat", (number, str) => {
		if(number > 0) {
			return str + (new Array(number)).join(str);
		}
		return "";
	});

	eleventyConfig.addFilter("topAuthors", sites => {
		let counts = {};
		let eligibleCounts = {};
		getAuthors(sites, (name, site) => {
			let key = name.toLowerCase();
			if(!counts[key]) {
				counts[key] = 0;
			}
			counts[key]++;

			if(site.url && !site.disabled && !site.superfeatured && !site.hideOnHomepage) {
				if(!eligibleCounts[key]) {
					eligibleCounts[key] = 0;
				}
				eligibleCounts[key]++;
			}
		});

		let top = [];
		for(let author in counts) {
			if(counts[author]) {
				top.push({
					name: author,
					count: counts[author],
					eligibleCount: eligibleCounts[author],
				});
			}
		}
		top.sort((a, b) => {
			return b.count - a.count;
		});

		return top;
	});

	eleventyConfig.addFilter("cleanAuthorName", cleanName);

	eleventyConfig.addFilter("head", (arr, num) => {
		return num ? arr.slice(0, num) : arr;
	});

	eleventyConfig.addFilter("supportersFacepile", (supporters) => {
		return supporters.filter(supporter => supporter.status === 'ACTIVE' && !supporter.hasDefaultAvatar && supporter.tier && supporter.tier.slug !== "gold-sponsor");
	});

	// Sort an object that has `order` props in values. Return an array
	eleventyConfig.addFilter("sortObjectByOrder", (obj) => {
		let arr = [];
		for(let key in obj) {
			arr.push(obj[key]);
		}
		return arr.sort((a, b) => {
			return (b.order || 0) - (a.order || 0);
		});
	});

	// Case insensitive check an object for a key
	eleventyConfig.addFilter("has", objectHas);

	// Case insensitive check an object for a key
	eleventyConfig.addShortcode("authorLink", (authors, name) => {
		let html = [];

		if(name) {
			let isAuthor = objectHas(authors, name);
			if(isAuthor) {
				html.push(`<a href="/authors/${name.toLowerCase()}/" class="nowrap">`);
			} else {
				html.push(`<span class="nowrap">`);
			}
			html.push(shortcodes.avatar("twitter", name, name));
			html.push(name);
			if(isAuthor) {
				html.push("</a>");
			} else {
				html.push("</span>");
			}
		}

		return html.join("");
	});

	eleventyConfig.addFilter("convertCommunityLinkToSiteCard", function({ url, author, title }) {
/*
communityLinks:
- url: https://www.pborenstein.com/posts/collections/
  author: pborenstein
  title: Working with Collections

to:

<div class="lo-c sites-site-vert">
  <a href="{{ site.url }}" class="elv-externalexempt">
    {% avatarlocalcache "twitter", site.twitter %}{{ site.name }}
    <div class="sites-screenshot-container">
      {% getScreenshotHtml site.fileSlug, site.url %}
    </div>
  </a>
</div> */

		return {
			url,
			twitter: author,
			name: title,
			fileSlug: slugify(url)
		}
	});

	eleventyConfig.addFilter("getStackblitzUrl", function(url, cmd) {
		if(url.startsWith("https://github.com/")) {
			let s = url.split("/");
			return `https://stackblitz.com/github/${s[3]}/${s[4]}${cmd ? `?terminal=${encodeURIComponent(cmd)}` : ""}`;
		}
	})

	return {
		dir: {
			input: "src",
			output: "_site",
			data: "_data",
		},
		templateFormats: ["html", "njk", "md", "11ty.js"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dataTemplateEngine: false
	};
};
