const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const Terser = require("terser");

module.exports = eleventyConfig => {
	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
		if( process.env.NODE_ENV === "production" && outputPath && outputPath.endsWith(".html") ) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}

		return content;
	});

	eleventyConfig.addNunjucksAsyncFilter("jsmin", async function(code, callback) {
		if(process.env.NODE_ENV === "production") {
			try {
				let result = await Terser.minify(code);
				callback(null, result.code);
			} catch(e) {
				console.log("Terser error: ", minified.error);
			}
		}

		callback(null, code);
	});

	eleventyConfig.addFilter("cssmin", function(code) {
		if(process.env.NODE_ENV === "production") {
			return new CleanCSS({}).minify(code).styles;
		}

		return code;
	});
};
