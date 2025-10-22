import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import memoize from "memoize";
import { DateTime } from "luxon";
import HumanReadable from "human-readable-numbers";
import commaNumber from "comma-number";
import lodashGet from "lodash/get.js";
import shortHash from "short-hash";
import { ImportTransformer } from "esm-import-transformer";
import { transform as tweetbackTransform } from "@tweetback/canonical";

import navigationPlugin from "@11ty/eleventy-navigation";
import eleventyImage, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { RenderPlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import fontAwesomePlugin from "@11ty/font-awesome";
import { getImageColors } from "@11ty/image-color";

import { addedIn, coerceVersion, greaterThan } from "./config/addedin.js";
import minificationLocalPlugin, { minifyJavaScriptFile } from "./config/minification.js";
import { bundleModulePath } from "./config/bundleJavaScript.js";
import cleanName from "./config/cleanAuthorName.js";
import objectHas from "./config/object-has.js";
import markdownPlugin from "./config/markdownPlugin.js";
import feedPlugin from "./config/feedPlugin.js";
import sidebarPlugin from "./config/sidebarPlugin.js";
import syntaxHighlightPlugin from "./config/syntaxHighlightPlugin.js";

function resolveModule(target) {
	return fileURLToPath(import.meta.resolve(target));
}

function displayUrl(url) {
	url = url.replace("https://", "");
	url = url.replace("http://", "");

	if (url.endsWith("/index.html")) {
		url = url.replace("/index.html", "/");
	}

	// remove trailing slash
	if (url.endsWith("/")) {
		url = url.slice(0, -1);
	}

	if(url.startsWith("www.")) {
		url = url.slice("www.".length);
	}

	return url;
}

let defaultAvatarHtml = `<img src="/img/default-avatar.png" alt="Default Avatar" loading="lazy" decoding="async" class="avatar" width="200" height="200">`;
const shortcodes = {
	communityAvatar(slug, alt = "") {
		if (!slug) {
			return defaultAvatarHtml;
		}
		if ((slug || "").startsWith("twitter:")) {
			return "";
		}
		return shortcodes.getGitHubAvatarHtml(slug, alt);
	},
	link(linkUrl, content) {
		return (
			(linkUrl ? `<a href="${linkUrl}">` : "") +
			content +
			(linkUrl ? `</a>` : "")
		);
	},
	image: async function (filepath, alt, widths, classes, sizes, attributes) {
		let options = {
			formats: ["avif", "png"],
			widths: widths || ["auto"],
			urlPath: "/img/built/",
			outputDir: "_site/img/built/",
			transformOnRequest: process.env.ELEVENTY_RUN_MODE === "serve",
		};

		let stats = await eleventyImage(filepath, options);

		return eleventyImage.generateHTML(
			stats,
			Object.assign(
				{
					alt,
					loading: "lazy",
					decoding: "async",
					sizes,
					class: classes || "",
					"eleventy:ignore": "",
				},
				attributes
			)
		);
	},
	getScreenshotHtml(alt, siteUrl, sizes, preset = "small") {
		let zoom;
		let viewport = {
			width: 375,
			height: 375,
		};

		if (preset === "medium") {
			viewport.width = 464;
			viewport.height = 464;
			zoom = "smaller";
		} else if (preset === "opengraph") {
			viewport.width = 1200;
			viewport.height = 630;
			zoom = "bigger";
		}

		let isYouTubeUrl = siteUrl.includes("www.youtube.com");
		let isSquare = viewport.width === viewport.height;
		let screenshotUrl;
		if (siteUrl) {
			if(isYouTubeUrl) {
				screenshotUrl = `https://v1.opengraph.11ty.dev/${encodeURIComponent(
					siteUrl
				)}/small/jpeg/`;

				viewport.width = 650;
				viewport.height = 366;
			} else {
				screenshotUrl = `https://screenshot.11ty.app/${encodeURIComponent(
					siteUrl
				)}/${preset}/1:1/${zoom ? `${zoom}/` : ""}`;
			}
		}

		let options = {
			formats: ["jpeg"], // this format is irrelevant
			widths: ["auto"], // 260-440 in layout
			urlFormat: function () {
				return screenshotUrl;
			},
		};

		let stats = eleventyImage.statsByDimensionsSync(
			screenshotUrl,
			viewport.width,
			viewport.height,
			options
		);

		let attrs = {
			alt: alt ?? "",
			loading: "lazy",
			decoding: "async",
			sizes: sizes || "(min-width: 22em) 30vw, 100vw",
			class: "sites-screenshot" + (isYouTubeUrl ? ` sites-screenshot-youtube${isSquare ? "-sq" : ""}` : ""),
			"eleventy:ignore": "",
		};

		return eleventyImage.generateHTML(stats, attrs);
	},
	getGeneratorImageHtml(url) {
		let d = new Date();
		// Daily
		let cacheBuster = `_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
		return `<img src="https://v1.generator.11ty.dev/image/${encodeURIComponent(
			url
		)}/${cacheBuster}/" width="66" height="66" alt="" class="avatar avatar-large" loading="lazy" decoding="async" eleventy:ignore>`;
	},
	getHostingImageHtml(url) {
		return `<img src="https://v1.builtwith.11ty.dev/${encodeURIComponent(
			url
		)}/image/host/" width="66" height="66" alt="" class="avatar avatar-large" loading="lazy" decoding="async" eleventy:ignore>`;
	},
	getAvatarHtmlFromFullUrl(fullUrl, cls = "", attrs = "", dims = [150, 150]) {
		if (cls === "avatar-tall") {
			dims = [120, 150];
		}

		return `<img src="${fullUrl}" width="${dims[0]}" height="${
			dims[1]
		}" alt="Favicon for ${displayUrl(fullUrl)}" class="avatar avatar-indieweb${
			cls ? ` ${cls}` : ""
		}" loading="lazy" decoding="async"${attrs ? ` ${attrs}` : ""}>`;
	},
	// WebC migration: indieweb-avatar.webc
	// size = "large"
	getIndieAvatarHtml(iconUrl, cls = "") {
		if(typeof iconUrl !== "string" || iconUrl.startsWith("/")) {
			return "";
		}
		let fullUrl = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(iconUrl)}/`;
		return shortcodes.getAvatarHtmlFromFullUrl(fullUrl, cls, "eleventy:ignore", [60, 60]);
	},
	getGitHubAvatarHtml(username, alt = "") {
		if(!username) {
			return "";
		}
		if (!alt) {
			alt = `GitHub Avatar for ${username}`;
		}

		let url = `https://avatars.githubusercontent.com/${username}?s=66`;
		return `<img src="${url}" width="66" height="66" alt="${alt}" class="avatar avatar-large" loading="lazy" decoding="async">`;
	},
	getOpenCollectiveAvatarHtml(supporter) {
		let preferIndiewebAvatarSlugs = [
			"nejlepsiceskacasina-com",
			"slovenskeonlinecasino-com",
		]
		let {image: url, name: username, hasDefaultAvatar, website} = supporter;
		let alt = `Open Collective Avatar for ${username}`;
		if(website && (hasDefaultAvatar || preferIndiewebAvatarSlugs.includes(supporter.slug))) {
			return shortcodes.getIndieAvatarHtml(website);
		}
		return `<img src="${url}" width="66" height="66" alt="${alt}" class="avatar avatar-large" loading="lazy" decoding="async" eleventy:optional>`;
	},
};

