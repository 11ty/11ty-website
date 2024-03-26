import "dotenv/config";

import { DateTime } from "luxon";
import HumanReadable from "human-readable-numbers";
import commaNumber from "comma-number";
import slugify from "slugify";
import lodashGet from "lodash/get.js";
import shortHash from "short-hash";

import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import navigationPlugin from "@11ty/eleventy-navigation";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import eleventyImage, { eleventyImagePlugin } from "@11ty/eleventy-img";
import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";
import { RenderPlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";

import { addedIn, coerceVersion } from "./config/addedin.js";
import monthDiffPlugin from "./config/monthDiff.js";
import minificationLocalPlugin from "./config/minification.js";
import cleanName from "./config/cleanAuthorName.js";
import objectHas from "./config/object-has.js";
import markdownPlugin from "./config/markdownPlugin.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

let defaultAvatarHtml = `<img src="/img/default-avatar.png" alt="Default Avatar" loading="lazy" decoding="async" class="avatar" width="200" height="200">`;
const shortcodes = {
	communityAvatar(slug, alt = "") {
		if (!slug) {
			return defaultAvatarHtml;
		}
		if ((slug || "").startsWith("twitter:")) {
			return shortcodes.avatar(
				"twitter",
				slug.substring("twitter:".length),
				alt
			);
		}
		return shortcodes.getGitHubAvatarHtml(slug, alt);
	},
	avatar(datasource, slug, alt = "") {
		if (!slug) {
			return "";
		}

		slug = cleanName(slug).toLowerCase();

		try {
			let mapEntry = Object.assign(
				{},
				require(`./avatars/${datasource}/${slug}.json`)
			);
			delete mapEntry.slug; // dunno why the slug is saved here ok bye

			return eleventyImage.generateHTML(mapEntry, {
				alt: `${alt || `${slug}’s ${datasource} avatar`}`,
				loading: "lazy",
				decoding: "async",
				class: "avatar",
			});
		} catch (e) {
			return defaultAvatarHtml;
		}
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
			formats:
				process.env.NODE_ENV === "production" ? ["avif", "png"] : ["auto"],
			widths: widths || ["auto"],
			urlPath: "/img/built/",
			outputDir: "_site/img/built/",
		};

		let stats = await eleventyImage(filepath, options);

		return eleventyImage.generateHTML(
			stats,
			Object.assign(
				{
					alt,
					loading: "lazy",
					decoding: "async",
					sizes: sizes || "(min-width: 22em) 30vw, 100vw",
					class: classes || "",
				},
				attributes
			)
		);
	},
	getScreenshotHtml(siteSlug, siteUrl, sizes, preset = "small") {
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

		let screenshotUrl;
		if (siteUrl) {
			screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(
				siteUrl
			)}/${preset}/1:1/${zoom ? `${zoom}/` : ""}`;
		}

		// 11ty.dev
		let overrides = {
			dLN_2kDPpB: "11ty",
		};
		if (overrides[siteSlug]) {
			screenshotUrl = `/img/screenshot-fallbacks/${overrides[siteSlug]}.jpg`;
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

		return eleventyImage.generateHTML(stats, {
			alt: `Screenshot of ${siteUrl}`,
			loading: "lazy",
			decoding: "async",
			sizes: sizes || "(min-width: 22em) 30vw, 100vw",
			class: "sites-screenshot",
			// No longer necessary because we have a default fallback image when timeouts happen.
			// onerror: "let p=this.closest('picture');if(p){p.remove();}this.remove();"
		});
	},
	getGeneratorImageHtml(url) {
		let d = new Date();
		// Daily
		let cacheBuster = `_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
		return `<img src="https://v1.generator.11ty.dev/image/${encodeURIComponent(
			url
		)}/${cacheBuster}/" width="66" height="66" alt="Meta Generator tag icon for ${url}" class="avatar avatar-large" loading="lazy" decoding="async">`;
	},
	getHostingImageHtml(url) {
		return `<img src="https://v1.builtwith.11ty.dev/${encodeURIComponent(
			url
		)}/image/host/" width="66" height="66" alt="Hosting provider icon for ${url}" class="avatar avatar-large" loading="lazy" decoding="async">`;
	},
	// WebC migration: indieweb-avatar.webc
	// size = "large"
	getIndieAvatarHtml(iconUrl, cls = "") {
		let imgHtml = "";
		let dims = [150, 150];
		if (cls === "avatar-tall") {
			dims = [120, 150];
		}
		if (!iconUrl.startsWith("/")) {
			imgHtml = `<img src="https://v1.indieweb-avatar.11ty.dev/${encodeURIComponent(
				iconUrl
			)}/" width="${dims[0]}" height="${
				dims[1]
			}" alt="IndieWeb Avatar for ${iconUrl}" class="avatar avatar-indieweb${
				cls ? ` ${cls}` : ""
			}" loading="lazy" decoding="async">`;
		}
		return imgHtml;
	},
	getGitHubAvatarHtml(username, alt = "") {
		if (!alt) {
			alt = `GitHub Avatar for ${username}`;
		}

		let url = `https://avatars.githubusercontent.com/${username}?s=66`;
		return `<img src="https://v1.image.11ty.dev/${encodeURIComponent(
			url
		)}/webp/66/" width="66" height="66" alt="${alt}" class="avatar avatar-large" loading="lazy" decoding="async">`;
	},
	getOpenCollectiveAvatarHtml(url, username = "") {
		let alt = `Open Collective Avatar for ${username}`;

		return `<img src="https://v1.image.11ty.dev/${encodeURIComponent(
			url
		)}/webp/66/" width="66" height="66" alt="${alt}" class="avatar avatar-large" loading="lazy" decoding="async">`;
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
		// Skip on non-local
		eleventyConfig.ignores.add("src/admin.md");
	} else {
		// Skip on local dev
		eleventyConfig.ignores.add("src/api/*");
		eleventyConfig.ignores.add("src/docs/feed.njk");
		eleventyConfig.ignores.add("src/docs/quicktipsfeed.njk");
		eleventyConfig.ignores.add("src/blog/blog-feed.njk");
		eleventyConfig.ignores.add("src/authors/author-pages.md");
		eleventyConfig.ignores.add("src/firehose.11ty.js");
		eleventyConfig.ignores.add("src/firehose-feed.11ty.js");
	}

	eleventyConfig.setServerOptions({
		showVersion: false,
		domDiff: false,
	});

	/* Plugins */
	eleventyConfig.addPlugin(syntaxHighlightPlugin, {
		lineSeparator: "<br>",
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

	eleventyConfig.addPlugin(eleventyImagePlugin, {
		// options via https://www.11ty.dev/docs/plugins/image/#usage
		formats:
			process.env.NODE_ENV === "production" ? ["avif", "jpeg"] : ["auto"],

		urlPath: "/img/built/",

		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});

	eleventyConfig.addPlugin(markdownPlugin);
	eleventyConfig.addPlugin(rssPlugin, {
		posthtmlRenderOptions: {
			closingSingleTag: "default",
		},
	});
	eleventyConfig.addPlugin(navigationPlugin);
	eleventyConfig.addPlugin(monthDiffPlugin);
	eleventyConfig.addPlugin(minificationLocalPlugin);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
	eleventyConfig.addPlugin(eleventyWebcPlugin, {
		components: [
			"./src/_includes/components/*.webc",
			"npm:@11ty/is-land/*.webc",
			"npm:@11ty/eleventy-img/*.webc",
		],
		bundlePluginOptions: {
			transforms: [
				// 			function(bundleContent) {
				// 				// careful with HTML bundles here in the future
				// 				return `
				// /* @11ty/eleventy-plugin-bundle: ${bundleContent.length/1000} kB */
				// ${bundleContent}`;
				// 			}
			],
		},
	});

	/* End plugins */

	eleventyConfig.addCollection("sidebarNav", function (collection) {
		// filter out excludeFromSidebar options
		return collection.getAll().filter((item) => {
			return (
				item.data?.eleventyNavigation && item.data?.excludeFromSidebar !== true
			);
		});
	});

	eleventyConfig.addFilter("coerceVersion", coerceVersion);
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

	eleventyConfig.addAsyncFilter("canonicalTwitterUrl", async (url) => {
		try {
			const { transform } = await import("@tweetback/canonical");
			return transform(url);
		} catch (e) {
			return url;
		}
	});

	eleventyConfig.addShortcode("image", shortcodes.image);
	eleventyConfig.addShortcode("avatarlocalcache", shortcodes.avatar);
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
		"src/_includes/components/throbber.js": "js/throbber.js",
		"src/_includes/components/throbber.css": "css/throbber.css",
		"src/_includes/components/intl-number.js": "js/intl-number.js",
	});

	eleventyConfig.addPassthroughCopy({
		"node_modules/@11ty/logo/assets/logo-bg.svg": "img/logo-github.svg",
		"node_modules/@11ty/logo/assets/open-graph.jpg": "img/open-graph.jpg",
		"node_modules/@11ty/logo/img/logo-784x1093.png": "img/logo.png",
		"node_modules/@11ty/logo/img/logo-200x200.png": "img/logo-github.png",
		"node_modules/@11ty/logo/img/logo-96x96.png": "img/favicon.png",
		"node_modules/speedlify-score/speedlify-score.js": "js/speedlify-score.js",
		"node_modules/@zachleat/seven-minute-tabs/seven-minute-tabs.js":
			"js/seven-minute-tabs.js",
		"node_modules/lite-youtube-embed/src/lite-yt-embed.js": `js/lite-yt-embed.js`,
		"node_modules/artificial-chart/artificial-chart.{css,js}": `static/`,
	});

	eleventyConfig.addPassthroughCopy("netlify-email");
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

	eleventyConfig.addFilter("friendlyAuthorName", function (name) {
		if (name && name.startsWith("twitter:")) {
			return `<em>${name.substring("twitter:".length)}</em>`;
		}
		return name;
	});

	eleventyConfig.addFilter("displayPrice", function (num) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
		}).format(num);
	});

	eleventyConfig.addFilter("displayUrl", function (url) {
		url = url.replace("https://", "");
		url = url.replace("http://", "");

		if (url.endsWith("/index.html")) {
			url = url.replace("/index.html", "/");
		}

		// remove trailing slash
		if (url.endsWith("/")) {
			url = url.substring(0, url.length - 1);
		}

		return url;
	});

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
				if (version.tag === "LATEST") {
					continue;
				}
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

	eleventyConfig.addFilter("orphanWrap", (str) => {
		let splitSpace = str.split(" ");
		let after = "";
		if (splitSpace.length > 2) {
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
	eleventyConfig.addFilter("shuffle", (arr, sliceNum) => {
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

	// Thanks to https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	eleventyConfig.addFilter("randompick", (arr) => {
		if (Array.isArray(arr)) {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		let randkey = Object.keys(arr)[Math.floor(Math.random() * arr.length)];
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

	eleventyConfig.addFilter("sortByQuickTipsIndex", function (collection) {
		return collection.sort(function (a, b) {
			return parseInt(a.data.tipindex, 10) - parseInt(b.data.tipindex, 10);
		});
	});

	eleventyConfig.addCollection("quicktipssorted", function (collection) {
		return collection.getFilteredByTag("quicktips").sort(function (a, b) {
			return parseInt(a.data.tipindex, 10) - parseInt(b.data.tipindex, 10);
		});
	});

	eleventyConfig.addCollection("docsFeed", function (collection) {
		return collection.getFilteredByGlob("src/docs/**/*.md").sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
	});

	function testimonialNameHtml(testimonial) {
		let avatarHtml = "";
		if (testimonial.twitter) {
			avatarHtml = shortcodes.avatar(
				"twitter",
				testimonial.twitter,
				`${testimonial.name}’s Twitter Photo`
			);
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
			twitterUsernames = [],
			hardcodedOpencollectiveUsername
		) {
			let supporter;
			for (let twitter of twitterUsernames) {
				supporter = findBy(supporters, "twitter", twitter);
				if (supporter && supporter.length) {
					return supporter.pop();
				}
			}

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

			supporter = findBy(supporters, "slug", slug);
			if (supporter && supporter.length) {
				return supporter.pop();
			}
			return false;
		}
	);

	eleventyConfig.addShortcode(
		"supporterAmount",
		function (amount, maxAmount = 2000) {
			// mostly fibonacci
			let increments = [
				5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
			];
			let incrementCounter = 0;
			let fullHearts = [];
			let emptyHearts = [];
			let j = 0;
			for (let k = amount; j <= k; j += increments[incrementCounter]) {
				fullHearts.push("🎈");
				incrementCounter++;
			}
			for (; j <= maxAmount; j += increments[incrementCounter]) {
				emptyHearts.push("🎈");
				incrementCounter++;
			}
			return `${fullHearts.join(
				""
			)}<span class="supporters-hearts-empty">${emptyHearts.join("")}</span>`;
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
		return Object.values(authors).sort((a, b) => {
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

	eleventyConfig.addFilter("supportersFacepile", (supporters) => {
		return supporters.filter((supporter) => {
			return supporter.status === "ACTIVE" && !supporter.hasDefaultAvatar;
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

	// Case insensitive check an object for a key
	eleventyConfig.addShortcode("authorLink", (authors, name) => {
		let html = [];

		if (name) {
			let isAuthor = objectHas(authors, name);
			if (isAuthor) {
				html.push(`<a href="/authors/${name.toLowerCase()}/" class="nowrap">`);
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
				fileSlug: slugify(url),
			};
		}
	);

	eleventyConfig.addFilter("getStackblitzUrl", function (url, cmd) {
		if (url.startsWith("https://github.com/")) {
			let s = url.split("/");
			return `https://stackblitz.com/github/${s[3]}/${s[4]}${
				cmd ? `?terminal=${encodeURIComponent(cmd)}` : ""
			}`;
		}
	});

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

	return {
		dir: {
			input: "src",
			output: "_site",
			data: "_data",
		},
		templateFormats: ["html", "njk", "md", "11ty.js"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
	};
}
