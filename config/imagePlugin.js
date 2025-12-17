import fs from "node:fs";
import path from "node:path";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

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

export default function(eleventyConfig) {
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, imageOptions);

	if(IS_COPY_CACHE_FOLDER) {
		// We aren’t using passthrough file copy here because it globs too early to catch files created during the build
		eleventyConfig.on("eleventy.after", () => {
			fs.cpSync(".cache/@11ty/img/", path.join(eleventyConfig.directories.output, "img/built/"), { recursive: true });
		});
	}
};
