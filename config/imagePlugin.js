import fs from "node:fs";
import path from "node:path";
import eleventyImage, { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import config from "../src/_data/config.js";

const IS_COPY_CACHE_FOLDER = process.env.ELEVENTY_RUN_MODE === "build";

// Warning: changing these options could impact cold-cache build-server build times
const imageOptions = {
	failOnError: false,

	// Swap to ["webp", "auto"] for much speedier cold-cache build-server builds
	formats: ["avif", "auto"],

	htmlOptions: {
		imgAttributes: {
			// <img loading decoding> assigned in HTML will override these values
			loading: "lazy",
			decoding: "async",
		}
	},

	avifOptions: {
		quality: 90,
	},

	cacheOptions: {
		duration: "14d",
	},
};

if(IS_COPY_CACHE_FOLDER) {
		// Performance optimization
	imageOptions.urlPath = "/img/built/";
	imageOptions.outputDir = ".cache/@11ty/img/";
}

export function optimizeImage(filePath, width, format) {
	let options = Object.assign({}, imageOptions, {
		widths: [width],
		formats: format || "auto",
		failOnError: true,
		transformOnRequest: !IS_COPY_CACHE_FOLDER,
	});

	return eleventyImage(filePath, options);
}

function productionUrl(imagePath) {
	let hostname = (process.env.VERCEL_TARGET_ENV === "production" ? "" : process.env.VERCEL_BRANCH_URL);
	let u = new URL(imagePath, hostname ? `https://${hostname}` : config.origin);
	return u.toString();
}

export default function(eleventyConfig) {
	eleventyConfig.addFilter("productionUrl", productionUrl);

	// Resize and transform an image format, return URL to that image
	// Supports Font Awesome icons via protocol handler (e.g. `fas:font-awesome-flag`)
	eleventyConfig.addFilter("getOpengraphImageUrl", async function(pageUrl) {
		let screenshotUrl = `https://screenshot.11ty.app/${encodeURIComponent(config.origin + pageUrl)}/opengraph/x.jpg`;
		let stats = await optimizeImage(screenshotUrl, 1200, "png");
		let outputFormat = Object.keys(stats).pop();
		let formatStats = stats[outputFormat][0];

		if(!IS_COPY_CACHE_FOLDER) {
			return formatStats.url;
		}

		// absolute URL required for opengraph images
		return productionUrl(formatStats.url);
	});

	eleventyConfig.addPlugin(eleventyImageTransformPlugin, imageOptions);

	if(IS_COPY_CACHE_FOLDER) {
		// We aren’t using passthrough file copy here because it globs too early to catch files created during the build
		eleventyConfig.on("eleventy.after", () => {
			fs.cpSync(".cache/@11ty/img/", path.join(eleventyConfig.directories.output, "img/built/"), { recursive: true });
		});
	}
};
