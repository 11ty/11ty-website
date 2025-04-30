import CleanCSS from "clean-css";
import { minify } from "terser";

async function minifyJavaScript(code) {
	if (process.env.NODE_ENV === "production") {
		try {
			let result = await minify(code);
			console.log( {result} );
			return result.code;
		} catch (e) {
			console.log("Terser error: ", e);
			throw e;
		}
	}

	return code;
}

export default function (eleventyConfig) {
	eleventyConfig.addFilter("jsmin", minifyJavaScript);

	eleventyConfig.addFilter("cssmin", function (code) {
		if (process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
}

