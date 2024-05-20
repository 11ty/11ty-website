import CleanCSS from "clean-css";
import { minify } from "terser";

export default function (eleventyConfig) {
	eleventyConfig.addNunjucksAsyncFilter(
		"jsmin",
		async function (code, callback) {
			if (process.env.NODE_ENV === "production") {
				try {
					let result = await minify(code);
					callback(null, result.code);
				} catch (e) {
					console.log("Terser error: ", e);
					throw e;
				}
			}

			callback(null, code);
		}
	);

	eleventyConfig.addFilter("cssmin", function (code) {
		if (process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
}
