import CleanCSS from "clean-css";
import { minify } from "terser";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { parse } from "node:path";

export async function minifyJavaScriptFile(source, target) {
	let contents = readFileSync(source, "utf8");

	let { dir } = parse(target);
	mkdirSync(dir, {
		recursive: true
	});

	if (process.env.NODE_ENV === "production") {
		let minified = await minifyJavaScript(contents);
		writeFileSync(target, minified, "utf8")
	} else {
		// passthrough during dev
		writeFileSync(target, `/* Minification skipped during dev mode */\n${contents}`, "utf8")
	}
}

export async function minifyJavaScript(code) {
	return minify(code).then(result => result.code);
}

export default function (eleventyConfig) {
	eleventyConfig.addFilter("jsmin", function(code) {
		if (process.env.NODE_ENV === "production") {
			return minifyJavaScript(code);
		}

		return code;
	});

	eleventyConfig.addFilter("cssmin", function (code) {
		if (process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
}