function findBy(data, path, value) {
	return data.filter((entry) => {
		if (!path || !value) {
			return false;
		}

		let gotten = lodashGet(entry, path);
		if (!gotten) {
			return false;
		}

		if (typeof value === "string") {
			let valueLower = value.toLowerCase();
			let dataLower = gotten.toLowerCase();
			if (valueLower === dataLower) {
				return true;
			}
			return false;
		}

		return value === gotten;
	});
}

export default async function (eleventyConfig) {
	eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	if (process.env.NODE_ENV === "production") {
		// Skip on production
		eleventyConfig.ignores.add("src/admin.md");
	} else {
		// Skip on local dev
		eleventyConfig.ignores.add("src/api/*");
		eleventyConfig.ignores.add("src/authors/author-pages.md");
		eleventyConfig.ignores.add("src/firehose.11ty.js");
		eleventyConfig.ignores.add("src/firehose-feed.11ty.js");
	}

	eleventyConfig.setServerOptions({
		showVersion: false,
		domDiff: false,
	});

	/* Plugins */
	eleventyConfig.addPlugin(syntaxHighlightPlugin);

	eleventyConfig.addPlugin(fontAwesomePlugin, {
		defaultAttributes: {
			class: "fa11ty-icon"
		}
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:

		// optional, output image formats
		formats: ["avif", "jpeg"],

		// optional, output image widths
		// widths: ["auto"],

		urlPath: "/img/built/",
		outputDir: ".cache/@11ty/img/",

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},

		cacheOptions: {
			duration: "14d",
		},
	});

	if(process.env.ELEVENTY_RUN_MODE === "build") {
		eleventyConfig.on("eleventy.after", () => {
			fs.cpSync(".cache/@11ty/img/", path.join(eleventyConfig.directories.output, "img/built/"), { recursive: true });
		});
	}

	eleventyConfig.addPlugin(markdownPlugin);

	eleventyConfig.addPlugin(minificationLocalPlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: [
			"./src/_includes/components/*.webc",
			// "npm:@11ty/is-land/*.webc",
			// "npm:@11ty/eleventy-plugin-syntaxhighlight/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
		],
	});

	// Feeds (only in production)
	if (process.env.NODE_ENV === "production") {
		feedPlugin(eleventyConfig);
	}

	/* End plugins */

	eleventyConfig.addPlugin(navigationPlugin);
	eleventyConfig.addPlugin(sidebarPlugin);

	eleventyConfig.addShortcode("getColorsForUrl", async (url) => {
		if(process.env.ELEVENTY_RUN_MODE !== "build") {
			return [];
		}

		let avatarUrl = `https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(url)}/`;

		return getImageColors(avatarUrl).then(colors => {
			return colors.map(c => c.colorjs).sort((a, b) => {
				return (b.oklch.l + b.oklch.c) - (a.oklch.l + a.oklch.c);
			});
		}, error => {
			console.warn( `Error fetching colors from avatar for ${url}`, error );
			return []; // error, return empty set.
		})
	});

	eleventyConfig.addFilter("coerceVersion", coerceVersion);
	eleventyConfig.addNunjucksGlobal("semverGreaterThan", greaterThan);
	eleventyConfig.addShortcode("addedin", addedIn);

	eleventyConfig.addShortcode(
		"generatoravatar",
		shortcodes.getGeneratorImageHtml
	);
	eleventyConfig.addShortcode("hostavatar", shortcodes.getHostingImageHtml);
	eleventyConfig.addShortcode("indieavatar", shortcodes.getIndieAvatarHtml);

	eleventyConfig.addShortcode("indieweblink", function (content, url, iconUrl) {
		if (!url) {
			return content;
		}

		let imgHtml = shortcodes.getIndieAvatarHtml(iconUrl || url);
		return `<a href="${url}">${imgHtml}${content}</a>`;
	});

	eleventyConfig.addShortcode("emoji", function (emoji, alt = "") {
		return (
			`<span aria-hidden="true" class="emoji">${emoji}</span>` +
			(alt ? `<span class="sr-only">${alt}</span>` : "")
		);
	});

	eleventyConfig.addFilter("canonicalTwitterUrl", (url) => {
		try {
			return tweetbackTransform(url);
		} catch (e) {
			return url;
		}
	});

	let ref = 0;
	eleventyConfig.on("eleventy.before", () => {
		ref = 0;
	});
	eleventyConfig.addShortcode("uid", () => {
		return `id-${++ref}`;
	});

	eleventyConfig.addFilter("esmToCjs", memoize((sourceCode) => {
		try {
			let it = new ImportTransformer(sourceCode);
			let outputCode = it.transformToRequire();

			// lol
			return outputCode.replace("export default ", "module.exports = ");
		} catch(e) {
			console.log( sourceCode );
			throw e;
		}
	}));

	eleventyConfig.addShortcode("image", shortcodes.image);
	eleventyConfig.addShortcode("communityavatar", shortcodes.communityAvatar);
	eleventyConfig.addShortcode(
		"opencollectiveavatar",
		shortcodes.getOpenCollectiveAvatarHtml
	);
	eleventyConfig.addShortcode(
		"getScreenshotHtml",
		shortcodes.getScreenshotHtml
	);

	eleventyConfig.addShortcode(
		"codetitle",
		function (title, heading = "Filename") {
			return `<div class="codetitle codetitle-left"><b>${heading} </b>${title}</div>`;
		}
	);

	eleventyConfig.addPairedShortcode("minilink", function (text, href) {
		return `<a href="${href}" class="minilink minilink-lower">${text}</a>`;
	});

	eleventyConfig.addPairedShortcode(
		"codewithprompt",
		function (text, prePrefixCode, id) {
			let ret = [];
			if (prePrefixCode) {
				ret.push(`<div data-preprefix-${prePrefixCode}${
					id ? ` id="${id}"` : ""
				}>
`);
			}

			ret.push(`\`\`\`bash/-
${text.trim()}
\`\`\``);

			if (prePrefixCode) {
				ret.push(`
</div>`);
			}

			return ret.join("\n");
		}
	);

	// WebC migration: TODO remove this after full conversion
	eleventyConfig.addPassthroughCopy({
		"src/js/*.js": "js/",
		"src/_includes/components/throbber.js": "js/throbber.js",
		"src/_includes/components/throbber.css": "css/throbber.css",
		"src/css/fonts/BenchNine-Bold-kern-latin.woff2": "css/fonts/benchnine-bold.woff2",
		"src/css/fonts/RobotoMono-Regular-kern-latin.woff2": "css/fonts/robotomono-regular.woff2",
		"src/css/fonts/RobotoMono-Regular-kern-latinext.woff2": "css/fonts/robotomono-regular-ext.woff2",
		"src/opensearch.xml": "opensearch.xml",
	});

	eleventyConfig.addPassthroughCopy({
		[resolveModule("@11ty/logo/assets/logo-bg.svg")]: "img/logo-github.svg",
		[resolveModule("@11ty/logo/assets/open-graph.jpg")]: "img/open-graph.jpg",
		[resolveModule("@11ty/logo/img/logo-784x1093.png")]: "img/logo.png",
		[resolveModule("@11ty/logo/img/logo-200x200.png")]: "img/logo-github.png",
		[resolveModule("@11ty/logo/img/logo-96x96.png")]: "img/favicon.png",

		[resolveModule("speedlify-score")]: "js/speedlify-score.js",
		[resolveModule("@zachleat/seven-minute-tabs")]: "js/seven-minute-tabs.js",
		[resolveModule("@zachleat/filter-container")]: "js/filter-container.js",
		[resolveModule("lite-youtube-embed")]: `js/lite-yt-embed.js`,
		"node_modules/artificial-chart/artificial-chart.{css,js}": `static/`,

		// Eleventy Editor
		[resolveModule("@zachleat/line-numbers")]: "js/line-numbers.js",
	});

	// Eleventy Editor
	// Minification only happens in production
	await minifyJavaScriptFile(resolveModule("@11ty/client"), path.join(eleventyConfig.directories.output, "js/eleventy.core.browser.js"));
	await minifyJavaScriptFile(resolveModule("@11ty/client/md"), path.join(eleventyConfig.directories.output, "js/eleventy.engine-md.browser.js"));
	await minifyJavaScriptFile(resolveModule("@11ty/client/liquid"), path.join(eleventyConfig.directories.output, "js/eleventy.engine-liquid.browser.js"));
	await bundleModulePath("@awesome.me/webawesome/dist/components/copy-button/copy-button.js", path.join(eleventyConfig.directories.output, "js/copy-button.js"));

	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/blog/*.png");
	eleventyConfig.addPassthroughCopy("src/blog/pretty-atom-feed-v3.xsl");
	eleventyConfig.addPassthroughCopy("src/favicon.ico");

	eleventyConfig.addFilter("matchbannerlink", (links, text) => {
		return links.find((entry) => entry.label.indexOf(text) !== -1);
	});

	eleventyConfig.addFilter("lighthouseGoodDataCheck", function (data) {
		return !!data && !("error" in data);
	});

	eleventyConfig.addFilter("lighthousePerfectScore", function (data) {
		return !!data && !("error" in data) && data.lighthouse.total === 400;
	});

	eleventyConfig.addFilter("cardScreenshotHtml", function (site) {
		let url = site.demo || site.url;
		if(!url) {
			return `<div class="sites-screenshot-container"><img class="sites-screenshot"></div>`;
		}
		if(site.screenshotOverride) {
			return `<div class="sites-screenshot-container"><img alt="${site.screenshotOverride.alt}" loading="lazy" decoding="async" class="sites-screenshot" src="${site.screenshotOverride.src}" width="${site.screenshotOverride.width}" height="${site.screenshotOverride.height}"></div>`;
		}
		return `<div class="sites-screenshot-container">${shortcodes.getScreenshotHtml(site.fileSlug, url, null, site.screenshotSize, site.screenshotAspectRatio)}</div>`;
	});

	eleventyConfig.addFilter("speedlifyHash", function (site) {
		if (!site || !site.url) {
			// console.log( "speedlifyHash: Missing url for", site.name );
			return;
		}
		// note that this will fail _sometimes_ because these are requestedUrl and not final URLs (speedlify uses final URLs for hashing)
		return shortHash(site.url);
	});

	eleventyConfig.addFilter("toJSON", function (obj) {
		return JSON.stringify(obj);
	});

	eleventyConfig.addFilter("toSearchEntry", function (str) {
		return str
			.replace(/<a class="direct-link"[^>]*>#<\/a\>/g, "")
			.replace(/[\t]{2,}/g, "\t") // change \t\t\t\t\t\t to \t
			.replace(/[\n]{2,}/g, "\n"); // change \n\n\n\n\n to \n
	});

	eleventyConfig.addFilter("humanReadableNum", function (num) {
		if (num || num === 0) {
			return HumanReadable.toHumanString(num);
		}
		return "";
	});

	eleventyConfig.addFilter("commaNumber", function (num) {
		return commaNumber(num);
	});

	eleventyConfig.addFilter("displayPrice", function (num) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(num);
	});

	eleventyConfig.addFilter("displayUrl", displayUrl);

	eleventyConfig.addShortcode(
		"templatelangs",
		function (languages, page, whitelist, anchor, isinline) {
			let parentTag = isinline ? "span" : "ul";
			let childTag = isinline ? "span" : "li";

			return `<${parentTag} class="inlinelist">${languages
				.filter((lang) =>
					!whitelist ? true : whitelist.indexOf(lang.ext) > -1
				)
				.map(
					(lang) =>
						`<${childTag} class="inlinelist-item${
							page.url == lang.url ? " active" : ""
						}"><a href="${lang.url}${anchor || ""}">${lang.name}${
							lang.ext ? ` <code>*.${lang.ext}</code>` : ""
						}</a></${childTag}>`
				)
				.join(" ")}</${parentTag}>`;
		}
	);

	// WebC migration: eleventy-version.webc
	eleventyConfig.addShortcode(
		"latestVersion",
		function (versions, config, prefix = "v") {
			for (let version of versions) {
				if (version.channel && version.channel !== "latest") {
					continue;
				}
				if (!config.prerelease && version.prerelease) {
					continue;
				}

				return prefix + version.tag.substr(1);
			}
		}
	);

	function randomizeArray(arr) {
		let a = arr.slice(0);
		if(process.env.DISABLE_RANDOM) {
			return a;
		}

		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("shuffle", (arr = [], sliceNum = undefined) => {
		if (Array.isArray(arr)) {
			if (!sliceNum) {
				return randomizeArray(arr);
			}
			return randomizeArray(arr).slice(0, sliceNum);
		}

		let keys = randomizeArray(Object.keys(arr));
		if (sliceNum) {
			keys = keys.slice(0, sliceNum);
		}

		let a = {};
		for (let key of keys) {
			a[key] = arr[key];
		}
		return a;
	});

	function getRandomArrayEntry(arr) {
		if(process.env.DISABLE_RANDOM) {
			return arr.at(0);
		}

		let index = Math.floor(Math.random() * arr.length);
		return arr.at(index);
	}

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("randompick", (arr) => {
		if (Array.isArray(arr)) {
			return getRandomArrayEntry(arr);
		}

		let randkey = getRandomArrayEntry(Object.keys(arr));
		return arr[randkey];
	});

	eleventyConfig.addFilter("getsize", (arr) => {
		if (Array.isArray(arr)) {
			return arr.length;
		}

		return Object.keys(arr).length;
	});

	eleventyConfig.addShortcode("addToSampleSites", function () {
		return `<a href="https://github.com/11ty/11ty-website/issues/new/choose"><strong>Want to add your site to this list?</strong></a>`;
	});

	function testimonialNameHtml(testimonial) {
		let avatarHtml = "";
		if (testimonial.avatarSource) {
			avatarHtml = shortcodes.getAvatarHtmlFromFullUrl(testimonial.avatarSource);
		} else if (testimonial.avatarUrl) {
			avatarHtml = shortcodes.getIndieAvatarHtml(testimonial.avatarUrl);
		}

		return avatarHtml + testimonial.name;
	}

	eleventyConfig.addShortcode("testimonialNameHtml", testimonialNameHtml);

	eleventyConfig.addShortcode("testimonial", function (testimonial) {
		let nameHtml = testimonialNameHtml(testimonial);
		return `<blockquote><p>${
			!testimonial.indirect ? `“` : ``
		}${testimonial.text}${!testimonial.indirect ? `” <span class="bio-source">—${shortcodes.link(testimonial.source, nameHtml)}</span>` : ``}</p></blockquote>`;
	});

	eleventyConfig.addFilter("filterBusinessPeople", function (authors) {
		return Object.values(authors).filter((entry) => !!entry.business_url);
	});

	eleventyConfig.addFilter("isBusinessPerson", function (supporter) {
		return (
			supporter &&
			supporter.isMonthly &&
			supporter.amount &&
			supporter.amount.value >= 5
		);
	});

	eleventyConfig.addFilter(
		"isSupporter",
		function (
			supporters,
			githubUsername,
			hardcodedOpencollectiveUsername
		) {
			let slug = {
				// hardcoded map for github => opencollective slugs
				"twitter:unabridgedsoft": "unabridged-software",
				philhawksworth: "phil-hawksworth",
				matuzo: "manuel-matuzovic",
				zachleat: "zach-leatherman",
				joshcrain: "guest-ceed59a4",
			}[githubUsername];

			if (!slug) {
				slug = hardcodedOpencollectiveUsername || githubUsername;
			}

			let supporter = findBy(supporters, "slug", slug);
			if (supporter && supporter.length) {
				return supporter.pop();
			}
			return false;
		}
	);

	eleventyConfig.addFilter("toISO", (dateObj) => {
		return dateObj.toISOString();
	});

	eleventyConfig.addFilter("newsDate", (dateObj, format = "yyyy LLLL dd") => {
		if (typeof dateObj === "string") {
			return DateTime.fromISO(dateObj).toFormat(format);
		} else if (typeof dateObj === "number") {
			dateObj = new Date(dateObj);
		}
		return DateTime.fromJSDate(dateObj).toFormat(format);
	});

	eleventyConfig.addFilter("objectFilterNot", (obj, compareKey) => {
		let newObj = {};
		for (let j in obj) {
			if (!obj[j][compareKey]) {
				newObj[j] = obj[j];
			}
		}
		return newObj;
	});

	eleventyConfig.addFilter("rankSortByNumericKey", (arr, ...keys) => {
		return arr
			.filter((entry) => true)
			.sort((a, b) => {
				let aSum = 0;
				let bSum = 0;
				for (let key of keys) {
					aSum += a[key];
					bSum += b[key];
				}
				return aSum - bSum;
			});
	});

	eleventyConfig.addFilter(
		"calc",
		(sites, type, key, greaterThanOrEqualTo = 1) => {
			let sum = 0;
			let values = [];
			let keys;
			if (Array.isArray(key)) {
				keys = key;
			} else {
				keys = [key];
			}
			let count = 0;
			for (let site of sites) {
				let test = true;
				for (let key of keys) {
					if (isNaN(site[key]) || site[key] < greaterThanOrEqualTo) {
						test = false;
					}
				}
				if (test) {
					count++;
				}
				if (typeof site[key] === "number") {
					sum += site[key];
					values.push(site[key]);
				}
			}
			if (type === "count") {
				return count;
			}
			if (type === "mean") {
				return sum / values.length;
			}
			if (type === "median") {
				if (values.length > 0) {
					return values.sort((a, b) => b - a)[Math.floor(values.length / 2)];
				}
			}
		}
	);

	eleventyConfig.addFilter("findBy", findBy);

	eleventyConfig.addFilter("findSiteDataByUrl", (url, sites) => {
		let sitesArr = sites;
		if (!Array.isArray(sitesArr)) {
			sitesArr = Object.values(sites);
		}

		for (let site of sitesArr) {
			if (!url || !site.url) {
				continue;
			}
			let lowerUrl = url.toLowerCase();
			let siteUrl = site.url.toLowerCase();
			if (
				lowerUrl === siteUrl ||
				lowerUrl === `${siteUrl}/` ||
				`${lowerUrl}/` === siteUrl
			) {
				return site;
			}
		}
	});

	eleventyConfig.addFilter("repeat", (number, str) => {
		if (number > 0) {
			return str + new Array(number).join(str);
		}
		return "";
	});

	eleventyConfig.addFilter("values", (obj) => {
		return Object.values(obj);
	});

	eleventyConfig.addFilter("sortAuthors", (authors) => {
		return Object.values(authors).filter(author => !author.name.startsWith("twitter:")).sort((a, b) => {
			return b.sites.length - a.sites.length;
		});
	});

	eleventyConfig.addFilter("cleanAuthorName", cleanName);

	eleventyConfig.addFilter("head", (arr, num) => {
		return num ? arr.slice(0, num) : arr;
	});

	eleventyConfig.addFilter("headafter", (arr, num) => {
		return num ? arr.slice(num) : arr;
	});

	eleventyConfig.addFilter("filterSupportersActive", (supporters) => {
		return supporters.filter((supporter) => {
			return supporter.status === "ACTIVE";
		});
	});

	// Sort an object that has `order` props in values. Return an array
	eleventyConfig.addFilter("sortObjectByOrder", (obj) => {
		let arr = [];
		for (let key in obj) {
			arr.push(obj[key]);
		}
		return arr.sort((a, b) => {
			return (b.order || 0) - (a.order || 0);
		});
	});

	// Case insensitive check an object for a key
	eleventyConfig.addFilter("has", objectHas);

	let slugify = eleventyConfig.getFilter("slugify");

	// Case insensitive check an object for a key
	eleventyConfig.addShortcode("authorLink", (authors, name) => {
		let html = [];

		if (name) {
			let isAuthor = objectHas(authors, name);
			if (isAuthor) {
				html.push(`<a href="/authors/${slugify(name)}/" class="nowrap">`);
			} else {
				html.push(`<span class="nowrap">`);
			}
			html.push(shortcodes.communityAvatar(name));
			html.push(name);
			if (isAuthor) {
				html.push("</a>");
			} else {
				html.push("</span>");
			}
		}

		return html.join("");
	});

	eleventyConfig.addFilter(
		"convertCommunityLinkToSiteCard",
		function ({ url, author, title }) {
			/*
communityLinks:
- url: https://www.pborenstein.com/posts/collections/
  author: pborenstein
  title: Working with Collections

to:

<div class="sites-site-vert">
  <a href="{{ site.url }}" class="elv-externalexempt">
    <div class="sites-screenshot-container">
      {% getScreenshotHtml "", site.url %}
    </div>
  </a>
</div> */

			return {
				url,
				// author removed, the great twitter prune of 2025
				name: title,
				fileSlug: slugify(url),
			};
		}
	);

	eleventyConfig.addShortcode(
		"youtubeEmbed",
		function (slug, label, startTime) {
			if (label) {
				label = label.replace(/"/g, "");
			}

			let readableStartTime = "";
			if (startTime) {
				let t = parseInt(startTime, 10);
				let minutes = Math.floor(t / 60);
				let seconds = t % 60;
				readableStartTime = `${minutes}m${seconds}s`;
			}
			let fallback = `https://i.ytimg.com/vi/${slug}/maxresdefault.jpg`;

			// hard-coded fallback
			if (slug === "pPkWxn0TF9w") {
				fallback = `https://img.youtube.com/vi/${slug}/hqdefault.jpg`;
			}

			return `<div><is-land on:visible import="/js/lite-yt-embed.js" class="fluid"><lite-youtube videoid="${slug}"${
				startTime ? ` params="start=${startTime}"` : ""
			} playlabel="Play${
				label ? `: ${label}` : ""
			}" style="background-image:url('${fallback}')">
	<a href="https://youtube.com/watch?v=${slug}" class="elv-externalexempt lty-playbtn" title="Play Video"><span class="lyt-visually-hidden">Play Video${
				label ? `: ${label}` : ""
			}</span></a>
</lite-youtube><a href="https://youtube.com/watch?v=${slug}${
				startTime ? `&t=${startTime}` : ""
			}">${label || "Watch on YouTube"}${
				readableStartTime ? ` <code>▶${readableStartTime}</code>` : ""
			}</a></is-land></div>`;
		}
	);

	eleventyConfig.addFilter("injectAvatars", function (content) {
		return content
			.split("Eleventy")
			.join(
				shortcodes.getIndieAvatarHtml("https://www.11ty.dev/") + "Eleventy"
			);
	});

	eleventyConfig.addFilter("packageManagerCodeTransform", (content, type) => {
		if(type === "yarn") {
			return content.replaceAll("npx @11ty/", "yarn exec ");
		} else if(type === "pnpm") {
			return content.replaceAll("npx @11ty/", "pnpm exec ");
		}
		return content;
	});

	eleventyConfig.addFilter("opencollectiveTier", (supporters = [], tier = undefined) => {
		return supporters.filter(s => s.isMonthly && (!tier || s?.tier?.slug == tier));
	});

	/*
	 * JavaScript Pretty Date
	 * Copyright (c) 2011 John Resig (ejohn.org)
	 * Licensed under the MIT and GPL licenses.
	 *
	 * Floor for minutes/hours, Round for days and weeks
	 */
	eleventyConfig.addFilter("timeDiff", dateStr => {
		let diff = (Date.now() - Date.parse(dateStr)) / 1000;
		let day_diff = Math.round(diff / 86400);

		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 ) {
			return;
		}

		let result = day_diff == 0 && (
				diff < 60 && "now" ||
				diff < 120 && "1 minute ago" ||
				diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
				diff < 7200 && "1 hour ago" ||
				diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
			day_diff == 1 && "1 day ago" || // Yesterday
			day_diff < 7 && day_diff + " days ago" ||
			day_diff <= 11 && "1 week ago" ||
			day_diff < 31 && Math.round( day_diff / 7 ) + " weeks ago";

		return result;
	})

	eleventyConfig.addFilter("normalizeVersion", (version = "") => {
		if(version.startsWith("v")) {
			return version.slice(1);
		}
		return version;
	})

};

export const config = {
	dir: {
		input: "src",
	},
	templateFormats: ["html", "njk", "md", "11ty.js"],
	markdownTemplateEngine: "njk",
	htmlTemplateEngine: "njk",
};
